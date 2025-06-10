import { MdMotionPhotosOff, MdMotionPhotosOn } from "react-icons/md";
import Button from "./Button";
import { useTheme } from "@/provider";

const OptimizeToggle = () => {
  const { fast, setFast } = useTheme();

  return (
    <Button
      variant="button-outline"
      size="small"
      onClick={() => setFast(!fast)}
      className="hover:opacity-100 opacity-80 hover:bg-main-opposite/90"
    >
      {fast && <MdMotionPhotosOn />}
      {!fast && <MdMotionPhotosOff /> }
    </Button>
  )
}

export default OptimizeToggle;