interface LogoutIconProps {
  className?: string;
}

export function LogoutIcon({ className }: LogoutIconProps) {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3.54167 30.875C2.60208 30.875 1.79803 30.5407 1.1295 29.8722C0.460972 29.2037 0.126139 28.3991 0.125 27.4583V3.54167C0.125 2.60208 0.459833 1.79803 1.1295 1.1295C1.79917 0.460972 2.60322 0.126139 3.54167 0.125H15.5V3.54167H3.54167V27.4583H15.5V30.875H3.54167ZM22.3333 24.0417L19.9844 21.5646L24.3406 17.2083H10.375V13.7917H24.3406L19.9844 9.43542L22.3333 6.95833L30.875 15.5L22.3333 24.0417Z"
        fill="#95291A"
      />
    </svg>
  );
}
