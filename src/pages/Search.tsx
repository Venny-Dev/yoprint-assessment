import Filters from "@/components/Filters";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/storeHooks";
import AnimeGrid from "@/ui/AnimeGrid";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
// import { useAppSelector } from "@/store";

const Search = () => {
  const { favorites } = useAppSelector((state) => state.favorites);

  return (
    <div className="min-h-screen  bg-[hsl(var(--custom-bg))]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary py-16 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTI0IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex justify-end mb-4">
            <Link to="/favorites">
              <Button
                variant="outline"
                className=" border-white/30  relative bg-[hsl(var(--custom-bg))] text-[hsl(var(--custom-foreground))]"
              >
                <Heart className="mr-2 h-4 w-4" />
                My Watchlist
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[hsl(var(--custom-secondary))] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </Link>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-4 text-white">
            Discover Anime
          </h1>
          <p className="text-center text-white/90 mb-8 text-lg">
            Search from thousands of anime titles
          </p>
          <SearchBar />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Filters />
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-12">
        <AnimeGrid />
      </div>
    </div>
  );
};

export default Search;
