export const colorStyles = {
  cyan: "bg-cyan-300 shadow-[inset_0_1px_2px_rgba(255,255,255,.7),0_0_12px_rgba(34,211,238,.32)]",
  amber: "bg-amber-300 shadow-[inset_0_1px_2px_rgba(255,255,255,.7),0_0_12px_rgba(251,191,36,.32)]",
  violet: "bg-violet-400 shadow-[inset_0_1px_2px_rgba(255,255,255,.7),0_0_12px_rgba(167,139,250,.32)]",
  lime: "bg-lime-300 shadow-[inset_0_1px_2px_rgba(255,255,255,.7),0_0_12px_rgba(163,230,53,.32)]",
  rose: "bg-rose-400 shadow-[inset_0_1px_2px_rgba(255,255,255,.7),0_0_12px_rgba(251,113,133,.32)]",
  blue: "bg-blue-400 shadow-[inset_0_1px_2px_rgba(255,255,255,.7),0_0_12px_rgba(96,165,250,.32)]",
  orange: "bg-orange-400 shadow-[inset_0_1px_2px_rgba(255,255,255,.7),0_0_12px_rgba(251,146,60,.32)]",
};

export function Block({ color, className = "" }) {
  return (
    <span
      className={`block rounded-[3px] ${color ? colorStyles[color] : ""} ${className}`}
      aria-hidden="true"
    />
  );
}
