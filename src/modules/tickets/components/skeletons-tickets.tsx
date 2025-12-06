"use client";

export function SkeletonTicketsSummary() {
  return (
    <div className="flex w-full animate-pulse flex-col gap-4 sm:flex-row sm:flex-wrap">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`tickets-summary-skeleton-${index}`}
          className="border-soft bg-surface-card flex w-full flex-col justify-between rounded-2xl border p-6 shadow-sm sm:w-[calc(50%-0.75rem)] xl:w-64"
        >
          <span className="h-4 w-28 rounded bg-white/10" />
          <div className="mt-4 flex items-end justify-between">
            <span className="h-8 w-20 rounded bg-white/20" />
            <div className="h-12 w-12 rounded-full bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTicketsFilters() {
  return (
    <div className="mb-4 flex animate-pulse flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2">
        <span className="h-4 w-40 rounded bg-white/10" />
        <div className="h-11 w-80 rounded-lg bg-white/5" />
      </div>

      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`filter-skeleton-${index}`} className="flex flex-col gap-2">
            <span className="h-4 w-24 rounded bg-white/10" />
            <div className="h-11 w-48 rounded-lg bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonTicketsTable() {
  return (
    <div className="bg-gradient-glass border-soft h-full w-full rounded-3xl border px-6 py-10">
      <SkeletonTicketsFilters />

      <div className="border-soft bg-surface-contrast mt-4 animate-pulse rounded-2xl border p-6">
        <div className="mb-4 h-5 w-full rounded bg-white/5" />
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={`row-skeleton-${index}`} className="h-10 rounded-lg bg-white/5" />
          ))}
        </div>
        <div className="mt-6 h-4 w-32 rounded bg-white/10" />
      </div>

      <div className="text-muted-soft mt-4 flex flex-col gap-4 text-xs md:flex-row md:items-center md:justify-between">
        <div className="h-4 w-40 rounded bg-white/10" />
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-8 w-32 rounded bg-white/5" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-20 rounded bg-white/5" />
            <div className="h-8 w-16 rounded bg-white/5" />
            <div className="h-8 w-20 rounded bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
