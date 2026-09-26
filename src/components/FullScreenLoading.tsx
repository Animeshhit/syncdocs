interface FullScreenLoaderProps {
  label?: string;
  className?: string;
}

// Explicit, theme-independent skeleton color (not dependent on a `muted`
// design token that may not be configured/visible in your app's theme).
const SKELETON =
  "animate-pulse rounded-md bg-slate-200 dark:bg-slate-700/80";

function ToolbarSkeleton() {
  return (
    <div className="flex w-full shrink-0 items-center justify-between gap-4 overflow-x-auto whitespace-nowrap border-b border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-[#0d0d0d] md:px-6">
      <div/>
      <div className="flex shrink-0 items-center gap-1">
        {/* undo / redo */}
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />

        <div className="mx-2 h-6 w-px shrink-0 bg-slate-300 dark:bg-slate-700" />

        {/* heading dropdown */}
        <div className={`h-8 w-14 shrink-0 ${SKELETON}`} />
        {/* bullet list dropdown */}
        <div className={`h-8 w-14 shrink-0 ${SKELETON}`} />
        {/* ordered list */}
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
        {/* code block */}
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />

        <div className="mx-2 h-6 w-px shrink-0 bg-slate-300 dark:bg-slate-700" />

        {/* bold / italic / strike / inline-code / underline / highlight / link */}
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />

        <div className="mx-2 h-6 w-px shrink-0 bg-slate-300 dark:bg-slate-700" />

        {/* superscript / subscript */}
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />

        <div className="mx-2 h-6 w-px shrink-0 bg-slate-300 dark:bg-slate-700" />

        {/* align left / center / right / justify */}
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
        <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />

        {/* add image + add */}
        <div className={`ml-2 h-8 w-16 shrink-0 ${SKELETON}`} />
      </div>

      {/* search */}
      <div className={`h-8 w-8 shrink-0 ${SKELETON}`} />
    </div>
  );
}

function DocumentBodySkeleton() {
  const paragraphLines = [
    "w-full",
    "w-11/12",
    "w-full",
    "w-9/12",
    "w-full",
    "w-10/12",
    "w-8/12",
  ];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8 md:px-0">
      {/* name / title line */}
      <div className={`h-5 w-32 ${SKELETON}`} />

      {/* generic media block */}
      <div className={`h-72 w-full md:h-80 ${SKELETON}`} />

      {/* address / metadata block */}
      <div className="space-y-2 pt-2">
        <div className={`h-4 w-28 ${SKELETON}`} />
        <div className={`h-4 w-40 ${SKELETON}`} />
        <div className={`h-4 w-24 ${SKELETON}`} />
      </div>

      <div className={`h-4 w-16 ${SKELETON}`} />

      <div className="space-y-2">
        <div className={`h-4 w-36 ${SKELETON}`} />
        <div className={`h-4 w-44 ${SKELETON}`} />
        <div className={`h-4 w-24 ${SKELETON}`} />
      </div>

      <div className={`h-4 w-52 ${SKELETON}`} />

      <div className="space-y-3 pt-2">
        {paragraphLines.map((w, i) => (
          <div key={i} className={`h-4 ${w} ${SKELETON}`} />
        ))}
      </div>
    </div>
  );
}

function FullScreenLoading({ label, className }: FullScreenLoaderProps) {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
      className={[
        "flex min-h-[calc(100vh-7rem)] w-full flex-col bg-white dark:bg-[#0d0d0d]",
        className,
      ].join(" ")}
    >
      <ToolbarSkeleton />
      <DocumentBodySkeleton />
    </div>
  );
}

export default FullScreenLoading;