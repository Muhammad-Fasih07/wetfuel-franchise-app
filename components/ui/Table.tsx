import type { ReactNode } from "react";

/* ---------- Column definition ---------- */
export interface TableColumn<T> {
  key: string;
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  /** Apply monospace stack for IDs, dates, and metrics */
  mono?: boolean;
  render: (row: T, index: number) => ReactNode;
}

/* ---------- Props ---------- */
interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T, index: number) => string | number;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
}

export function Table<T>({
  columns,
  rows,
  rowKey,
  emptyMessage = "No data available.",
  onRowClick,
}: TableProps<T>) {
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="type-table-header"
                style={{
                  width: col.width,
                  textAlign: col.align ?? "left",
                  padding: "10px 16px",
                  borderBottom: "1px solid var(--border-subtle)",
                  whiteSpace: "nowrap",
                  background: "transparent",
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="type-body"
                style={{
                  textAlign: "center",
                  padding: "32px 16px",
                  color: "var(--text-muted)",
                }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={rowKey(row, index)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                style={{
                  cursor: onRowClick ? "pointer" : "default",
                  transition: "background-color var(--transition-fast)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                    "var(--bg-surface-hover)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLTableRowElement).style.backgroundColor =
                    "transparent";
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={col.mono ? "type-table-data" : undefined}
                    style={{
                      fontFamily: col.mono ? undefined : "var(--font-display)",
                      textAlign: col.align ?? "left",
                      padding: "12px 16px",
                      fontSize: col.mono ? undefined : "14px",
                      color: "var(--text-primary)",
                      borderBottom: "1px solid var(--border-subtle)",
                      verticalAlign: "middle",
                    }}
                  >
                    {col.render(row, index)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
