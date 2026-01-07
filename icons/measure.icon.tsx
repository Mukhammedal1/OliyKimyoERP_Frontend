export const MeasurementIcon = ({ color = "black", ...props }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    {/* Tarozi asosiy qutisi */}
    <rect
      x="5"
      y="8"
      width="14"
      height="12"
      rx="2"
      stroke={color}
      strokeWidth={2}
    />
    {/* Tarozi ustidagi o'lchov */}
    <path d="M12 8V6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <circle cx="12" cy="6" r="1.5" fill={color} />
    {/* Tarozi “platforma” chiziqlari */}
    <line
      x1="8"
      y1="16"
      x2="16"
      y2="16"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
