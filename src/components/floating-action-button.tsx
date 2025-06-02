"use client";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export const FloatingActionButton = ({ onClick }: FloatingActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="p-3 rounded-full bg-background text-primary shadow-lg group relative cursor-pointer"
      aria-label="Toggle panel"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 relative pointer-events-none transition-all duration-300 group-hover:text-[#D97757] dark:group-hover:text-[#D97757]"
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
