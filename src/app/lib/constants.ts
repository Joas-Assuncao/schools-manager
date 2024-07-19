import { DataSource } from './components/table/interfaces';
import { AppTheme } from './services/theme';

export const DEFAULT_BASE_THEME: AppTheme = 'system' as const;

export interface Pagination {
  page: number;
  perPage: number;
}

export interface Metadata {
  total: number;
  prev: null | number;
  next: null | number;
}

export interface ApiResponse {
  data: DataSource[];
  prev: null | number;
  next: number | null;
  items: number;
}
