import { Editor } from "@monaco-editor/react";

/**
 * Monaco-based code editor, themed to match the app's dark UI.
 * Drop-in for the TutorialPage editor pane — just needs `value` / `onChange`.
 *
 * Install first:  npm install @monaco-editor/react
 */
export default function CodeEditor({ value, onChange, language = "python" }) {
  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onChange={(val) => onChange(val ?? "")}
      theme="vs-dark"
    //   beforeMount={(monaco) => {
    //     monaco.editor.defineTheme("algoguru-dark", {
    //       base: "vs-dark",
    //       inherit: true,
    //       rules: [],
    //       colors: {
    //         "editor.background": "#0B0B0A",
    //         "editor.lineHighlightBackground": "#161615",
    //         "editorLineNumber.foreground": "#4A4A48",
    //         "editorLineNumber.activeForeground": "#8A8A87",
    //         "editorGutter.background": "#0B0B0A",
    //         "editor.selectionBackground": "#2A2A28",
    //         "scrollbarSlider.background": "#22222080",
    //         "scrollbarSlider.hoverBackground": "#2A2A28",
    //       },
    //     });
    //   }}
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
        <div className="w-full h-full flex items-center justify-center bg-[#0B0B0A] text-white/30 text-sm">
          Loading editor...
        </div>
      }
    />
  );
}