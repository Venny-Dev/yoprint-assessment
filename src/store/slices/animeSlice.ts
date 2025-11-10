import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Anime {
  mal_id: number;
  title: string;
  title_english: string | null;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  score: number | null;
  type: string;
  episodes: number | null;
  status: string;
  synopsis: string | null;
  year: number | null;
  rating: string | null;
  genres: Array<{ mal_id: number; name: string }>;
  trailer: {
    youtube_id: string | null;
    url: string | null;
    embed_url: string | null;
  } | null;
}

export interface AnimeFilters {
  type: string;
  status: string;
  rating: string;
  genres: string;
  min_score: string;
  start_date: string;
  end_date: string;
}

interface AnimeState {
  searchResults: Anime[];
  trendingAnime: Anime[];
  selectedAnime: Anime | null;
  loading: boolean;
  trendingLoading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  filters: AnimeFilters;
}

const initialState: AnimeState = {
  searchResults: [],
  trendingAnime: [],
  selectedAnime: null,
  loading: false,
  trendingLoading: false,
  error: null,
  searchQuery: "",
  currentPage: 1,
  totalPages: 1,
  hasNextPage: false,
  filters: {
    type: "",
    status: "",
    rating: "",
    genres: "",
    min_score: "",
    start_date: "",
    end_date: "",
  },
};

let abortController: AbortController | null = null;

export const searchAnime = createAsyncThunk(
  "anime/search",
  async (
    {
      query,
      page,
      filters,
    }: { query: string; page: number; filters: AnimeFilters },
    { rejectWithValue }
  ) => {
    if (!query.trim()) {
      return {
        data: [],
        pagination: { last_visible_page: 1, has_next_page: false },
      };
    }

    // Cancel previous request
    if (abortController) {
      abortController.abort();
    }

    // Create new abort controller
    abortController = new AbortController();

    try {
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: "20",
      });

      // Add filters if they exist
      if (filters.type) params.append("type", filters.type);
      if (filters.status) params.append("status", filters.status);
      if (filters.rating) params.append("rating", filters.rating);
      if (filters.genres) params.append("genres", filters.genres);
      if (filters.min_score) params.append("min_score", filters.min_score);
      if (filters.start_date) params.append("start_date", filters.start_date);
      if (filters.end_date) params.append("end_date", filters.end_date);

      const response = await fetch(
        `https://api.jikan.moe/v4/anime?${params.toString()}`,
        { signal: abortController.signal }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch anime");
      }

      const data = await response.json();
      return {
        data: data.data as Anime[],
        pagination: data.pagination,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          return rejectWithValue("Request cancelled");
        }
      }
      return rejectWithValue("Failed to fetch anime");
    }
  }
);

export const fetchTrendingAnime = createAsyncThunk(
  "anime/trending",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://api.jikan.moe/v4/top/anime?limit=20"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch trending anime");
      }

      const data = await response.json();
      return data.data as Anime[];
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch trending anime");
    }
  }
);

export const fetchAnimeById = createAsyncThunk(
  "anime/fetchById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch anime details");
      }

      const data = await response.json();
      return data.data as Anime;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch anime details");
    }
  }
);

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to page 1 on new search
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<AnimeFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to page 1 on filter change
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.currentPage = 1;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = "";
      state.currentPage = 1;
    },
    clearSelectedAnime: (state) => {
      state.selectedAnime = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Search anime
      .addCase(searchAnime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAnime.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.data;
        state.totalPages = action.payload.pagination.last_visible_page;
        state.hasNextPage = action.payload.pagination.has_next_page;
      })
      .addCase(searchAnime.rejected, (state, action) => {
        state.loading = false;
        if (action.payload !== "Request cancelled") {
          state.error = action.payload as string;
        }
      })
      // Fetch trending anime
      .addCase(fetchTrendingAnime.pending, (state) => {
        state.trendingLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingAnime.fulfilled, (state, action) => {
        state.trendingLoading = false;
        state.trendingAnime = action.payload;
      })
      .addCase(fetchTrendingAnime.rejected, (state, action) => {
        state.trendingLoading = false;
        state.error = action.payload as string;
      })
      // Fetch anime by ID
      .addCase(fetchAnimeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAnime = action.payload;
      })
      .addCase(fetchAnimeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchQuery,
  setPage,
  setFilters,
  clearFilters,
  clearSearchResults,
  clearSelectedAnime,
} = animeSlice.actions;
export default animeSlice.reducer;
