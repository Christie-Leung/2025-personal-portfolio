
import { MessageBlock } from "~/generated/models/MessageBlock";
import Heading from "./Heading";
import Table from "./Table";
import { TextShimmer } from "~/components/ui/text-shimmer";
import Typewriter from "./Typewriter";
import { useEffect } from "react";

type BlockRendererProps = {
  block: MessageBlock;
  mode?: "active" | "done" | "pending";
  onDone?: () => void;
};

const BlockRenderer = ({
  block,
  mode = "done",
  onDone
}: BlockRendererProps) => {
  const isActive = mode === "active";
  const isDone = mode === "done";

  const autoAdvanceInstantly = (ms = 0) => {
    useEffect(() => {
      if (isActive) {
        const id = setTimeout(() => onDone?.(), ms);
        return () => clearTimeout(id);
      }
    }, [isActive, ms, onDone]);
  };

  switch (block.type) {
    case "paragraph":
      return (
        <Typewriter
          as="span"
          text={block.text}
          className="text-base leading-7 text-primary pb-4"
          disabled={isDone}
          speed={36}
        />
      );

    case "thinking":
      return <TextShimmer>Thinking...</TextShimmer>;

    case "heading":
      return <Heading {...block} disabled={isDone} />;

    case "divider":
      autoAdvanceInstantly(0);
      return <hr className="border-border my-6" />;

    case "code":
      return (
        <pre className="overflow-x-auto rounded-xl bg-background p-4 text-[13px] leading-6">
          <Typewriter
            as="code"
            text={block.content}
            className={block.language ? `language-${block.language}` : undefined}
            preserveWhitespace
            speed={50}
            onDone={onDone}
            disabled={isDone}
          />
        </pre>
      );

    case "table":
      return <Table {...block} disabled={isDone} />;

    case "list": {
      const b = block as { type: "list"; ordered?: boolean; items: string[] };
      const ListTag = b.ordered ? "ol" : "ul";
      return (
        <ListTag className={b.ordered ? "list-decimal pl-6 text-sm space-y-2" : "list-disc pl-6 text-sm space-y-2"}>
          {b.items.map((txt, i) => (
            <li key={i} className="text-primary">
              <Typewriter text={txt} disabled={isDone} />
            </li>
          ))}
        </ListTag>
      );
    }

    case "image":
      autoAdvanceInstantly(0);
      return (
        <figure className="flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={block.alt ?? ""}
            className="max-w-full rounded-xl border border-border"
          />
          {block.alt ? (
            <figcaption className="text-xs text-secondary">{block.alt}</figcaption>
          ) : null}
        </figure>
      );

    default:
      autoAdvanceInstantly(0);
      return (
        <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-200">
          Unknown block type
        </div>
      );
  }
}

export default BlockRenderer;
