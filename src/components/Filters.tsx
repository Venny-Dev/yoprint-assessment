import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { setFilters, clearFilters } from "@/store/slices/animeSlice";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export default function Filters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.anime.filters);

  const handleFilterChange = (key: string, value: string) => {
    dispatch(setFilters({ [key]: value === "all" ? "" : value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="bg-[hsl(var(--custom-card))] border  border-[hsl(var(--custom-border))] rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[hsl(var(--custom-foreground))]">
          Filters
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-[hsl(var(--custom-muted-foreground))] hover:text-[hsl(var(--custom-muted-foreground))]"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Type Filter */}
        <div>
          <label className="text-sm font-medium text-[hsl(var(--custom-muted-foreground))] mb-2 block">
            Type
          </label>
          <Select
            value={filters.type || "all"}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="text-[hsl(var(--custom-foreground))] border-[hsl(var(--custom-border))] ">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(var(--custom-bg))] text-[hsl(var(--custom-foreground))] border-[hsl(var(--custom-border))]">
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tv">TV</SelectItem>
              <SelectItem value="movie">Movie</SelectItem>
              <SelectItem value="ova">OVA</SelectItem>
              <SelectItem value="special">Special</SelectItem>
              <SelectItem value="ona">ONA</SelectItem>
              <SelectItem value="music">Music</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="text-sm font-medium text-[hsl(var(--custom-muted-foreground))] mb-2 block">
            Status
          </label>
          <Select
            value={filters.status || "all"}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="text-[hsl(var(--custom-foreground))] border-[hsl(var(--custom-border))] ">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(var(--custom-bg))] text-[hsl(var(--custom-foreground))] border-[hsl(var(--custom-border))]">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="airing">Airing</SelectItem>
              <SelectItem value="complete">Completed</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="text-sm font-medium text-[hsl(var(--custom-muted-foreground))] mb-2 block">
            Rating
          </label>
          <Select
            value={filters.rating || "all"}
            onValueChange={(value) => handleFilterChange("rating", value)}
          >
            <SelectTrigger className="text-[hsl(var(--custom-foreground))] border-[hsl(var(--custom-border))] ">
              <SelectValue placeholder="All Ratings" />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(var(--custom-bg))] text-[hsl(var(--custom-foreground))] border-[hsl(var(--custom-border))]">
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="g">G - All Ages</SelectItem>
              <SelectItem value="pg">PG - Children</SelectItem>
              <SelectItem value="pg13">PG-13 - Teens 13+</SelectItem>
              <SelectItem value="r17">R - 17+</SelectItem>
              <SelectItem value="r">R+ - Mild Nudity</SelectItem>
              <SelectItem value="rx">Rx - Hentai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Min Score Filter */}
        <div>
          <label className="text-sm font-medium text-[hsl(var(--custom-muted-foreground))] mb-2 block">
            Min Score
          </label>
          <Select
            value={filters.min_score || "all"}
            onValueChange={(value) => handleFilterChange("min_score", value)}
          >
            <SelectTrigger className="text-[hsl(var(--custom-foreground))] border-[hsl(var(--custom-border))] ">
              <SelectValue placeholder="Any Score" />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(var(--custom-bg))] text-[hsl(var(--custom-foreground))] border-[hsl(var(--custom-border))]">
              <SelectItem value="all">Any Score</SelectItem>
              <SelectItem value="9">9+</SelectItem>
              <SelectItem value="8">8+</SelectItem>
              <SelectItem value="7">7+</SelectItem>
              <SelectItem value="6">6+</SelectItem>
              <SelectItem value="5">5+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
