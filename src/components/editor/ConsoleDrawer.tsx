"use client";

import React, { useState } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { X, Trash2, Terminal, AlertTriangle, AlertCircle, Info } from "lucide-react";

export const ConsoleDrawer: React.FC = () => {
  const { consoleLogs, isConsoleOpen, setConsoleOpen, clearConsoleLogs } =
    useEditorStore();
  const [filter, setFilter] = useState<"all" | "error" | "warn" | "log">("all");

  if (!isConsoleOpen) return null;

  const filteredLogs = consoleLogs.filter((l) => {
    if (filter === "all") return true;
    return l.type === filter;
  });

  return (
    <div className="h-48 bg-void border-t border-line flex flex-col font-mono text-xs z-10 shrink-0">
      {/* Console Drawer Header */}
      <div className="h-8 bg-surface border-b border-line px-3 flex items-center justify-between select-none">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-ink text-[11px] uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-quark-blue" />
            <span>Console</span>
          </div>

          {/* Filter Toggles */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setFilter("all")}
              className={`px-2 py-0.5 text-[10px] uppercase transition-none ${
                filter === "all"
                  ? "bg-surface-2 text-ink border border-line"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              All ({consoleLogs.length})
            </button>
            <button
              onClick={() => setFilter("error")}
              className={`px-2 py-0.5 text-[10px] uppercase transition-none ${
                filter === "error"
                  ? "bg-surface-2 text-quark-red border border-quark-red"
                  : "text-ink-dim hover:text-quark-red"
              }`}
            >
              Errors
            </button>
            <button
              onClick={() => setFilter("warn")}
              className={`px-2 py-0.5 text-[10px] uppercase transition-none ${
                filter === "warn"
                  ? "bg-surface-2 text-amber-400 border border-amber-400"
                  : "text-ink-dim hover:text-amber-400"
              }`}
            >
              Warnings
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={clearConsoleLogs}
            className="text-ink-dim hover:text-ink transition-none p-1"
            title="Clear console"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setConsoleOpen(false)}
            className="text-ink-dim hover:text-ink transition-none p-1"
            title="Close console"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Log Messages List */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1 bg-void">
        {filteredLogs.length === 0 ? (
          <div className="text-ink-faint italic px-2 py-1">
            No console output...
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className={`px-2 py-1 border-b border-line/40 flex items-start gap-2 ${
                log.type === "error"
                  ? "text-quark-red bg-quark-red/5"
                  : log.type === "warn"
                  ? "text-amber-400 bg-amber-400/5"
                  : "text-ink-dim"
              }`}
            >
              <span className="shrink-0 mt-0.5">
                {log.type === "error" && (
                  <AlertCircle className="w-3 h-3 text-quark-red" />
                )}
                {log.type === "warn" && (
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                )}
                {log.type === "log" && (
                  <Info className="w-3 h-3 text-quark-blue" />
                )}
              </span>
              <span className="text-[10px] text-ink-faint shrink-0">
                [{log.timestamp}]
              </span>
              <div className="flex-1 whitespace-pre-wrap break-all font-mono">
                {log.args.join(" ")}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
