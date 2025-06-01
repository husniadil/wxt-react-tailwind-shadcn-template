"use client";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-3 rounded-full bg-white dark:bg-black shadow-lg group relative cursor-pointer"
      aria-label="Toggle panel"
    >
      <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:bg-[#54bc4a]/30 dark:group-hover:bg-[#54bc4a]/40 blur-md pointer-events-none"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 relative text-black dark:text-white pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    </button>
  );
};
