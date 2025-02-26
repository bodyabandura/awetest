type Props = {
  isOpen?: boolean;
  sx?: string;
}
export const ArrowIcon: React.FC<Props> = ( { isOpen, sx }) => {
  return (
    <svg
     width="16"
      height="16"
      className={`w-5 h-5 transition-transform ${sx} ${isOpen ? 'rotate-90' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>)
}