// src/components/StartMenu.tsx
import { motion } from 'framer-motion';

type StartMenuProps = {
  onSelect: (mode: 'single' | 'multi' | 'realms') => void;
};

export default function StartMenu({ onSelect }: StartMenuProps) {
  const buttons = [
    { label: 'Singleplayer', mode: 'single' as const },
    { label: 'Multiplayer',  mode: 'multi'  as const },
    { label: 'Minecraft Realms', mode: 'realms' as const },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
      {/* Logo */}
      <image
      ></image>
      <h1
        className="text-[5rem] leading-none select-none"
        style={{ fontFamily: '"Minecraft"', lineHeight: 1 }}
      >
        MINECRAFT
      </h1>
      {/* Buttons */}
      <div className="flex flex-col space-y-2">
        {buttons.map(({ label, mode }) => (
          <motion.button
            key={mode}
            onClick={() => onSelect(mode)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="
              text-white
              bg-gray-800 bg-opacity-80
              px-8 py-2
              border-4 border-gray-700
              hover:bg-gray-700
              active:bg-gray-600
              text-lg
              select-none
              font-minecraft
              uppercase
            "
          >
            {label}
          </motion.button>
        ))}
      </div>
      {/* Footer text */}
      <p className="absolute bottom-4 text-xs text-gray-200">
        © 2025 ChristieCraft
      </p>
    </div>
  );
}
