import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

type FloatingStarProps = {
  className?: string;
  delay?: number;
};

const FloatingStar = ({ className, delay = 0 }: FloatingStarProps) => (
  <motion.div
    className={twMerge(className, "absolute text-2xl pointer-events-none")}
    animate={{ y: [0, -10, 0] }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  >
    ✦
  </motion.div>
);

export default FloatingStar;