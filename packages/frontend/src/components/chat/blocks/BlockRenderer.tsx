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
      return <p className="text-sm leading-7 text-zinc-200">{block.text}</p>;

    case "heading":
      return <Heading {...block} />;

    case "divider":
      return <hr className="border-zinc-700/60" />;

    case "code":
      return (
        <pre className="overflow-x-auto rounded-xl bg-zinc-900 p-4 text-[13px] leading-6">
          <code className={block.language ? `language-${block.language}` : undefined}>
            {block.content}
          </code>
        </pre>
      );

    case "table":
      return <Table {...block} />;

    case "image":
      return (
        <figure className="flex flex-col items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.url}
            alt={block.alt ?? ""}
            className="max-w-full rounded-xl border border-zinc-800"
          />
          {block.alt ? (
            <figcaption className="text-xs text-zinc-400">{block.alt}</figcaption>
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
