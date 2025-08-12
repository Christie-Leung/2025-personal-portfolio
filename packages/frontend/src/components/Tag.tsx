import { cn, getDarkerShade, stringToPastelColor } from "~/lib/utils";
import { Badge } from "./ui/badge";



const Tag = ({ tag }: { tag: string }) => {
  const color = stringToPastelColor(tag);

  const textColor = getDarkerShade(color, 60);

  return (
    <Badge
      variant="default"
      className="hover:cursor-default"
      style={{ backgroundColor: color, color: textColor }}
    >
      {tag}
    </Badge>
  );
};

export default Tag;