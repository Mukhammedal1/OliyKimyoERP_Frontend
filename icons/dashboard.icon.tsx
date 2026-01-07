export const DashboardIcon = ({ color = "white", ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <rect x="3" y="3" width="7" height="7" stroke={color} strokeWidth={2} />
    <rect x="14" y="3" width="7" height="7" stroke={color} strokeWidth={2} />
    <rect x="3" y="14" width="7" height="7" stroke={color} strokeWidth={2} />
    <rect x="14" y="14" width="7" height="7" stroke={color} strokeWidth={2} />
  </svg>
);
