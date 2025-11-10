import { useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { searchAnime, setSearchQuery } from "@/store/slices/animeSlice";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.anime.searchQuery);
  const debounceRef = useRef<number | null>(null);

  const currentPage = useAppSelector((state) => state.anime.currentPage);
  const filters = useAppSelector((state) => state.anime.filters);

  useEffect(() => {
    // Debounce the search with 250ms delay
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        dispatch(
          searchAnime({ query: searchQuery, page: currentPage, filters })
        );
      }
    }, 250);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, currentPage, filters, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        placeholder="Search for anime..."
        value={searchQuery}
        onChange={handleChange}
        className="pl-12 h-14 text-lg bg-[hsl(var(--custom-bg))] border-[hsl(var(--custom-border))] focus:border-[hsl(var(--custom-bg))]/50 text-[hsl(var(--custom-foreground))] focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}
