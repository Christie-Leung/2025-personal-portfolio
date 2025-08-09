import type { HeadingBlock } from "@/generated/models/HeadingBlock";
import type { JSX } from "react";

const Heading = ({ level, text }: HeadingBlock) => {
  const Tag = (`h${level}` as unknown) as keyof JSX.IntrinsicElements;
  const sizes: Record<number, string> = {
    1: "text-3xl",
    2: "text-2xl",
    3: "text-xl",
    4: "text-lg",
    5: "text-base",
    6: "text-sm"
  };
  return <Tag className={`${sizes[level]} font-semibold text-zinc-100`}>{text}</Tag>;
}

export default Heading;