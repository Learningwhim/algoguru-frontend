import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Eye,
  RotateCcw,
  FileText,
  Code2,
  Loader2,
  CheckCircle2,
  XCircle,
  Trophy,
} from "lucide-react";
import Header from "../components/Header";
import TutorialSidebar from "../components/Tutorialsidebar";
import ResizableSplit from "../components/ResizableSplit";
import CodeEditor from "../components/CodeEditor";
import StepContent from "../components/StepContent";
import { TUTORIALS } from "../data/tutorial_data.js";
import { STEP_DATA } from "../data/step_data.js";
import { getStarterCode, getSolutionCode, executeCode } from "../lib/api";
// Hardcoded step content per tutorial — same idea as TUTORIALS in
// BeginnerPage, move to a real data source later.

// Only this tutorial has real backend content right now (the FastAPI
// "image_classification" project). Everything else keeps using the
// hardcoded STEP_DATA above until a backend project exists for it.
const BACKEND_LINKED_TUTORIALS = ["image-classification"];

export default function TutorialPage() {
  const { tutorialId } = useParams();
  const navigate = useNavigate();
  const tutorial = TUTORIALS.find((t) => t.id === tutorialId);
  const steps = STEP_DATA[tutorialId] ?? [];
  const isBackendLinked = BACKEND_LINKED_TUTORIALS.includes(tutorialId);

  const [activeId, setActiveId] = useState(steps[0]?.id);
  const [leftTab, setLeftTab] = useState("description"); // "description" | "solution"
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedIds, setCompletedIds] = useState(() => {
    const saved = localStorage.getItem(`completed:${tutorialId}`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const activeStep = useMemo(
    () => steps.find((s) => s.id === activeId),
    [steps, activeId]
  );

  const [code, setCode] = useState(activeStep?.starterCode ?? "");
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeError, setCodeError] = useState(null);

  const [solutionCode, setSolutionCode] = useState("");
  const [solutionLoading, setSolutionLoading] = useState(false);
  const [solutionError, setSolutionError] = useState(null);

  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState(null); // { success, message, errors }

  // Fetch starter code from the backend whenever the active step changes
  // (backend-linked tutorials only — others just use the hardcoded value).
  useEffect(() => {
    if (!activeStep) return;

    if (!isBackendLinked) {
      setCode(activeStep.starterCode ?? "");
      return;
    }

    let cancelled = false;
    setCodeLoading(true);
    setCodeError(null);

    getStarterCode(tutorialId, activeStep.id)
      .then((starter) => {
        if (!cancelled) setCode(starter);
      })
      .catch((err) => {
        if (!cancelled) {
          setCodeError(err.message);
          setCode(activeStep.starterCode ?? ""); // fall back to hardcoded copy
        }
      })
      .finally(() => {
        if (!cancelled) setCodeLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [activeId, isBackendLinked, tutorialId, activeStep]);

  // Lazily fetch the solution once the person actually reveals it.
  useEffect(() => {
    if (!activeStep || !solutionRevealed) return;

    if (!isBackendLinked) {
      setSolutionCode(activeStep.solutionCode ?? "");
      return;
    }

    let cancelled = false;
    setSolutionLoading(true);
    setSolutionError(null);

    getSolutionCode(tutorialId, activeStep.id)
      .then((solution) => {
        if (!cancelled) setSolutionCode(solution);
      })
      .catch((err) => {
        if (!cancelled) {
          setSolutionError(err.message);
          setSolutionCode(activeStep.solutionCode ?? "");
        }
      })
      .finally(() => {
        if (!cancelled) setSolutionLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [solutionRevealed, activeId, isBackendLinked, tutorialId, activeStep]);

  const selectStep = (id) => {
    setActiveId(id);
    setOutput("");
    setLeftTab("description");
    setSolutionRevealed(false);
    setSolutionCode("");
    setRunResult(null);
  };

  const markComplete = () => {
    setCompletedIds((prev) => {
      if (prev.has(activeId)) return prev; // already counted, no re-trigger
      const next = new Set(prev).add(activeId);
      localStorage.setItem(`completed:${tutorialId}`, JSON.stringify([...next]));

      if (next.size === steps.length && prev.size < steps.length) {
        // Fresh completion of the whole tutorial — celebrate it.
        setShowCompletionModal(true);
      }
      return next;
    });
  };

  const handleRun = async () => {
    if (!isBackendLinked) {
      // No backend project for this tutorial yet.
      setOutput("Running...\n(connect this to your code execution service)");
      markComplete();
      return;
    }

    setRunning(true);
    setRunResult(null);
    setOutput("Running...");

    try {
      const result = await executeCode(tutorialId, activeStep.id, code);
      setOutput([result.stdout, result.stderr].filter(Boolean).join("\n") || "(no output)");
      setRunResult({
        success: result.success,
        message: result.message,
        errors: result.errors,
      });
      if (result.success) markComplete();
    } catch (err) {
      setOutput(`Could not reach the execution backend:\n${err.message}`);
    } finally {
      setRunning(false);
    }
  };

  const handleReset = () => {
    if (isBackendLinked) {
      // Re-trigger the starter-code fetch effect.
      setCode("");
      getStarterCode(tutorialId, activeStep.id)
        .then(setCode)
        .catch(() => setCode(activeStep?.starterCode ?? ""));
    } else {
      setCode(activeStep?.starterCode ?? "");
    }
    setOutput("");
    setRunResult(null);
  };

  if (!tutorial || !activeStep) {
    return (
      <div className="min-h-screen bg-[#D8E7F2] dark:bg-[#0B0B0A] flex items-center justify-center text-[#5B6E8C] dark:text-white/50">
        Tutorial not found.
      </div>
    );
  }

  const solutionToShow = isBackendLinked ? solutionCode : activeStep.solutionCode ?? "";

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#CBDFEF] via-[#D2E4F1] to-[#D7E6F0] dark:from-[#0B0B0A] dark:via-[#0B0B0A] dark:to-[#0B0B0A] flex flex-col">
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
              <div className="h-full p-3">
                <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-[#16223A]/10 dark:border-white/10 shadow-sm bg-white dark:bg-[#131311]">
                {/* LeetCode-style tab bar */}
                <div className="shrink-0 flex items-center gap-1 px-3 pt-2 border-b border-[#16223A]/10 dark:border-white/10 bg-[#F3F8FC] dark:bg-[#0E0E0D]">
                  {[
                    { key: "description", label: "Description", icon: FileText },
                    { key: "solution", label: "Solution", icon: Code2 },
                  ].map(({ key, label, icon: Icon }) => {
                    const isActive = leftTab === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setLeftTab(key)}
                        className={`cursor-pointer flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-t-md transition-colors border-b-2 -mb-px ${
                          isActive
                            ? "text-[#16223A] dark:text-white"
                            : "text-[#5B6E8C]/70 dark:text-white/50 border-transparent hover:text-[#16223A] dark:hover:text-white/80"
                        }`}
                        style={
                          isActive
                            ? { borderColor: tutorial.accent }
                            : undefined
                        }
                      >
                        <Icon size={14} />
                        {label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab content — both panels stay mounted; only visibility toggles.
                    This avoids remounting the Monaco solution editor on every
                    tab switch, which was causing it to render blank. */}
                <div className="flex-1 min-h-0 overflow-auto relative">
                  <div
                    className={
                      leftTab === "description" ? "h-full p-6" : "hidden"
                    }
                  >
                    <p
                      className="text-xs font-medium uppercase tracking-wide mb-2"
                      style={{ color: tutorial.accent }}
                    >
                      {activeStep.title}
                    </p>
                    <h1 className="text-[#16223A] dark:text-white text-xl font-medium mb-4">
                      {tutorial.title}
                    </h1>
                    <StepContent
                      content={activeStep.description}
                      accent={tutorial.accent}
                    />
                  </div>

                  <div
                    className={
                      leftTab === "solution"
                        ? "h-full flex flex-col"
                        : "hidden"
                    }
                  >
                    <div className="shrink-0 px-6 pt-4 pb-2">
                      <p className="text-[#5B6E8C]/70 dark:text-white/40 text-xs">
                        Reference solution for this step. Switch back to{" "}
                        <span className="font-medium">Description</span> to
                        keep working on your own.
                      </p>
                      {solutionError && (
                        <p className="text-red-500 text-xs mt-1">
                          Couldn't load from backend, showing local copy instead.
                        </p>
                      )}
                    </div>
                    <div className="relative flex-1 min-h-0">
                      <div
                        className={
                          solutionRevealed
                            ? "h-full w-full"
                            : "h-full w-full filter blur-sm pointer-events-none select-none"
                        }
                      >
                        {solutionRevealed && solutionLoading ? (
                          <div className="h-full flex items-center justify-center text-[#5B6E8C]/60 dark:text-white/40 text-sm gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            Loading solution...
                          </div>
                        ) : (
                          <CodeEditor value={solutionToShow} readOnly />
                        )}
                      </div>

                      {!solutionRevealed && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#F3F8FC]/40 dark:bg-[#0E0E0D]/40">
                          <button
                            onClick={() => setSolutionRevealed(true)}
                            className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white shadow-lg transition-transform hover:scale-105"
                            style={{ backgroundColor: tutorial.accent }}
                          >
                            <Eye size={16} />
                            See Solution
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </div>
              </div>
            }
            right={
              <ResizableSplit
                storageKey="tutorial-editor-console-split"
                direction="vertical"
                defaultSize={70}
                min={40}
                max={85}
                left={
                  <div className="h-full p-3 pr-1.5">
                    <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-[#16223A]/10 dark:border-white/10 shadow-sm bg-white dark:bg-[#131311]">
                    <div className="shrink-0 flex items-center gap-2 px-3 py-2 border-b border-[#16223A]/10 dark:border-white/10 bg-[#F3F8FC] dark:bg-[#0E0E0D]">
                      <button
                        onClick={handleRun}
                        disabled={running || codeLoading}
                        className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        style={{ backgroundColor: tutorial.accent }}
                      >
                        {running ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Play size={14} />
                        )}
                        {running ? "Running..." : "Run code"}
                      </button>

                      <button
                        onClick={handleReset}
                        disabled={running}
                        className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-[#5B6E8C] dark:text-white/70 bg-[#16223A]/[0.06] dark:bg-white/[0.06] hover:bg-[#16223A]/[0.1] dark:hover:bg-white/[0.1] transition-colors disabled:opacity-60"
                      >
                        <RotateCcw size={14} />
                        Reset editor
                      </button>

                      {codeError && (
                        <span className="text-red-500 text-xs ml-1">
                          Backend unreachable — showing local starter code.
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-h-0 relative">
                      {codeLoading ? (
                        <div className="h-full flex items-center justify-center text-[#5B6E8C]/60 dark:text-white/40 text-sm gap-2">
                          <Loader2 size={16} className="animate-spin" />
                          Loading starter code...
                        </div>
                      ) : (
                        <CodeEditor value={code} onChange={setCode} />
                      )}
                    </div>
                    </div>
                  </div>
                }
                right={
                  <div className="h-full p-3 pl-1.5">
                    <div className="h-full flex flex-col rounded-2xl overflow-hidden border border-[#16223A]/10 dark:border-white/10 shadow-sm bg-[#F3F8FC] dark:bg-[#0E0E0D]">
                    <div className="shrink-0 px-4 pt-4">
                      <p className="text-[#5B6E8C]/70 dark:text-white/30 text-xs uppercase tracking-wide mb-2">
                        Console
                      </p>
                    </div>

                    {runResult && (
                      <div
                        className={`shrink-0 mx-4 mb-3 rounded-lg px-3 py-2 text-xs flex items-start gap-2 ${
                          runResult.success
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {runResult.success ? (
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
                        ) : (
                          <XCircle size={14} className="mt-0.5 shrink-0" />
                        )}
                        <div>
                          <p className="font-medium">{runResult.message}</p>
                          {runResult.errors?.length > 0 && (
                            <ul className="mt-1 list-disc list-inside space-y-0.5 opacity-90">
                              {runResult.errors.map((e, i) => (
                                <li key={i}>{e}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex-1 min-h-0 overflow-auto px-4 pb-4">
                      <pre className="text-[#5B6E8C] dark:text-white/70 text-sm whitespace-pre-wrap font-mono">
                        {output || "Run your code to see output here."}
                      </pre>
                    </div>
                    </div>
                  </div>
                }
              />
            }
          />
        </div>
      </div>

      {showCompletionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0B0A]/60 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-sm rounded-2xl border border-[#16223A]/10 dark:border-white/10 shadow-2xl bg-white dark:bg-[#131311] p-8 text-center overflow-hidden">
            <div
              className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full blur-3xl"
              style={{ background: tutorial.accent, opacity: 0.25 }}
            />

            <div
              className="relative mx-auto mb-5 w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${tutorial.accent}22` }}
            >
              <Trophy size={30} strokeWidth={1.75} color={tutorial.accent} />
            </div>

            <h2 className="relative text-[#16223A] dark:text-white text-xl font-medium mb-2">
              Tutorial completed!
            </h2>
            <p className="relative text-[#5B6E8C] dark:text-white/60 text-sm leading-relaxed mb-6">
              You've finished all {steps.length} steps of{" "}
              <span className="font-medium" style={{ color: tutorial.accent }}>
                {tutorial.title}
              </span>
              . Nicely done.
            </p>

            <div className="relative flex flex-col gap-2">
              <button
                onClick={() => navigate("/")}
                className="cursor-pointer w-full py-2.5 rounded-lg text-sm font-medium text-white transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: tutorial.accent }}
              >
                Back to tutorials
              </button>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="cursor-pointer w-full py-2.5 rounded-lg text-sm font-medium text-[#5B6E8C] dark:text-white/70 bg-[#16223A]/[0.06] dark:bg-white/[0.06] hover:bg-[#16223A]/[0.1] dark:hover:bg-white/[0.1] transition-colors"
              >
                Stay here
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}