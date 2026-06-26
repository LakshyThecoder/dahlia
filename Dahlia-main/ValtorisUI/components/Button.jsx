/**
 * ValtorisUI Button
 * =================
 * variant: "primary" | "ghost" | "outline"
 * size: "sm" | "md" | "lg"
 *
 * All variants: sharp edges, uppercase tracking, translateY hover.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  as: Tag = "button",
  className = "",
  ...props
}) {
  const base = "inline-flex items-center justify-center gap-3 font-body font-semibold uppercase tracking-[0.25em] transition-all duration-300 focus:outline-none";

  const sizes = {
    sm: "px-5 py-2.5 text-[10px]",
    md: "px-7 py-4 text-xs",
    lg: "px-9 py-5 text-sm",
  };

  const variants = {
    primary: "bg-dahlia-red text-white hover:bg-[#ff5039] hover:translate-y-[-3px] hover:shadow-[0_12px_40px_-8px_rgba(255,59,34,0.5)]",
    ghost:   "text-dahlia-text border-b border-dahlia-text/30 pb-1 hover:text-dahlia-red hover:border-dahlia-red hover:gap-4",
    outline: "border border-dahlia-border text-dahlia-muted hover:border-dahlia-red hover:text-dahlia-red hover:translate-y-[-2px]",
  };

  return (
    <Tag
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
