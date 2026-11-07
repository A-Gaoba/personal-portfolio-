/** GAOBA monogram + name. `inverted` is for ink surfaces (footer). */
export default function Logo({ inverted = false, className = "" }: { inverted?: boolean; className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className={`grid h-9 w-9 flex-none place-items-center rounded-full text-[13px] font-bold ring-2 ring-offset-2 ${
          inverted
            ? "bg-on-inverse text-inverse ring-inverse ring-offset-on-inverse/70"
            : "bg-inverse text-on-inverse ring-canvas ring-offset-fg/80"
        }`}
      >
        AG
      </span>
      <span dir="ltr" className={`text-[17px] font-bold leading-none tracking-tight ${inverted ? "text-on-inverse" : "text-fg"}`}>
        Abdulrahman<span className="text-brand">.</span>
      </span>
    </span>
  )
}
