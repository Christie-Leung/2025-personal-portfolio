import { SearchIcon } from "lucide-react";

type SearchProps = {
  keyIndex: string;
}

const Search = ({
  keyIndex
}: SearchProps) => {

  return (
    <div className="flex flex-row rounded-full w-full h-full items-center justify-between border bg-background shadow-lg px-4 py-2 dark:bg-input dark:border-border/50">
      <SearchIcon />
      <input type="text" placeholder={`Search ${keyIndex}...`} className="flex w-full p-2 border-none focus:outline-none" />
    </div>
  )
}

export default Search;