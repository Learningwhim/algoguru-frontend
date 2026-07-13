// Formats the plain-text step description (as authored in step_data.js) into
// readable sections — no markdown, no extra dependency. Descriptions follow
// a predictable shape: ALL-CAPS section labels (GOAL, CONCEPT, WALKTHROUGH,
// MATH CORNER, TRY IT YOURSELF, CHECKPOINT, COMMON MISTAKES) each followed by
// prose, bullet/numbered lists, and occasional code snippets.
//
// Classification is done line-by-line (not paragraph-by-paragraph) so a
// blank line *inside* a code block doesn't fragment it into separate boxes,
// and single lines like `model.eval()  # switch to eval mode` are reliably
// recognized as code even when short.

const SECTION_HEADER = /^[A-Z0-9][A-Z0-9 —\-]*$/;

function splitSections(text) {
  const lines = text.split("\n");
  const sections = [];
  let current = null;

  for (const line of lines) {
    const trimmed = line.trim();
    const isHeader =
      trimmed.length > 0 &&
      trimmed.length < 60 &&
      SECTION_HEADER.test(trimmed) &&
      !/[a-z]/.test(trimmed); // no lowercase letters at all

    if (isHeader) {
      current = { title: trimmed, lines: [] };
      sections.push(current);
    } else if (current) {
      current.lines.push(line);
    } else {
      // content before the first recognized header
      current = { title: null, lines: [line] };
      sections.push(current);
    }
  }

  return sections
    .map((s) => ({ title: s.title, body: s.lines.join("\n").trim() }))
    .filter((s) => s.body.length > 0);
}

// Classify a single line. Blank lines are handled separately by the block
// builder, so they never reach here.
function classifyLine(rawLine) {
  const line = rawLine.trim();

  if (/^-\s/.test(line)) return "bullet";
  if (/^\d+\.\s/.test(line)) return "numbered";

  // Indentation (preserved on the raw, un-trimmed line) is a strong signal.
  if (/^\s{2,}/.test(rawLine)) return "code";

  if (
    /^(import|from|def|class|for|with|print\(|return|if |elif |else:|while |try:|except|@)/.test(
      line
    )
  )
    return "code";
  if (/^#/.test(line)) return "code"; // standalone comment line
  if (/^[a-zA-Z_][\w.]*(\[[^\]]*\])?\s*[+\-*/]?=[^=]/.test(line)) return "code"; // assignment
  if (/\w+\([^)]*\)/.test(line)) return "code"; // any function/method call, incl. trailing comments
  if (/:\s*(#.*)?$/.test(line) && line.length > 1) return "code"; // block opener e.g. "with torch.no_grad():"

  return "text";
}

// Groups classified lines into blocks. A blank line only breaks a block when
// the lines on either side are of different types — a blank line surrounded
// by code (or by bullets, or by text) stays inside that same block.
function buildBlocks(bodyText) {
  const lines = bodyText.split("\n");
  const tags = lines.map((l) => (l.trim() === "" ? "blank" : classifyLine(l)));

  const blocks = [];
  let i = 0;

  const nextNonBlankTag = (from) => {
    for (let k = from; k < tags.length; k++) {
      if (tags[k] !== "blank") return tags[k];
    }
    return null;
  };

  while (i < lines.length) {
    if (tags[i] === "blank") {
      i++;
      continue;
    }

    const blockType = tags[i]; // "bullet" | "numbered" | "code" | "text"
    const start = i;

    while (i < lines.length) {
      if (tags[i] === blockType) {
        i++;
        continue;
      }
      if (tags[i] === "blank" && nextNonBlankTag(i + 1) === blockType) {
        i++; // absorb the blank, block continues
        continue;
      }
      break;
    }

    const rawSlice = lines.slice(start, i);
    const content =
      blockType === "code"
        ? rawSlice.join("\n").replace(/\n+$/, "")
        : rawSlice
            .filter((l) => l.trim() !== "")
            .join("\n")
            .trim();

    if (content) blocks.push({ type: blockType, content });
  }

  return blocks;
}

function Block({ type, content }) {
  if (type === "code") {
    return (
      <pre className="mb-3 rounded-lg overflow-x-auto bg-[#16223A]/[0.06] dark:bg-white/[0.06] p-3 text-[#16223A] dark:text-white/90 text-[13px] font-mono leading-relaxed">
        {content}
      </pre>
    );
  }

  if (type === "bullet") {
    return (
      <ul className="list-disc pl-5 space-y-1.5 mb-3 text-[#5B6E8C] dark:text-white/70 text-sm leading-relaxed">
        {content.split("\n").map((l, i) => (
          <li key={i}>{l.trim().replace(/^-\s/, "")}</li>
        ))}
      </ul>
    );
  }

  if (type === "numbered") {
    return (
      <ol className="list-decimal pl-5 space-y-1.5 mb-3 text-[#5B6E8C] dark:text-white/70 text-sm leading-relaxed">
        {content.split("\n").map((l, i) => (
          <li key={i}>{l.trim().replace(/^\d+\.\s/, "")}</li>
        ))}
      </ol>
    );
  }

  return (
    <p className="text-[#5B6E8C] dark:text-white/70 text-sm leading-relaxed mb-3 whitespace-pre-line">
      {content}
    </p>
  );
}

export default function StepContent({ content, accent }) {
  const sections = splitSections(content ?? "");

  return (
    <div>
      {sections.map((section, i) => {
        const blocks = buildBlocks(section.body);
        return (
          <div key={i}>
            {section.title && (
              <h3
                className="text-xs font-semibold uppercase tracking-wide mt-6 mb-2 first:mt-0"
                style={{ color: accent }}
              >
                {section.title}
              </h3>
            )}
            {blocks.map((block, j) => (
              <Block key={j} type={block.type} content={block.content} />
            ))}
          </div>
        );
      })}
      <br/>
      <br/>
    </div>
  );
}