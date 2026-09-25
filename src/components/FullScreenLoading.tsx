interface FullScreenLoaderProps {
  label?: string;
  className?: string;
}

function FullScreenLoading({ label, className }: FullScreenLoaderProps) {
  return (
    <div
      aria-live="polite"
      aria-busy="true"
      className={[
        "w-full min-h-[calc(100vh-7rem)] bg-background/80 p-4 shadow-sm backdrop-blur-sm md:p-6",
        className,
      ].join(" ")}
    >
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
          </div>
        </div>

        <div className="h-3 w-full animate-pulse rounded-full bg-muted/90" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-muted/80" />

        <div className="flex items-center gap-3 pt-2">
          <div className="h-10 w-10 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-10 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-16 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-20 animate-pulse rounded-md bg-muted" />
        </div>

        <div className="space-y-3 pt-4">
          <div className="h-4 w-full animate-pulse rounded bg-muted/80" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/80" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-muted/80" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/80" />
          <div className="h-4 w-9/12 animate-pulse rounded bg-muted/80" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/80" />
          <div className="h-4 w-10/12 animate-pulse rounded bg-muted/80" />
        </div>
      </div>
    </div>
  );
}

export default FullScreenLoading;
