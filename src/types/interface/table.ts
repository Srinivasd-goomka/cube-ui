export interface Column {
  key: string;
  label: string;
  currency?: boolean;
  formatPhone?: boolean;
  width?: number;
  align?: "left" | "right" | "center";
  isLink?: boolean;
  linkPath?: string | ((row: Record<string, unknown>) => string | number);
  linkClass?: string;
}

export interface Filter {
  key: string;
  label: string;
}

export interface Action<RowType = Record<string, unknown>> {
  label: string;
  onClick: (row: RowType) => void;
}

export interface CubeTableProps {
  columns: Column[];
  data?: Record<string, unknown>[];
  url?: string;
  searchableColumns?: string[];
  isSearch?: boolean;
  isCheckbox?: boolean;
  isActions?: boolean;
  isFooter?: boolean;
  isPagination?: boolean;
  isFilters?: boolean;
  lineitemTotal?: string | number;
  actions?: Action[];
  filters?: Filter[];
  onSelectedRowsChange?: (selectedRows: Record<string, unknown>[]) => void;
  isSingleSelect?: boolean;
  fixedHeader?: boolean;
  fixedLeftColumns?: number;
  fixedRightColumns?: number;
  searchType?: string;
  className?: string;
  isPerPage?: string | number;
}

export interface TablePaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}
