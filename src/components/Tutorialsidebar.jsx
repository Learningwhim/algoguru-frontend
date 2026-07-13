import { useState } from "react";
import { CheckCircle2, Circle, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/**
 * Left sidebar for the tutorial page. `steps` is the hardcoded step list
 * for the current tutorial, `completedIds` is a Set of step ids the user
 * has finished, `activeId` is the step currently open.
 *
 * A step is locked if the step before it isn't completed yet.
 * Collapsible: shrinks to an icon rail so the editor gets more room.
 */
export default function TutorialSidebar({
  tutorial,
  steps,
  completedIds,
  activeId,
  onSelectStep,
}) {
  const { isDark } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const completedCount = completedIds.size;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  const isLocked = (index) => {
    if (index === 0) return false;
    return !completedIds.has(steps[index - 1].id);
  };

  return (
    <aside
      className={`shrink-0 h-full border-r border-[#16223A]/10 dark:border-white/10 bg-[#F5FAFE] dark:bg-[#101010] flex flex-col transition-[width] duration-300 ${
        collapsed ? "w-14" : "w-72"
      }`}
    >
      <div className="px-3 py-4 border-b border-[#16223A]/10 dark:border-white/10 flex items-center justify-between shrink-0">
        {!collapsed && (
          <div className="min-w-0 pr-2">
            <p className="text-[#5B6E8C] dark:text-white/40 text-[11px] uppercase tracking-wide mb-0.5 truncate">
              {tutorial.subtitle}
            </p>
            <p className="text-[#16223A] dark:text-white text-sm font-medium truncate">
              {tutorial.title}
            </p>
          </div>
        )}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="cursor-pointer shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[#5B6E8C] dark:text-white/50 hover:bg-[#16223A]/[0.06] dark:hover:bg-white/[0.06] transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {!collapsed && (
        <div className="px-5 pt-4 pb-4 border-b border-[#16223A]/10 dark:border-white/10">
          <div className="flex items-center justify-between text-xs text-[#5B6E8C] dark:text-white/40 mb-1.5">
            <span>
              {completedCount} / {steps.length} complete
            </span>
            <span>{progressPct}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#16223A]/10 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%`, backgroundColor: tutorial.accent }}
            />
          </div>
        </div>
      )}

      {collapsed && (
        <div className="px-2 pt-1 pb-3 border-b border-[#16223A]/10 dark:border-white/10 flex flex-col items-center gap-1">
          <div className="relative w-8 h-8">
            <svg viewBox="0 0 36 36" className="w-8 h-8 -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(22,34,58,0.1)"}
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke={tutorial.accent}
                strokeWidth="3"
                strokeDasharray={2 * Math.PI * 15.5}
                strokeDashoffset={2 * Math.PI * 15.5 * (1 - progressPct / 100)}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-medium text-[#16223A] dark:text-white">
              {progressPct}
            </span>
          </div>
        </div>
      )}

      <nav className="flex-1 overflow-auto py-2">
        {steps.map((step, index) => {
          const locked = isLocked(index);
          const done = completedIds.has(step.id);
          const active = step.id === activeId;

          const icon = done ? (
            <CheckCircle2 size={16} color={tutorial.accent} />
          ) : locked ? (
            <Lock
              size={14}
              color={isDark ? "rgba(255,255,255,0.3)" : "rgba(91,110,140,0.5)"}
            />
          ) : (
            <Circle
              size={16}
              color={isDark ? "rgba(255,255,255,0.4)" : "rgba(91,110,140,0.6)"}
            />
          );

          return (
            <button
              key={step.id}
              disabled={locked}
              onClick={() => onSelectStep(step.id)}
              title={collapsed ? `${index + 1}. ${step.title}` : undefined}
              className={`w-full flex items-center text-left text-sm transition-colors ${
                collapsed ? "justify-center px-0 py-3" : "gap-3 px-5 py-3"
              } ${
                locked
                  ? "cursor-not-allowed opacity-40"
                  : "cursor-pointer hover:bg-[#16223A]/[0.04] dark:hover:bg-white/[0.04]"
              }`}
              style={{
                backgroundColor: active
                  ? isDark
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(22,34,58,0.06)"
                  : "transparent",
                color: active
                  ? isDark
                    ? "#ffffff"
                    : "#16223A"
                  : isDark
                  ? "rgba(255,255,255,0.65)"
                  : "rgba(91,110,140,0.95)",
              }}
            >
              {icon}
              {!collapsed && (
                <span className="truncate">
                  {index + 1}. {step.title}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}