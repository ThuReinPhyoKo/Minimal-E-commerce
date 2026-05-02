import { motion } from 'framer-motion';

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MenuButton({ isOpen, onClick }: MenuButtonProps) {
  // Define the transition settings for a smooth, high-end feel
  const variant = {
    top: {
      closed: { rotate: 0, translateY: 0 },
      opened: { rotate: 45, translateY: 4, translateX: -9 },
    },
    middle: {
      closed: { opacity: 1 },
      opened: { opacity: 0 },
    },
    bottom: {
      closed: { rotate: 0, translateY: 0 },
      opened: { rotate: -45, translateY: -6 },
    },
  };

  return (
    <button
      onClick={onClick}
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-white/10 bg-transparent transition-colors hover:bg-white/5 focus:outline-none"
      aria-label={isOpen ? "Close Menu" : "Open Menu"}
    >
      <motion.span
        variants={variant.top}
        animate={isOpen ? "opened" : "closed"}
        className="h-0.5 w-6 bg-gray-900" // Use your Tailwind gold variable here
        style={{ originX: "0.5rem", originY: "0.5rem" }}
      />
      <motion.span
        variants={variant.middle}
        animate={isOpen ? "opened" : "closed"}
        className="h-0.5 w-6 bg-gray-900"
      />
      <motion.span
        variants={variant.bottom}
        animate={isOpen ? "opened" : "closed"}
        className="h-0.5 w-6 bg-gray-900"
        style={{ originX: "0.5rem", originY: "0.5rem" }}
      />
    </button>
  );
};