import { Type } from '@angular/core';
import { BaseCellRenderer } from '../base/base-cell-renderer';

export type TColumnConfig<T = any> = {
  field?: keyof T;
  title: string;
  cellRenderer?: Type<BaseCellRenderer<T>>;
  cellRendererParams?: any;
  width?: string;
  sortable?: boolean;
  /** Custom comparator for client-side sorting. Receives two row objects, returns negative/zero/positive. */
  comparator?: (a: T, b: T) => number;
  sticky?: boolean;
  stickyEnd?: boolean;
  /** Horizontal alignment of the header title; 'end' aligns it with right-justified cell values. Default: 'start'. */
  headerAlign?: 'start' | 'end';
};
