import type { HeadingBlock } from "~/generated/models/HeadingBlock";
import type { JSX } from "react";

const Heading = ({ level, text }: HeadingBlock) => {
  const Tag = (`h${level}` as unknown) as keyof JSX.IntrinsicElements;
  const sizes: Record<number, string> = {
    1: "text-3xl pb-8",
    2: "text-2xl pb-6",
    3: "text-xl pb-4",
    4: "text-lg pb-2",
    5: "text-base pb-2",
    6: "text-sm pb-2"
  };
  return <Tag className={`${sizes[level]} font-semibold text-primary`}>{text}</Tag>;
}

export default Heading;