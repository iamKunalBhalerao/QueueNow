export const Logo = () => (
  <div className="flex items-center space-x-2">
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
    >
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="10" y="10" width="12" height="12" rx="6" fill="currentColor" />
    </svg>
    <span className="font-semibold text-xl text-primary">QueueUp</span>
  </div>
);
