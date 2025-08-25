import { SearchIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type SearchProps = {
  keyIndex: string;
}

const Search = ({
  keyIndex
}: SearchProps) => {

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex flex-row rounded-full w-full h-full items-center justify-between border bg-background shadow-lg px-4 py-2 dark:bg-input dark:border-border/50">
          <SearchIcon className="text-muted-foreground" />
          <input type="text" disabled placeholder={`Search ${keyIndex}...`} className="flex w-full p-2 border-none focus:outline-none" />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <span>This feature is not yet available.</span>
      </TooltipContent>
    </Tooltip>
  )
}

export default Search;