export function AppArrow({
  direction = "up-right",
}: {
  direction?: "up-right" | "left" | "right";
}) {
  const path =
    direction === "left"
      ? "M19 12H5m6-6-6 6 6 6"
      : direction === "right"
        ? "M5 12h14m-6-6 6 6-6 6"
        : "M6 18 18 6M6 6h12v12";
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={path} />
    </svg>
  );
}

export function AppIcon({
  name,
}: {
  name: "logs" | "environment" | "shortcut" | "check" | "key" | "note";
}) {
  const paths = {
    logs: "M5 4h14v16H5z M8 8h8M8 12h8M8 16h5",
    environment: "M4 7h16M4 17h16M8 4v6M16 14v6",
    shortcut: "m13 3-8 11h6l-1 7 9-12h-6z",
    check: "m5 12 4 4L19 6",
    key: "M14 8a5 5 0 1 1-3-4M11 11l9 9m-4-4 3-3m-6 0 3-3",
    note: "M5 4h14v16H5z M8 8h8M8 12h8M8 16h4",
  };
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
