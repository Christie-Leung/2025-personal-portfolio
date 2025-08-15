import type { MessageBlocks } from "~/generated/models/MessageBlocks";
import type { MessageBlock } from "~/generated/models/MessageBlock";
import type { ParagraphBlock } from "~/generated/models/ParagraphBlock";
import type { HeadingBlock } from "~/generated/models/HeadingBlock";
import type { DividerBlock } from "~/generated/models/DividerBlock";
import type { CodeBlock } from "~/generated/models/CodeBlock";
import type { TableBlock } from "~/generated/models/TableBlock";
import type { ImageBlock } from "~/generated/models/ImageBlock";
import type { ListBlock } from "~/generated/models/ListBlock";

/**
 * Minimal, fast markdown-to-blocks parser.
 * Supports: headings (#), fenced code ```lang, hr (---/***), images ![](),
 * unordered (- * +) and ordered (1. 2.) lists, pipe tables, paragraphs.
 */
export function markdownToBlocks(md: string): MessageBlocks {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: MessageBlock[] = [];
  let i = 0;

  const paragraphBuf: string[] = [];
  const flushParagraph = () => {
    if (!paragraphBuf.length) return;
    const text = paragraphBuf.join("\n").trim();
    if (text) blocks.push({ type: "paragraph", text } as ParagraphBlock);
    paragraphBuf.length = 0;
  };

  while (i < lines.length) {
    let line = lines[i];

    // Blank line → paragraph boundary
    if (/^\s*$/.test(line)) {
      flushParagraph();
      i++;
      continue;
    }

    // Fenced code
    const fence = line.match(/^\s*```(\w+)?\s*$/);
    if (fence) {
      flushParagraph();
      const lang = fence[1];
      i++;
      const buf: string[] = [];
      while (i < lines.length && !/^\s*```/.test(lines[i])) {
        buf.push(lines[i++]);
      }
      if (i < lines.length) i++; // consume closing fence
      blocks.push({ type: "code", language: lang, content: buf.join("\n") } as CodeBlock);
      continue;
    }

    // Divider (hr)
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      flushParagraph();
      blocks.push({ type: "divider" } as DividerBlock);
      i++;
      continue;
    }

    // Heading
    const h = line.match(/^\s*(#{1,6})\s+(.*)$/);
    if (h) {
      flushParagraph();
      const level = Math.min(h[1].length, 6) as 1 | 2 | 3 | 4 | 5 | 6;
      blocks.push({ type: "heading", level, text: h[2].trim() } as HeadingBlock);
      i++;
      continue;
    }

    // Image
    const img = line.match(/^\s*!\[([^\]]*)\]\((\S+?)(?:\s+"(.*?)")?\)\s*$/);
    if (img) {
      flushParagraph();
      blocks.push({ type: "image", url: img[2], alt: img[1] || undefined } as ImageBlock);
      i++;
      continue;
    }

    // Table (very simple GFM)
    if (line.includes("|") && i + 1 < lines.length && /^\s*\|?\s*[:-]+[-| :]*\s*\|?\s*$/.test(lines[i + 1])) {
      flushParagraph();
      const head = splitRow(line);
      i += 2; // skip delimiter row
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && !/^\s*$/.test(lines[i])) {
        rows.push(splitRow(lines[i++]));
      }
      blocks.push({ type: "table", headers: head, rows } as TableBlock);
      continue;
    }

    // List (unordered/ordered)
    const liUn = line.match(/^\s*[-*+]\s+(.+)$/);
    const liOr = line.match(/^\s*\d+[.)]\s+(.+)$/);
    if (liUn || liOr) {
      flushParagraph();
      const ordered = Boolean(liOr);
      const items: string[] = [];
      while (i < lines.length) {
        const m = ordered
          ? lines[i].match(/^\s*\d+[.)]\s+(.+)$/)
          : lines[i].match(/^\s*[-*+]\s+(.+)$/);
        if (!m) break;
        items.push(m[1].trim());
        i++;
      }
      blocks.push({ type: "list", ordered, items } as ListBlock);
      continue;
    }

    // Accumulate paragraph lines
    paragraphBuf.push(line);
    i++;
  }

  flushParagraph();
  return { blocks };

  function splitRow(row: string): string[] {
    // remove outer pipes, split, trim
    const trimmed = row.trim().replace(/^\|/, "").replace(/\|$/, "");
    return trimmed.split("|").map((c) => c.trim());
  }
}
