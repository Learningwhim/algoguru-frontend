import { Editor } from "@monaco-editor/react";
import { useTheme } from "../context/ThemeContext";

/**
 * Monaco-based code editor, themed to match the app's current light/dark UI.
 * Drop-in for the TutorialPage editor pane — just needs `value` / `onChange`.
 *
 * Install first:  npm install @monaco-editor/react
 */
export default function CodeEditor({ value, onChange, language = "python" }) {
  const { isDark } = useTheme();

  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={(val) => onChange(val ?? "")}
      theme={isDark ? "vs-dark" : "light"}
      options={{
        fontSize: 14,
        fontFamily:
          "'JetBrains Mono', 'Fira Code', ui-monospace, Menlo, monospace",
        minimap: { enabled: false },
        lineNumbersMinChars: 3,
        padding: { top: 16 },
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
        automaticLayout: true,
        renderLineHighlight: "line",
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
      }}
      loading={
        <div className="w-full h-full flex items-center justify-center bg-[#F3F8FC] dark:bg-[#0B0B0A] text-[#5B6E8C]/70 dark:text-white/30 text-sm">
          Loading editor...
        </div>
      }
    />
  );
}