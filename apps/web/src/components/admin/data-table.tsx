"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@wahab/utils";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  /** Rows per page options (default [25, 50, 100]) */
  pageSizeOptions?: number[];
}

export function DataTable<TData>({
  columns,
  data,
  pageSizeOptions = [25, 50, 100],
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: { sorting },
    initialState: { pagination: { pageSize } },
  });

  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const rowCount = data.length;
  const from = pageIndex * pageSize + 1;
  const to = Math.min(from + pageSize - 1, rowCount);

  return (
    <div className="flex flex-col gap-3">
      {/* Table */}
      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id} className="border-b border-white/8">
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className={cn(
                        "whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500",
                        header.column.getCanSort() && "cursor-pointer select-none hover:text-slate-300",
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <span className="inline-flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <>
                            {header.column.getIsSorted() === "asc" && <ChevronUp className="h-3 w-3" />}
                            {header.column.getIsSorted() === "desc" && <ChevronDown className="h-3 w-3" />}
                            {!header.column.getIsSorted() && <ChevronsUpDown className="h-3 w-3 opacity-40" />}
                          </>
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-slate-500"
                  >
                    No records found
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/3"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3 text-slate-300">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-[12px] text-slate-500">
        <span>
          Showing {from}–{to} of {rowCount}
        </span>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            Rows
            <select
              value={pageSize}
              onChange={(e) => {
                const s = Number(e.target.value);
                setPageSize(s);
                table.setPageSize(s);
              }}
              className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-slate-300 focus:outline-none"
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s} className="bg-navy-950">
                  {s}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="focus-ring rounded-lg p-1 transition-colors hover:bg-white/8 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 text-slate-400">
              {pageIndex + 1} / {pageCount || 1}
            </span>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="focus-ring rounded-lg p-1 transition-colors hover:bg-white/8 disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
