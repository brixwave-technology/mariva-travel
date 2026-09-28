type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  text?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "split";
  id?: string;
};

export function SectionHeading({ eyebrow, title, text, tone = "light", align = "split", id }: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      data-reveal
      className={align === "split" ? "grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16" : "max-w-3xl"}
    >
      <div>
        <p className={`eyebrow ${isDark ? "eyebrow-light" : ""}`}>{eyebrow}</p>
        <h2 id={id} className="heading-lg mt-4 text-balance">
          {title}
        </h2>
      </div>
      {text ? (
        <p className={`lead ${align === "split" ? "" : "mt-5"} ${isDark ? "text-white/65" : "text-muted"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
