import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

/**
 * Sticky top header. Reused across every page (Beginner, Project, etc).
 * Pass `step` to show a "Step X of Y" indicator like on the Dashboard,
 * or omit it for pages that don't need one.
 */
export default function Header({ step, totalSteps }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full px-8 py-4 flex items-center justify-between bg-[#0B0B0A]/90 backdrop-blur-sm border-b border-white/10">
      <span
        onClick={() => navigate("/")}
        className="text-white font-medium tracking-tight text-lg cursor-pointer select-none"
      >
        algoguru
      </span>

      <div className="flex items-center gap-5">
        {step && (
          <span className="text-white/40 text-sm hidden sm:inline">
            Step {step} of {totalSteps}
          </span>
        )}

        <button
          className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-white/[0.1] transition-colors"
          aria-label="Account"
        >
          <User size={16} strokeWidth={1.75} color="#ffffff" />
        </button>
      </div>
    </header>
  );
}