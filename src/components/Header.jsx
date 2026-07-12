import { useNavigate } from "react-router-dom";
import { User, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/**
 * Sticky top header. Reused across every page (Beginner, Project, etc).
 * Pass `step` to show a "Step X of Y" indicator like on the Dashboard,
 * or omit it for pages that don't need one.
 */
export default function Header({ step, totalSteps }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full px-8 py-4 flex items-center justify-between bg-gradient-to-b from-[#EAF3FA] via-[#EAF3FA]/70 to-transparent dark:from-[#0B0B0A] dark:via-[#0B0B0A]/70 dark:to-transparent backdrop-blur-sm">
      <span
        onClick={() => navigate("/")}
        className="text-[#16223A] dark:text-white font-medium tracking-tight text-lg cursor-pointer select-none"
      >
        algoguru
      </span>

      <div className="flex items-center gap-3">
        {step && (
          <span className="text-[#5B6E8C]/80 dark:text-white/40 text-sm hidden sm:inline mr-2">
            Step {step} of {totalSteps}
          </span>
        )}

        <button
          onClick={toggleTheme}
          className="cursor-pointer w-9 h-9 rounded-full bg-[#16223A]/[0.06] dark:bg-white/[0.06] border border-[#16223A]/10 dark:border-white/10 flex items-center justify-center hover:bg-[#16223A]/[0.1] dark:hover:bg-white/[0.1] transition-colors"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <Sun size={16} strokeWidth={1.75} color="#ffffff" />
          ) : (
            <Moon size={16} strokeWidth={1.75} color="#16223A" />
          )}
        </button>

        <button
          className="w-9 h-9 rounded-full bg-[#16223A]/[0.06] dark:bg-white/[0.06] border border-[#16223A]/10 dark:border-white/10 flex items-center justify-center hover:bg-[#16223A]/[0.1] dark:hover:bg-white/[0.1] transition-colors"
          aria-label="Account"
        >
          <User
            size={16}
            strokeWidth={1.75}
            color={isDark ? "#ffffff" : "#16223A"}
          />
        </button>
      </div>
    </header>
  );
}