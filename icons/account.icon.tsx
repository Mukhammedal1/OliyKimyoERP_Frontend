export const AccountIcon = ({ color = "white", ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth={2} />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={color} strokeWidth={2} />
  </svg>
);
