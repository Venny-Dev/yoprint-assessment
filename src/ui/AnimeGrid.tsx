import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { AnimeCard } from "./AnimeCard";
import { Loader2 } from "lucide-react";
import { fetchTrendingAnime, setPage } from "@/store/slices/animeSlice";
import AppPagination from "./Pagination";
import AnimeCardSkeleton from "./AnimeCardSkeleton";

export default function AnimeGrid() {
  const dispatch = useAppDispatch();
  const observerTarget = useRef<HTMLDivElement>(null);

  const {
    searchResults,
    trendingAnime,
    loading,
    trendingLoading,
    error,
    searchQuery,
    currentPage,
    hasNextPage,
  } = useAppSelector((state) => state.anime);

  useEffect(() => {
    if (!searchQuery && (!trendingAnime || trendingAnime.length === 0)) {
      dispatch(fetchTrendingAnime());
    }
  }, [searchQuery, trendingAnime, dispatch]);

  const loadMore = useCallback(() => {
    if (searchQuery && hasNextPage && !loading) {
      dispatch(setPage(currentPage + 1));
    }
  }, [searchQuery, hasNextPage, loading, currentPage, dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore]);

  if (loading && currentPage === 1 && searchQuery) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <AnimeCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive text-lg">Error: {error}</p>
      </div>
    );
  }

  if (searchQuery && searchResults.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">
          No anime found. Try a different search.
        </p>
      </div>
    );
  }

  if (!searchQuery) {
    if (trendingLoading) {
      return (
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Trending Anime
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 20 }).map((_, index) => (
              <AnimeCardSkeleton key={index} />
            ))}
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2 className="text-3xl font-bold text-[hsl(var(--custom-foreground))] mb-6">
          Trending Anime
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingAnime.map((anime) => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {searchResults.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>

      {searchQuery && hasNextPage && (
        <div
          ref={observerTarget}
          className="flex justify-center items-center py-8"
        >
          {loading && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
        </div>
      )}
      <AppPagination />
    </div>
  );
}
