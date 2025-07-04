import React, {
  useState,
  useMemo,
  useEffect,
  ChangeEvent,
  useRef,
  useCallback,
} from "react";
import { helperService } from "../../../services/helper";
import {
  cn,
  flattenData,
  formatPhoneNumber,
  getTicketCodeName,
  PER_PAGE_OPTIONS,
} from "../../../lib/helpers";
import { Column, CubeTableProps } from "../../../types";
import CubeTablePagination from "./CubeTablePagination";
import { useSearchParams } from "react-router-dom";
import { LoadingOverlay } from "../loading-overlay/LoadingOverlay";
import { X } from "lucide-react";
import { useDebouncedValue } from "../../../hooks";
import { CubeSelect } from "../select/CubeSelect";
import { useForm } from "@mantine/form";

const CubeTable: React.FC<CubeTableProps> = ({
  columns,
  data = [],
  url = "",
  searchableColumns = [],
  isSearch = false,
  isCheckbox = false,
  isActions = false,
  isFooter = false,
  isFilters = false,
  isPagination = false,
  isPerPage = true,
  lineitemTotal = "",
  actions = [],
  filters = [],
  onSelectedRowsChange,
  isSingleSelect = false,
  fixedHeader = true,
  fixedLeftColumns = 0,
  fixedRightColumns = 0,
  searchType = "client", // 'client' or 'server'
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortedData, setSortedData] = useState<Record<string, unknown>[]>(data);
  const [apiData, setApiData] = useState<Record<string, unknown>[]>(data);
  const [selectedRows, setSelectedRows] = useState<(string | number)[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [pageLimit, setPageLimit] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search_text") || ""
  );
  const debouncedSearch = useDebouncedValue(searchQuery, 500);

  const [filterValues, setFilterValues] = useState<
    Record<string, (string | number)[]>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const checkboxRef = useRef<HTMLInputElement>(null);

  // Get current page from URL
  const currentPage = parseInt(searchParams.get("page") || "1");

  // API data fetching
  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        // const dataList = data.map((item) =>
        //   flattenData(item as Record<string, unknown>)
        // ) as Record<string, unknown>[];
        setApiData(data);
        setSortedData(data);
        setIsLoading(false);
        setIsInitialLoad(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams(searchParams);
        params.set("limit", pageLimit.toString());

        if (searchType === "server") {
          params.set("search_text", debouncedSearch);
        }

        const apiUrl = `${url}?${params.toString()}`;
        const result = await helperService.get(apiUrl);

        const typedResult = result as {
          data?: unknown[];
          total?: number;
        };

        if (typedResult.data !== undefined) {
          setTotal(Number(typedResult.total) || 0);

          // const dataList = typedResult.data.map((item) =>
          //   flattenData(item as Record<string, unknown>)
          // ) as Record<string, unknown>[];
          console.log("dataList", typedResult.data)
          setApiData(typedResult.data);

          if (searchType === "server") {
            setSortedData(typedResult.data);
          }
        }
      } catch (err: unknown) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    };

    fetchData();
  }, [url, pageLimit, debouncedSearch, searchType, currentPage]);

  // Update sorted data for client-side search
  useEffect(() => {
    if (searchType === "client") {
      setSortedData(url ? apiData : data);
    }
  }, [apiData, data, url, searchType]);

  // Sorting handler
  const handleSort = (column: Column) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === column.key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column.key, direction });

    const sorted = [...sortedData].sort((a, b) => {
      const aValue = a[column.key];
      const bValue = b[column.key];

      if (aValue === bValue) return 0;
      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;

      if (typeof aValue === "string" && typeof bValue === "string") {
        return direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

    setSortedData(sorted);
  };

  // Selection change callback
  useEffect(() => {
    if (onSelectedRowsChange) {
      const selectedRowObjects = sortedData.filter((row) =>
        selectedRows.includes(row.id as string | number)
      );
      onSelectedRowsChange(selectedRowObjects);
    }
  }, [selectedRows, onSelectedRowsChange, sortedData]);

  // Row selection handler
  const handleSelectRow = (id: string | number) => {
    if (isSingleSelect) {
      setSelectedRows(selectedRows.includes(id) ? [] : [id]);
    } else {
      setSelectedRows(
        selectedRows.includes(id)
          ? selectedRows.filter((rowId) => rowId !== id)
          : [...selectedRows, id]
      );
    }
  };

  useEffect(() => {
    if (searchType === "server") {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);

        if (debouncedSearch) {
          newParams.set("search_text", debouncedSearch);
        } else {
          newParams.delete("search_text");
        }

        // Always reset to page 1 when search changes
        if (searchQuery !== prevParams.get("search_text")) {
          newParams.set("page", "1");
        }

        return newParams;
      });
    }
  }, [debouncedSearch, searchType, setSearchParams]);

  // Handle select all
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate =
        selectedRows.length > 0 && selectedRows.length < data.length;
    }
  }, [selectedRows, data]);

  // Search handler
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter handler
  const handleFilterChange = (key: string, value: string | number) => {
    setFilterValues((prev) => {
      const current = prev[key] || [];
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  // Handle page changes
  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.set("page", page.toString());
        return newParams;
      });
    },
    [setSearchParams]
  );

  // Filtered data calculation
  const filteredData = useMemo(() => {
    let result = sortedData;

    // Apply client-side search
    if (
      searchType === "client" &&
      isSearch &&
      searchQuery &&
      searchableColumns.length
    ) {
      const query = searchQuery.toLowerCase();
      result = result.filter((row) =>
        searchableColumns.some((colKey) =>
          String(row[colKey]).toLowerCase().includes(query)
        )
      );
    }

    // Apply filters
    if (isFilters && filters.length) {
      result = result.filter((row) =>
        filters.every((filter) => {
          const filterVals = filterValues[filter.key];
          return (
            !filterVals?.length ||
            filterVals.includes(row[filter.key] as string | number)
          );
        })
      );
    }

    return result;
  }, [
    sortedData,
    filters,
    filterValues,
    searchQuery,
    isSearch,
    isFilters,
    searchableColumns,
    searchType,
  ]);

  // Calculate total for client-side search
  const totalForPagination = useMemo(() => {
    if (searchType === "client") {
      return filteredData.length;
    }
    return total;
  }, [filteredData, total, searchType]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  // Render status badges
  const renderStatus = (status: string) => {
    const statusStyles: Record<string, string> = {
      "Quote In Progress": "bg-yellow-500",
      "Hauler Quote": "bg-cyan-500",
      Canceled: "bg-red-500",
      Sale: "bg-green-500",
      default: "bg-gray-500",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${
          statusStyles[status] || statusStyles.default
        }`}
      >
        {status}
      </span>
    );
  };

  // Render cell data
  const renderCelldata = (col: Column, row: Record<string, unknown>) => {
    const value = row[col.key];

    if (col.isLink) {
      const href =
        typeof col.linkPath === "function"
          ? (col.linkPath as (row: Record<string, unknown>) => string)(row)
          : typeof col.linkPath === "string"
          ? col.linkPath
          : `#`;

      return (
        <a
          href={href}
          className={cn(
            "text-blue-600 hover:text-blue-800 hover:underline",
            col.linkClass
          )}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {value as React.ReactNode}
        </a>
      );
    }

    if (col.currency) {
      return value ? `$${value.toString().replace(/\.00$/, "")}.00` : "";
    }

    if (col.formatPhone) {
      return formatPhoneNumber(String(value));
    }

    if (col.key === "display_status") {
      return renderStatus(String(value));
    }

    if (col.key === "cust_ticket_code") {
      return (
        <div className="flex flex-col">
          <span>{String(row.ticket_code)}</span>
          {typeof row.ticket_code === "string" &&
            getTicketCodeName(row.ticket_code.split("_")[0]) === "RENTAL" &&
            row.cycle_start_date !== "-" && (
              <span className="text-xs">
                ({String(row.cycle_start_date)}-{String(row.cycle_end_date)})
              </span>
            )}
        </div>
      );
    }

    if (value !== undefined && value !== null) {
      if (typeof value === "object") {
        if (value instanceof Date) {
          return value.toLocaleString();
        }
        return <span>{JSON.stringify(value)}</span>;
      }
      return <>{String(value)}</>;
    }

    return null;
  };

  // Render filter options
  const renderFilters = () =>
    filters.map((filter) => {
      const uniqueValues = Array.from(
        new Set(sortedData.map((row) => row[filter.key]))
      );

      return (
        <div key={filter.key} className="mb-2">
          <strong className="block mb-1 text-sm font-medium">
            {filter.label}
          </strong>
          <div className="flex flex-wrap gap-2">
            {uniqueValues.map((value) => (
              <label
                key={String(value)}
                className="flex items-center space-x-1 text-sm"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={
                    filterValues[filter.key]?.includes(
                      value as string | number
                    ) || false
                  }
                  onChange={() =>
                    handleFilterChange(filter.key, value as string | number)
                  }
                />
                <span>{String(value)}</span>
              </label>
            ))}
          </div>
        </div>
      );
    });

  // Calculate fixed column styles
  const getFixedColumnStyle = (index: number, isHeader = false) => {
    const styles: React.CSSProperties = {};
    const zIndexBase = isHeader ? 50 : 40;

    // Fixed left columns
    if (fixedLeftColumns > 0 && index < fixedLeftColumns) {
      styles.position = "sticky";
      styles.left = index === 0 ? 0 : `calc(${index} * var(--col-width))`;
      styles.zIndex = zIndexBase - index;
      styles.backgroundColor = "white";
    }

    // Fixed right columns
    if (fixedRightColumns > 0 && index >= columns.length - fixedRightColumns) {
      const rightIndex = columns.length - 1 - index;
      styles.position = "sticky";
      styles.right =
        rightIndex === 0 ? 0 : `calc(${rightIndex} * var(--col-width))`;
      styles.zIndex = zIndexBase - rightIndex;
      styles.backgroundColor = "white";
    }

    return styles;
  };

  // Set column width variables
  useEffect(() => {
    if (tableContainerRef.current) {
      columns.forEach((col, index) => {
        if (col.width) {
          tableContainerRef.current?.style.setProperty(
            `--col-${index}-width`,
            `${col.width}px`
          );
        }
      });
    }
  }, [columns]);

  // Render sort icon based on state
  const renderSortIcon = (column: Column) => {
    const isSorted = sortConfig.key === column.key;
    const isHovered = hoveredColumn === column.key;

    // Always show icon if sorted
    if (isSorted) {
      return sortConfig.direction === "asc" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    // Show double arrow on hover for unsorted columns
    if (isHovered) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12zm10-4a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
        </svg>
      );
    }

    // Show nothing by default for unsorted columns
    return null;
  };

  type FormValues = {
    perPage: string;
  };
  const perPageForm = useForm<FormValues>({
    initialValues: {
      perPage: "10",
    },
  });

  useEffect(() => {
    const perPageValue = perPageForm.values.perPage;
    setPageLimit(Number(perPageValue));
  }, [perPageForm.values.perPage]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between border-b bottom-1 relative z-40 gap-2 px-4 pb-2 pt-3">
        {/* Search Input */}
        {isSearch && (
          <div className="relative">
            <input
              type="text"
              className="w-full px-8 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
            <div className="absolute inset-y-0 left-2 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4">
          {/* Page Limit Selector */}
          {isPerPage && (
            <CubeSelect
              key={pageLimit}
              label=""
              name="perPage"
              //@ts-expect-error example
              form={perPageForm}
              options={PER_PAGE_OPTIONS}
              searchable={false}
              clearable={false}
              className="h-8 w-20"
            />
          )}

          {/* Filter Panel */}
          {isFilters && filters.length > 0 && (
            <div className="p-4 bg-gray-50 rounded-md">
              <h4 className="mb-3 text-lg font-medium text-gray-700">
                Filters
              </h4>
              {renderFilters()}
            </div>
          )}
          <div className="text-sm">{`${pageLimit} of ${total} records`}</div>
        </div>
      </div>

      {/* Loading State */}
      {isInitialLoad && isLoading && (
        <div className="flex items-center justify-center p-6">
          <div className="w-8 h-8 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <span className="ml-2 text-gray-600">Loading data...</span>
        </div>
      )}

      {/* <div className="relative"> */}
      {/* Error State */}
      {error && !isLoading && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Table Container */}
      {!isInitialLoad && !error && (
        <>
          <div
            ref={tableContainerRef}
            className="relative overflow-auto max-h-[70vh]"
          >
            <table className="min-w-full divide-y divide-gray-200">
              {/* Fixed Header */}
              <thead
                className={`${
                  fixedHeader ? "sticky top-0 z-30" : "bg-gray-50"
                }`}
              >
                <tr>
                  {isCheckbox && (
                    <th
                      scope="col"
                      className="sticky left-0 z-40 px-6 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50"
                      style={{ minWidth: "40px" }}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        checked={selectAll}
                        onChange={() => setSelectAll(!selectAll)}
                        ref={checkboxRef}
                      />
                    </th>
                  )}

                  {columns.map((col, index) => (
                    <th
                      key={`h${col.key}-${index}`}
                      scope="col"
                      className={`px-6 py-2 text-xs font-medium tracking-wider text-left text-gray-500 uppercase bg-gray-50 ${
                        index < fixedLeftColumns
                          ? "sticky left-0 z-40"
                          : index >= columns.length - fixedRightColumns
                          ? "sticky right-0 z-40"
                          : ""
                      }`}
                      style={{
                        minWidth: col.width ? `${col.width}px` : "50px",
                        ...getFixedColumnStyle(index, true),
                      }}
                      onMouseEnter={() => setHoveredColumn(col.key)}
                      onMouseLeave={() => setHoveredColumn(null)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">{col.label}</span>
                        <button
                          type="button"
                          className="flex items-center justify-center w-6 h-6 ml-2 rounded hover:bg-gray-200"
                          onClick={() => handleSort(col)}
                          aria-label={`Sort by ${col.label}`}
                        >
                          {renderSortIcon(col)}
                        </button>
                      </div>
                    </th>
                  ))}

                  {isActions && (
                    <th
                      scope="col"
                      className={`sticky right-0 z-40 px-6 py-2 text-xs font-medium tracking-wider text-center text-gray-500 uppercase bg-gray-50`}
                      style={{ minWidth: "120px" }}
                    >
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <tr
                      key={String(row.uniqId ?? row.id)}
                      className={`group hover:bg-gray-50 ${
                        selectedRows.includes(row.id as string | number)
                          ? "bg-blue-50"
                          : "bg-white"
                      }`}
                    >
                      {isCheckbox && (
                        <td
                          className="sticky left-0 z-30 px-6 py-3 whitespace-nowrap bg-white group-hover:bg-gray-50"
                          style={{ minWidth: "40px" }}
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            checked={selectedRows.includes(
                              row.id as string | number
                            )}
                            onChange={() =>
                              handleSelectRow(row.id as string | number)
                            }
                          />
                        </td>
                      )}

                      {columns.map((col, index) => (
                        <td
                          key={`r${col.key}-${index}`}
                          className={`px-6 py-3 whitespace-nowrap ${
                            col.align === "right"
                              ? "text-right"
                              : col.align === "center"
                              ? "text-center"
                              : "text-left"
                          } ${
                            index < fixedLeftColumns
                              ? "sticky left-0 z-20"
                              : index >= columns.length - fixedRightColumns
                              ? "sticky right-0 z-20"
                              : ""
                          }`}
                          style={{
                            minWidth: col.width ? `${col.width}px` : "60px",
                            ...getFixedColumnStyle(index),
                          }}
                        >
                          <div className="text-sm text-gray-900 truncate max-w-xs">
                            {renderCelldata(col, row)}
                          </div>
                        </td>
                      ))}

                      {isActions && (
                        <td
                          className="sticky right-0 z-30 px-6 py-3 text-sm font-medium text-center whitespace-nowrap bg-white group-hover:bg-gray-50"
                          style={{ minWidth: "120px" }}
                        >
                          <div className="flex justify-center space-x-2">
                            {actions.map((action, index) => (
                              <button
                                key={`${action.label}-${index}`}
                                className="text-blue-600 hover:text-blue-900"
                                onClick={() => action.onClick(row)}
                                title={action.label}
                              >
                                {action.label === "View" && (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                      fill="none"
                                    />
                                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                  </svg>
                                )}
                              </button>
                            ))}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={
                        columns.length +
                        (isCheckbox ? 1 : 0) +
                        (isActions ? 1 : 0)
                      }
                      className="px-6 py-3 text-sm text-center text-gray-500"
                    >
                      {isLoading ? "Loading..." : "No data found"}
                    </td>
                  </tr>
                )}
              </tbody>

              {/* Table Footer */}
              {isFooter && lineitemTotal && (
                <tfoot className="bg-gray-50">
                  <tr>
                    {columns.map((_, i) => (
                      <td
                        key={`f${i}`}
                        className={`px-6 py-3 text-sm font-semibold ${
                          i === columns.length - 3 ? "text-right" : ""
                        }`}
                      >
                        {i === columns.length - 3 ? `$${lineitemTotal}.00` : ""}
                      </td>
                    ))}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
          {isPagination && (
            <CubeTablePagination
              total={totalForPagination}
              pageSize={pageLimit}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}

          {isLoading && (
            <LoadingOverlay
              visible={true}
              overlayColor="rgba(255, 255, 255, 0.7)"
            />
          )}
        </>
      )}
      {/* </div> */}
    </div>
  );
};

export default CubeTable;
