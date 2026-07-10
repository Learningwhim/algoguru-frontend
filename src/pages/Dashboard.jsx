import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, Rocket, ArrowRight } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen w-full bg-[#0B0B0A] flex flex-col">
      <header className="w-full px-8 py-6 flex items-center justify-between">
        <span className="text-white font-medium tracking-tight text-lg">
          algoguru
        </span>
        <span className="text-white/40 text-sm">Step 1 of 3</span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-xl text-center mb-12">
          <h1 className="text-white text-3xl md:text-4xl font-medium tracking-tight mb-3">
            How would you like to start learning?
          </h1>

          <p className="text-white/50 text-base">
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
                  backgroundColor: isHovered ? p.bg : "#161615",
                  borderColor: isHovered
                    ? p.accent
                    : "rgba(255,255,255,0.1)",
                }}
              >
                <div>
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-6 transition-colors duration-200"
                    style={{
                      backgroundColor: isHovered
                        ? "#ffffff"
                        : "rgba(255,255,255,0.08)",
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      color={isHovered ? p.accent : "#ffffff"}
                    />
                  </div>

                  <h2
                    className="text-xl font-medium mb-1 transition-colors duration-200"
                    style={{
                      color: isHovered ? p.accent : "#ffffff",
                    }}
                  >
                    {p.title}
                  </h2>

                  <p
                    className="text-sm mb-4 transition-colors duration-200"
                    style={{
                      color: isHovered
                        ? p.accent
                        : "rgba(255,255,255,0.45)",
                      opacity: isHovered ? 0.75 : 1,
                    }}
                  >
                    {p.subtitle}
                  </p>

                  <p
                    className="text-sm leading-relaxed transition-colors duration-200"
                    style={{
                      color: isHovered
                        ? p.accent
                        : "rgba(255,255,255,0.6)",
                      opacity: isHovered ? 0.85 : 1,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>

                <div
                  className="flex items-center gap-2 mt-8 text-sm font-medium transition-colors duration-200"
                  style={{
                    color: isHovered ? p.accent : "#ffffff",
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

        <p className="text-white/30 text-xs mt-10">
          Not sure? You can switch anytime from your settings.
        </p>
      </main>
    </div>
  );
}