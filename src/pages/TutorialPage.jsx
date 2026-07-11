import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Play, Eye, RotateCcw } from "lucide-react";
import Header from "../components/Header";
import TutorialSidebar from "../components/Tutorialsidebar";
import ResizableSplit from "../components/ResizableSplit";
import CodeEditor from "../components/CodeEditor";
import { TUTORIALS } from "../data/tutorial_data.js";
import { STEP_DATA } from "../data/step_data.js";
// Hardcoded step content per tutorial — same idea as TUTORIALS in
// BeginnerPage, move to a real data source later.


export default function TutorialPage() {
  const { tutorialId } = useParams();
  const tutorial = TUTORIALS.find((t) => t.id === tutorialId);
  const steps = STEP_DATA[tutorialId] ?? [];

  const [activeId, setActiveId] = useState(steps[0]?.id);
  const [completedIds, setCompletedIds] = useState(() => {
    const saved = localStorage.getItem(`completed:${tutorialId}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const activeStep = useMemo(
    () => steps.find((s) => s.id === activeId),
    [steps, activeId]
  );

  const [code, setCode] = useState(activeStep?.starterCode ?? "");
  const [output, setOutput] = useState("");

  const selectStep = (id) => {
    setActiveId(id);
    const step = steps.find((s) => s.id === id);
    setCode(step?.starterCode ?? "");
    setOutput("");
  };

  const markComplete = () => {
    setCompletedIds((prev) => {
      const next = new Set(prev).add(activeId);
      localStorage.setItem(`completed:${tutorialId}`, JSON.stringify([...next]));
      return next;
    });
  };

  const handleRun = () => {
    // TODO: wire up to your actual execution backend/sandbox.
    setOutput("Running...\n(connect this to your code execution service)");
    markComplete();
  };

  const handleShowSolution = () => {
    setCode(activeStep?.solutionCode ?? "");
  };

  const handleReset = () => {
    setCode(activeStep?.starterCode ?? "");
    setOutput("");
  };

  if (!tutorial || !activeStep) {
    return (
      <div className="min-h-screen bg-[#0B0B0A] flex items-center justify-center text-white/50">
        Tutorial not found.
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#0B0B0A] flex flex-col">
      <Header
        step={steps.findIndex((s) => s.id === activeId) + 1}
        totalSteps={steps.length}
      />

      <div className="flex-1 flex min-h-0">
        <TutorialSidebar
          tutorial={tutorial}
          steps={steps}
          completedIds={completedIds}
          activeId={activeId}
          onSelectStep={selectStep}
        />

        <div className="flex-1 min-h-0">
          <ResizableSplit
            storageKey="tutorial-desc-editor-split"
            direction="horizontal"
            defaultSize={40}
            left={
              <div className="p-6">
                <p
                  className="text-xs font-medium uppercase tracking-wide mb-2"
                  style={{ color: tutorial.accent }}
                >
                  {activeStep.title}
                </p>
                <h1 className="text-white text-xl font-medium mb-4">
                  {tutorial.title}
                </h1>
                <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
                  {activeStep.description}
                </p>
              </div>
            }
            right={
              <ResizableSplit
                storageKey="tutorial-editor-console-split"
                direction="vertical"
                defaultSize={70}
                min={40}
                max={85}
                left={<CodeEditor value={code} onChange={setCode} />}
                right={
                  <div className="h-full bg-[#0E0E0D] p-4 overflow-auto">
                    <p className="text-white/30 text-xs uppercase tracking-wide mb-2">
                      Console
                    </p>
                    <pre className="text-white/70 text-sm whitespace-pre-wrap font-mono">
                      {output || "Run your code to see output here."}
                    </pre>
                  </div>
                }
              />
            }
          />
        </div>
      </div>

      <div className="shrink-0 border-t border-white/10 px-6 py-3 flex items-center gap-3 bg-[#0B0B0A]">
        <button
          onClick={handleRun}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
          style={{ backgroundColor: tutorial.accent }}
        >
          <Play size={15} />
          Run code
        </button>

        <button
          onClick={handleShowSolution}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/70 bg-white/[0.06] hover:bg-white/[0.1] transition-colors"
        >
          <Eye size={15} />
          Show solution
        </button>

        <button
          onClick={handleReset}
          className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white/70 bg-white/[0.06] hover:bg-white/[0.1] transition-colors"
        >
          <RotateCcw size={15} />
          Reset editor
        </button>
      </div>
    </div>
  );
}