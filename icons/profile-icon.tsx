const ProfileIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#1f3149"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 14s1-4 6-4 6 4 6 4H2Z"
    />
  </svg>
);

export default ProfileIcon;
