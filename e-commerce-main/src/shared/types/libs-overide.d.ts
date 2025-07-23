// declare module '@tanstack/react-table' {
//   export interface ColumnFilter<TKey extends string = string, TValue = any> {
//     id: TKey
//     value: TValue
//   }

//   export type ColumnFiltersState<TKey extends string = string, TValue = any> = Array<ColumnFilter<TKey, TValue>>
// }

declare interface TableColumn<T extends string = string, K = any> {
  align?: 'left' | 'right' | 'center';
  label: string;
  select: T | ((context: K) => React.ReactNode);
  className?: string;
  Component?: React.FunctionComponent<any>;
  componentProps?: Record<string, unknown>;
}
