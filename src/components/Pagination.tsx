import { useApi } from "../context/ApiContext";

export function Pagination() {
    
    const { info, updateQueryParams } = useApi();

    function paginateTo(url: string | null): void {
        if (!url) return;
      
        try {
          const page = new URL(url).searchParams.get("page");
          updateQueryParams({ page: Number(page) });
        } catch {
          return;
        }
      }
      

    return (
        <div className="filters__pagination">
            <button disabled={info?.prev === null} onClick={() => paginateTo(info?.prev)}>
                Previous
            </button>
            <button disabled={info?.next === null} onClick={() => paginateTo(info?.next)}>
                Next
            </button>
        </div>
    )
}