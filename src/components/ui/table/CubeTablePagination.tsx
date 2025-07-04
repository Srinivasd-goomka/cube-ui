import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { TablePaginationProps } from "../../../types";

const CubeTablePagination: React.FC<TablePaginationProps> = ({
  total,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    // Only update if page actually changes
    if (pageNumber !== currentPage) {
      onPageChange(pageNumber);
    }
    // Always update URL to reflect requested page
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("page", pageNumber.toString());
      return newParams;
    });
  };

  const goToFirstPage = () => handlePageChange(1);
  const goToLastPage = () => handlePageChange(totalPages);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    let page = pageParam ? parseInt(pageParam, 10) : 1;

    if (isNaN(page)) page = 1;
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;

    // Calculate desired page from URL
    const urlPage = page;

    // Only update if URL has different page than current state
    if (urlPage !== currentPage) {
      onPageChange(urlPage);
    }

    // If URL has invalid value, correct it
    if (pageParam !== urlPage.toString()) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("page", urlPage.toString());
        return newParams;
      });
    }
  }, [searchParams, totalPages]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      const pageNumber = parseInt(target.value, 10);

      if (!isNaN(pageNumber)) {
        handlePageChange(pageNumber);
        target.value = "";
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-3 pb-4">
      {/* Pagination Controls */}
      <nav aria-label="Page navigation">
        <ul className="flex items-center space-x-1">
          {/* Previous Page Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center w-8 h-8 rounded ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200 cursor-pointer"
              }`}
              aria-label="Previous page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
            </button>
          </li>

          {/* First Page */}
          {currentPage > 2 && (
            <>
              <li>
                <button
                  onClick={goToFirstPage}
                  className="flex items-center justify-center w-8 h-8 text-gray-700 rounded hover:bg-gray-200"
                >
                  1
                </button>
              </li>
              {currentPage > 3 && (
                <li className="flex items-center justify-center w-8 h-8 text-gray-500">
                  ...
                </li>
              )}
            </>
          )}

          {/* Current Page and Adjacent Pages */}
          {currentPage >= 1 && currentPage <= totalPages && (
            <>
              {currentPage > 1 && (
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="flex items-center justify-center w-8 h-8 text-gray-700 rounded hover:bg-gray-200"
                  >
                    {currentPage - 1}
                  </button>
                </li>
              )}

              <li>
                <span className="flex items-center justify-center w-8 h-8 text-white bg-blue-600 rounded">
                  {currentPage}
                </span>
              </li>

              {currentPage < totalPages && (
                <li>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="flex items-center justify-center w-8 h-8 text-gray-700 rounded hover:bg-gray-200"
                  >
                    {currentPage + 1}
                  </button>
                </li>
              )}
            </>
          )}

          {/* Last Pages */}
          {currentPage < totalPages - 1 && (
            <>
              {currentPage < totalPages - 3 && (
                <li className="flex items-center justify-center w-8 h-8 text-gray-500">
                  ...
                </li>
              )}
              {currentPage < totalPages - 2 && (
                <li>
                  <button
                    onClick={() => handlePageChange(totalPages - 1)}
                    className="flex items-center justify-center w-8 h-8 text-gray-700 rounded hover:bg-gray-200"
                  >
                    {totalPages - 1}
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={goToLastPage}
                  className="flex items-center justify-center w-8 h-8 text-gray-700 rounded hover:bg-gray-200"
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}

          {/* Next Page Button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center w-8 h-8 rounded ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-200 cursor-pointer"
              }`}
              aria-label="Next page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>

      {/* Page Jump Input (for more than 10 pages) */}
      {totalPages > 10 && (
        <div className="hidden md:flex items-center space-x-2">
          <div className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#AFBACA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M17 5l-10 14" />
            </svg>
          </div>
          <div className="flex items-center space-x-1">
            <label className="text-sm text-gray-600">Go to</label>
            <input
              type="number"
              className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Page"
              min="1"
              max={totalPages}
              onKeyUp={handleKeyUp}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CubeTablePagination;
