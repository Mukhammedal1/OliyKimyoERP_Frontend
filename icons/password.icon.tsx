export const PasswordIcon = ({ color = "white", ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <rect x="6" y="10" width="12" height="10" stroke={color} strokeWidth={2} />
    <path d="M12 10V7a3 3 0 116 0v3" stroke={color} strokeWidth={2} />
  </svg>
);
