import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Calendar, Tv, Clock } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { fetchAnimeById, clearSelectedAnime } from "@/store/slices/animeSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const AnimeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedAnime, loading, error } = useAppSelector(
    (state) => state.anime
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchAnimeById(Number(id)));
    }

    return () => {
      dispatch(clearSelectedAnime());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--custom-bg))] flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--custom-primary))]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-xl mb-4">Error: {error}</p>
          <Link to="/">
            <Button>Back to Search</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!selectedAnime) {
    return (
      <div className="min-h-screen bg-[hsl(var(--custom-bg))] flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[hsl(var(--custom-bg))]">
      <div className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${selectedAnime.images.jpg.large_image_url})`,
          }}
        >
          <div className="absolute inset-0  bg-linear-to-t from-[hsl(var(--custom-bg))] via-[hsl(var(--custom-bg))]/80 to-[hsl(var(--custom-bg))]/40" />
        </div>

        <div className="container mx-auto px-4 h-full relative z-10">
          <Link to="/">
            <Button
              variant="ghost"
              className="mt-8 text-[hsl(var(--custom-foreground))] hover:text-primary"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Search
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid md:grid-cols-[300px_1fr] gap-8">
          <div className="flex justify-center md:justify-start">
            <img
              src={selectedAnime.images.jpg.large_image_url}
              alt={selectedAnime.title}
              className="rounded-lg shadow-card border border-border w-full max-w-[300px]"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[hsl(var(--custom-foreground))] mb-2">
                {selectedAnime.title_english || selectedAnime.title}
              </h1>
              {selectedAnime.title_english && (
                <p className="text-xl text-[hsl(var(--custom-muted-foreground))]">
                  {selectedAnime.title}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {selectedAnime.score && (
                <div className="flex items-center gap-2 bg-[hsl(var(--custom-card))] px-4 py-2 rounded-lg border  border-[hsl(var(--custom-border))] ">
                  <Star className="h-5 w-5 fill-[hsl(var(--custom-primary))] text-[hsl(var(--custom-primary))] " />
                  <span className="text-lg font-semibold text-[hsl(var(--custom-foreground))]">
                    {selectedAnime.score.toFixed(1)}
                  </span>
                </div>
              )}

              {selectedAnime.year && (
                <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-lg border   border-[hsl(var(--custom-border))]">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">{selectedAnime.year}</span>
                </div>
              )}

              {selectedAnime.type && (
                <div className="flex items-center gap-2 bg-[hsl(var(--custom-card))] px-4 py-2 rounded-lg border  border-[hsl(var(--custom-border))]">
                  <Tv className="h-5 w-5 text-[hsl(var(--custom-muted-foreground))]" />
                  <span className="text-[hsl(var(--custom-foreground))]">
                    {selectedAnime.type}
                  </span>
                </div>
              )}

              {selectedAnime.episodes && (
                <div className="flex items-center gap-2 bg-[hsl(var(--custom-card))] px-4 py-2 rounded-lg border   border-[hsl(var(--custom-border))]">
                  <Clock className="h-5 w-5 text-[hsl(var(--custom-muted-foreground))]" />
                  <span className="text-[hsl(var(--custom-foreground))]">
                    {selectedAnime.episodes} episodes
                  </span>
                </div>
              )}
            </div>

            {selectedAnime.genres && selectedAnime.genres.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-[hsl(var(--custom-foreground))] mb-2">
                  Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAnime.genres.map((genre) => (
                    <Badge
                      key={genre.mal_id}
                      variant="secondary"
                      className="bg-pink-500 text-[hsl(var(--custom-foreground))]"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedAnime.synopsis && (
              <div>
                <h3 className="text-2xl font-semibold text-[hsl(var(--custom-foreground))] mb-3">
                  Synopsis
                </h3>
                <p className="text-[hsl(var(--custom-muted-foreground))] leading-relaxed text-lg">
                  {selectedAnime.synopsis}
                </p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {selectedAnime.status && (
                <div className="bg-[hsl(var(--custom-card))] p-4 rounded-lg border  border-[hsl(var(--custom-border))]">
                  <h4 className="text-sm font-semibold text-[hsl(var(--custom-foreground))] mb-1">
                    Status
                  </h4>
                  <p className="text-[hsl(var(--custom-foreground))]">
                    {selectedAnime.status}
                  </p>
                </div>
              )}

              {selectedAnime.rating && (
                <div className="bg-[hsl(var(--custom-card))] p-4 rounded-lg border border-[hsl(var(--custom-border))]">
                  <h4 className="text-sm font-semibold text-[hsl(var(--custom-muted-foreground))] mb-1">
                    Rating
                  </h4>
                  <p className="text-[hsl(var(--custom-foreground))]">
                    {selectedAnime.rating}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </div>
  );
};

export default AnimeDetail;
