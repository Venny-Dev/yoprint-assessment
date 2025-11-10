import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AnimeCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-[hsl(var(--custom-bg))] border-[hsl(var(--custom-border))] h-full">
      <Skeleton className="aspect-2/3 w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </Card>
  );
}
