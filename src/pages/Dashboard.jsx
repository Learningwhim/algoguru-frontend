import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, Rocket, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [hovered, setHovered] = useState(null);

  const paths = [
    {
      id: "beginner",
      icon: Sprout,
      title: "I'm new to ML",
      subtitle: "New here, learning the ropes",
      desc: "Guided lessons on tensors, datasets, and training loops — no assumptions about what you already know about PyTorch.",
      cta: "Start as a beginner",
      accent: "#0F6E56",
      bg: "#E1F5EE",
      route: "/beginner",
    },
    {
      id: "experienced",
      icon: Rocket,
      title: "I've trained models before",
      subtitle: "Comfortable, ready to move fast",
      desc: "Skip the fundamentals. Jump straight into CNN architectures, dataset pipelines, and the capstone project.",
      cta: "Continue as experienced",
      accent: "#993C1D",
      bg: "#FAECE7",
      route: "/experienced",
    },
  ];

  const restCardBg = isDark ? "#161615" : "#FFFFFF";
  const restBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(22,34,58,0.12)";
  const restIconBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(22,34,58,0.06)";
  const restText = isDark ? "#ffffff" : "#16223A";
  const restSubtitle = isDark ? "rgba(255,255,255,0.45)" : "rgba(91,110,140,0.95)";
  const restDesc = isDark ? "rgba(255,255,255,0.6)" : "rgba(91,110,140,0.9)";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#CBDFEF] via-[#D2E4F1] to-[#D7E6F0] dark:from-[#0B0B0A] dark:via-[#0B0B0A] dark:to-[#0B0B0A] flex flex-col">
      <Header step={1} totalSteps={3} />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-xl text-center mb-12">
          <h1 className="text-[#16223A] dark:text-white text-3xl md:text-4xl font-medium tracking-tight mb-3">
            How would you like to start learning?
          </h1>

          <p className="text-[#5B6E8C] dark:text-white/50 text-base">
            We'll shape your first few lessons around this — you can always
            change it later.
          </p>
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-5">
          {paths.map((p) => {
            const Icon = p.icon;
            const isHovered = hovered === p.id;

            return (
              <button
                key={p.id}
                onClick={() => navigate(p.route)}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                className="text-left rounded-2xl p-8 border transition-all duration-200 flex flex-col justify-between min-h-[280px] cursor-pointer"
                style={{
                  backgroundColor: isHovered ? p.bg : restCardBg,
                  borderColor: isHovered ? p.accent : restBorder,
                }}
              >
                <div>
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-6 transition-colors duration-200"
                    style={{
                      backgroundColor: isHovered ? "#ffffff" : restIconBg,
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      color={isHovered ? p.accent : restText}
                    />
                  </div>

                  <h2
                    className="text-xl font-medium mb-1 transition-colors duration-200"
                    style={{
                      color: isHovered ? p.accent : restText,
                    }}
                  >
                    {p.title}
                  </h2>

                  <p
                    className="text-sm mb-4 transition-colors duration-200"
                    style={{
                      color: isHovered ? p.accent : restSubtitle,
                      opacity: isHovered ? 0.75 : 1,
                    }}
                  >
                    {p.subtitle}
                  </p>

                  <p
                    className="text-sm leading-relaxed transition-colors duration-200"
                    style={{
                      color: isHovered ? p.accent : restDesc,
                      opacity: isHovered ? 0.85 : 1,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>

                <div
                  className="flex items-center gap-2 mt-8 text-sm font-medium transition-colors duration-200"
                  style={{
                    color: isHovered ? p.accent : restText,
                  }}
                >
                  {p.cta}

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200"
                    style={{
                      transform: isHovered
                        ? "translateX(4px)"
                        : "translateX(0)",
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <p className="text-[#5B6E8C]/80 dark:text-white/30 text-xs mt-10">
          Not sure? You can switch anytime from your settings.
        </p>
      </main>
    </div>
  );
}