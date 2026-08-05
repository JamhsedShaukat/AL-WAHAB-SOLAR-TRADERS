"use client";

import { Download, FileSpreadsheet, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@wahab/ui";

interface ExportMenuProps {
  onExportCsv?: () => void;
  onExportPdf?: () => void;
}

export function ExportMenu({ onExportCsv, onExportPdf }: ExportMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="focus-ring flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[13px] text-slate-400 transition-colors hover:bg-white/8 hover:text-white"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Export
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          onClick={onExportCsv}
          className="flex items-center gap-2 text-[13px]"
        >
          <FileSpreadsheet
            className="h-4 w-4 text-emerald-400"
            aria-hidden="true"
          />
          Export CSV
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onExportPdf}
          className="flex items-center gap-2 text-[13px]"
        >
          <FileText className="h-4 w-4 text-red-400" aria-hidden="true" />
          Export PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
