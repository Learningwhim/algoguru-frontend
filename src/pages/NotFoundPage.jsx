import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GridBackground from "../components/GridBackground";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-[#0B0B0A] flex flex-col">
      <GridBackground />
      <div className="relative z-10 flex flex-col flex-1">
        <Header />

        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-14 h-14 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center mb-6">
            <Compass size={24} strokeWidth={1.75} color="#ffffff" />
          </div>

          <h1 className="text-white text-3xl md:text-4xl font-medium tracking-tight mb-3">
            Lost in the wrong tensor shape
          </h1>

          <p className="text-white/50 text-base max-w-md mb-8">
            This page doesn't exist. Maybe it moved, maybe it never did —
            either way, let's get you back on track.
          </p>

          <button
            onClick={() => navigate("/")}
            className="cursor-pointer px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-white/[0.08] border border-white/10 hover:bg-white/[0.14] transition-colors"
          >
            Back to home
          </button>
        </main>

        <Footer />
      </div>
    </div>
  );
}