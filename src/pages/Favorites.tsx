import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
// import { useAppSelector } from "@/store/hooks";
// import { AnimeCard } from "@/components/AnimeCard";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/storeHooks";
import { AnimeCard } from "@/ui/AnimeCard";

const Favorites = () => {
  const { favorites } = useAppSelector((state) => state.favorites);

  return (
    <div className="min-h-screen bg-[hsl(var(--custom-bg))]">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-primary py-16 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTI0IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <Link to="/">
            <Button
              variant="outline"
              className="mb-4 text-white border-white/30  bg-[hsl(var(--custom-bg))]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="h-10 w-10 text-white fill-white" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              My Watchlist
            </h1>
          </div>
          <p className="text-center text-white/90 text-lg">
            {favorites.length} {favorites.length === 1 ? "anime" : "anime"}{" "}
            saved
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="h-20 w-20 mx-auto mb-4 text-[hsl(var(--custom-muted-foreground))] " />
            <h2 className="text-2xl font-semibold text-[hsl(var(--custom-foreground))] mb-2">
              Your watchlist is empty
            </h2>
            <p className="text-[hsl(var(--custom-muted-foreground))] mb-6">
              Start adding anime to your favorites to keep track of what you
              want to watch!
            </p>
            <Link to="/">
              <Button className="bg-blue-400">Browse Anime</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {favorites.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
