import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Boxes, Network, Image, ArrowRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GridBackground from "../components/GridBackground";
import { TUTORIALS } from "../data/tutorial_data.js";
// Hardcoded for now — move to a tutorials.json / backend call once

export default function BeginnerPage() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <div className="relative min-h-screen w-full bg-[#0B0B0A] flex flex-col">
      <GridBackground />
      <div className="relative z-10 flex flex-col flex-1">
        <Header />

        <main className="flex-1 px-6 py-12 flex flex-col items-center">
          <div className="max-w-xl text-center mb-12">
            <h1 className="text-white text-3xl md:text-4xl font-medium tracking-tight mb-3">
              Pick a tutorial to start with
            </h1>
            <p className="text-white/50 text-base">
              Each one builds on the last, but you can jump into whichever
              sounds most useful right now.
            </p>
          </div>

          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5">
            {TUTORIALS.map((t) => {
              const Icon = t.icon;
              const isHovered = hovered === t.id;

              return (
                <div
                  key={t.id}
                  onClick={() => navigate(`/tutorial/${t.id}`)}
                  onMouseEnter={() => setHovered(t.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="group relative cursor-pointer rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between min-h-[300px] overflow-hidden"
                  style={{
                    backgroundColor: isHovered ? `${t.accent}1F` : `${t.accent}0D`,
                    borderColor: isHovered ? `${t.accent}99` : `${t.accent}40`,
                    boxShadow: isHovered
                      ? `0 0 0 1px ${t.accent}30, 0 20px 45px -20px ${t.accent}66`
                      : "none",
                  }}
                >
                  {/* Ambient glow anchored to the top edge — always present,
                      intensifies on hover so the card has an identity at rest. */}
                  <div
                    className="pointer-events-none absolute -top-24 -right-16 w-56 h-56 rounded-full blur-3xl transition-opacity duration-300"
                    style={{
                      background: t.accent,
                      opacity: isHovered ? 0.28 : 0.14,
                    }}
                  />

                  {/* Top accent bar — always visible, distinguishes cards at a glance */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)`,
                      opacity: isHovered ? 1 : 0.6,
                    }}
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300"
                        style={{
                          backgroundColor: `${t.accent}2E`,
                          boxShadow: isHovered ? `0 0 0 1px ${t.accent}55` : "none",
                        }}
                      >
                        <Icon size={20} strokeWidth={1.75} color={t.accent} />
                      </div>

                      <span
                        className="text-xs font-medium"
                        style={{ color: `${t.accent}CC` }}
                      >
                        {t.steps} steps
                      </span>
                    </div>

                    <p
                      className="text-xs font-medium mb-1 uppercase tracking-wide"
                      style={{ color: `${t.accent}CC` }}
                    >
                      {t.subtitle}
                    </p>

                    <h2
                      className="text-lg font-medium mb-3 transition-colors duration-300"
                      style={{ color: isHovered ? t.accent : "rgba(255,255,255,0.92)" }}
                    >
                      {t.title}
                    </h2>

                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {t.desc}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/tutorial/${t.id}`);
                    }}
                    className="relative cursor-pointer flex items-center justify-center gap-2 mt-8 text-sm font-medium py-2.5 rounded-lg transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? `${t.accent}3D` : `${t.accent}1A`,
                      color: isHovered ? "#ffffff" : t.accent,
                    }}
                  >
                    Enroll
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}