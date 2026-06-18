import React from 'react';

export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  headerClassName?: string;
  cellClassName?: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  emptyMessage: string;
  isLoading?: boolean;
  actionsColumn?: {
    header?: React.ReactNode;
    render: (row: T) => React.ReactNode;
  };
}

export function DataTable<T>({
  columns,
  data,
  rowKey,
  emptyMessage,
  isLoading = false,
  actionsColumn,
}: DataTableProps<T>) {
  const colSpan = columns.length + (actionsColumn ? 1 : 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`py-4 px-4 font-bold text-slate-400 text-sm ${column.headerClassName ?? ''}`}
              >
                {column.header}
              </th>
            ))}
            {actionsColumn && (
              <th className="py-4 px-4 font-bold text-slate-400 text-sm text-right">
                {actionsColumn.header ?? ''}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && !isLoading ? (
            <tr>
              <td
                colSpan={colSpan}
                className="py-8 text-center text-slate-500 font-medium"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={rowKey(row)}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`py-4 px-4 ${column.cellClassName ?? ''}`}
                  >
                    {column.render(row)}
                  </td>
                ))}
                {actionsColumn && (
                  <td className="py-4 px-4 text-right">
                    {actionsColumn.render(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
