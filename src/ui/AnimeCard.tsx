import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import type { Anime } from "@/store/slices/animeSlice";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { addFavorite, removeFavorite } from "@/store/slices/favoritesSlice";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { Button } from "@/components/ui/button";

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.mal_id === anime.mal_id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFavorite(anime.mal_id));
      toast.success("Removed from watchlist");
    } else {
      dispatch(addFavorite(anime));
      toast.success("Added to watchlist");
    }
  };
  return (
    <Link to={`/anime/${anime.mal_id}`}>
      <Card className="group overflow-hidden  bg-[hsl(var(--custom-card))] border-[hsl(var(--custom-border))] hover:border-[hsl(var(--custom-primary))]/50 transition-all duration-300 hover:[box-shadow:0_0_40px_hsl(200_100%_50%/0.3)] hover:-translate-y-1 cursor-pointer h-full">
        <div className="aspect-2/3 overflow-hidden relative">
          <img
            src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
            alt={anime.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 left-2 h-8 w-8 bg-[hsl(var(--custom-bg))]/90 backdrop-blur-sm hover:bg-[hsl(var(--custom-bg))]/80 border-none"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={`h-4 w-4 transition-all ${
                isFavorite
                  ? "fill-[hsl(var(--custom-secondary))] text-[hsl(var(--custom-secondary))]"
                  : "text-[hsl(var(--custom-foreground))]"
              }`}
            />
          </Button>
          {anime.score && (
            <div className="absolute top-2 right-2 bg-[hsl(var(--custom-bg))]/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
              <Star className="h-4 w-4 fill-[hsl(var(--custom-primary))] text-[hsl(var(--custom-primary))] transition-colors" />
              <span className="text-sm font-semibold text-[hsl(var(--custom-foreground))]">
                {anime.score.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-[hsl(var(--custom-foreground))] line-clamp-2 mb-2 group-hover:text-[hsl(var(--custom-primary))] transition-colors">
            {anime.title_english || anime.title}
          </h3>
          <div className="flex items-center justify-between text-sm text-[hsl(var(--custom-muted-foreground))]">
            <span className="px-2 py-1 bg-[hsl(var(--custom-muted))] rounded text-xs font-medium">
              {anime.type || "Unknown"}
            </span>
            {anime.episodes && <span>{anime.episodes} episodes</span>}
          </div>
        </div>
      </Card>
    </Link>
  );
};
