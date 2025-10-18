interface StatusProps {
  children: string;
  statusColor: keyof typeof STATUS_COLOR;
}

const STATUS_COLOR = {
  green: "var(--green-500)",
  red: "var(--red-500)",
  yellow: "var(--yellow-500)",
};

export function Status({ children, statusColor }: StatusProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          width: "0.5rem",
          height: "0.5rem",
          borderRadius: "50%",
          backgroundColor: STATUS_COLOR[statusColor],
        }}
      ></div>
      <span>{children}</span>
    </div>
  );
}
