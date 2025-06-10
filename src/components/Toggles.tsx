import OptimizeToggle from "./OptimizeToggle";
import ThemeToggle from "./ThemeToggle";

const Toggles = () => {
  return (
    <div className="absolute top-2 right-2 w-fit flex gap-1 flex-row">
      <OptimizeToggle />
      <ThemeToggle />
    </div>
  )
}

export default Toggles;