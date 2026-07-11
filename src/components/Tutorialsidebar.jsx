import { CheckCircle2, Circle, Lock } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/**
 * Left sidebar for the tutorial page. `steps` is the hardcoded step list
 * for the current tutorial, `completedIds` is a Set of step ids the user
 * has finished, `activeId` is the step currently open.
 *
 * A step is locked if the step before it isn't completed yet.
 */
export default function TutorialSidebar({
  tutorial,
  steps,
  completedIds,
  activeId,
  onSelectStep,
}) {
  const { isDark } = useTheme();
  const completedCount = completedIds.size;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  const isLocked = (index) => {
    if (index === 0) return false;
    return !completedIds.has(steps[index - 1].id);
  };

  return (
    <aside className="w-72 shrink-0 h-full border-r border-[#16223A]/10 dark:border-white/10 bg-[#F5FAFE] dark:bg-[#101010] flex flex-col">
      <div className="px-5 py-5 border-b border-[#16223A]/10 dark:border-white/10">
        <p className="text-[#5B6E8C] dark:text-white/40 text-xs uppercase tracking-wide mb-1">
          {tutorial.subtitle}
        </p>
        <h2 className="text-[#16223A] dark:text-white text-base font-medium mb-4">
          {tutorial.title}
        </h2>

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

      <nav className="flex-1 overflow-auto py-2">
        {steps.map((step, index) => {
          const locked = isLocked(index);
          const done = completedIds.has(step.id);
          const active = step.id === activeId;

          return (
            <button
              key={step.id}
              disabled={locked}
              onClick={() => onSelectStep(step.id)}
              className={`w-full flex items-center gap-3 px-5 py-3 text-left text-sm transition-colors ${
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
              {done ? (
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
              )}
              <span className="truncate">
                {index + 1}. {step.title}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}