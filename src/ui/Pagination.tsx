import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAppDispatch, useAppSelector } from "@/store/storeHooks";
import { setPage } from "@/store/slices/animeSlice";

function AppPagination() {
  const dispatch = useAppDispatch();
  const { searchQuery, currentPage, totalPages, hasNextPage } = useAppSelector(
    (state) => state.anime
  );

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (!searchQuery || totalPages <= 1) return null;

  const pages = [];
  const isMobile = window.innerWidth < 640;
  const maxVisiblePages = isMobile ? 3 : 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <Pagination className="mt-8 bg-transparent">
      <PaginationContent className="text-[hsl(var(--custom-foreground))] bg-transparent">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {startPage > 1 && (
          <>
            <PaginationItem className=" ">
              <PaginationLink
                className={`cursor-pointer ${
                  currentPage === 1
                    ? "bg-none text-[hsl(var(--custom-muted-foreground))] hover:bg-[hsl(var(--custom-primary))]"
                    : "bg-[hsl(var(--custom-card))] hover:bg-[hsl(var(--custom-muted))] border-[hsl(var(--custom-border))]"
                }`}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              isActive={currentPage === page}
              className="cursor-pointer"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(totalPages)}
                className="cursor-pointer"
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => hasNextPage && handlePageChange(currentPage + 1)}
            className={
              !hasNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default AppPagination;
