import type { MessageBlock } from "@/generated/models/MessageBlock";
import Heading from "./Heading";
import Table from "./Table";

type BlockRendererProps = {
  block: MessageBlock;
};

const BlockRenderer = ({
  block,
}: BlockRendererProps) => {
  switch (block.type) {
    case "paragraph":
      return <p className="text-base leading-7 text-primary pb-4">{block.text}</p>;

    case "heading":
      return <Heading {...block} />;

    case "divider":
      return <hr className="border-border my-6" />;

    case "code":
      return (
        <pre className="overflow-x-auto rounded-xl bg-background p-4 text-[13px] leading-6">
          <code className={block.language ? `language-${block.language}` : undefined}>
            {block.content}
          </code>
        </pre>
      );

    case "table":
      return <Table {...block} />;

    case "list": {
      const b = block as { type: "list"; ordered?: boolean; items: string[] };
      const ListTag = b.ordered ? "ol" : "ul";
      return (
        <ListTag className={b.ordered ? "list-decimal pl-6 text-sm space-y-2" : "list-disc pl-6 text-sm space-y-2"}>
          {b.items.map((txt, i) => <li key={i} className="text-primary">{txt}</li>)}
        </ListTag>
      );
    }

    case "image":
      return (
        <figure className="flex flex-col items-center gap-2">
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
      return (
        <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-200">
          Unknown block type
        </div>
      );
  }
}

export default BlockRenderer;
