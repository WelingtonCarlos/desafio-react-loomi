export function SkeletonSuggestionsCards() {
  return (
    <div className="animate-pulse space-y-6">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={`suggestion-skeleton-${index}`}
          className={`border-soft h-64 w-[312px] rounded-2xl border p-6 ${
            index === 0 ? "bg-gradient-brand-card" : "bg-surface-contrast"
          }`}
        >
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-4">
              <div className="h-4 w-36 rounded bg-white/30" />
              <div className="h-3 w-full rounded bg-white/20" />
              <div className="h-3 w-5/6 rounded bg-white/20" />
            </div>
            <div className="space-y-2">
              <div className="h-3 w-24 rounded bg-white/20" />
              <div className="flex items-center justify-between">
                <div className="h-6 w-24 rounded bg-white/30" />
                <div className="h-10 w-24 rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonSmartClassification() {
  return (
    <div className="border-soft bg-gradient-glass rounded-2xl border p-6">
      <div className="animate-pulse space-y-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="border-soft bg-surface-contrast flex w-full flex-col items-center rounded-2xl border px-8 py-6 lg:max-w-sm">
            <div className="h-20 w-20 rounded-full bg-white/10" />
            <div className="mt-4 h-4 w-32 rounded bg-white/10" />
            <div className="mt-6 grid w-full grid-cols-2 gap-4 text-left">
              <div className="h-10 rounded bg-white/5" />
              <div className="h-10 rounded bg-white/5" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={`score-skeleton-${index}`}
                className="border-soft bg-surface-contrast space-y-3 rounded-2xl border px-6 py-5"
              >
                <div className="flex items-center justify-between">
                  <span className="h-4 w-32 rounded bg-white/10" />
                  <span className="h-6 w-20 rounded-full bg-white/10" />
                </div>
                <div className="h-2 w-full rounded bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonAISuggestions() {
  return (
    <div className="bg-gradient-glass border-soft h-[536px] w-full rounded-2xl border p-6">
      <div className="flex animate-pulse flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="h-5 w-40 rounded bg-white/10" />
          <div className="bg-surface-contrast-strong flex w-56 justify-between rounded-full px-3 py-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <span key={`tab-skeleton-${index}`} className="h-7 w-12 rounded-full bg-white/5" />
            ))}
          </div>
        </div>

        <div className="bg-surface-contrast-strong space-y-4 rounded-2xl p-6">
          <div className="space-y-2">
            <div className="h-3 w-32 rounded bg-white/10" />
            <div className="h-4 w-64 rounded bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={`stat-skeleton-${index}`} className="space-y-2">
                <div className="h-3 w-32 rounded bg-white/10" />
                <div className="h-6 w-32 rounded bg-white/10" />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="h-3 w-24 rounded bg-white/10" />
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`reason-skeleton-${index}`} className="h-4 w-full rounded bg-white/10" />
            ))}
          </div>

          <div className="h-10 w-48 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonClientInfoSidebar() {
  return (
    <div className="bg-gradient-glass border-soft animate-pulse space-y-6 rounded-2xl border p-6">
      <div className="flex flex-col items-center space-y-3 text-center">
        <div className="h-20 w-20 rounded-full bg-white/10" />
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="h-3 w-24 rounded bg-white/5" />
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={`action-skeleton-${index}`} className="h-8 rounded-full bg-white/5" />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-4 w-24 rounded bg-white/10" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`product-skeleton-${index}`} className="h-10 rounded-lg bg-white/5" />
        ))}
      </div>

      <div className="space-y-3">
        <div className="h-4 w-16 rounded bg-white/10" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`chip-skeleton-${index}`} className="h-7 w-20 rounded-full bg-white/5" />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-4 w-28 rounded bg-white/10" />
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={`phrase-skeleton-${index}`} className="h-16 rounded-lg bg-white/5" />
        ))}
      </div>

      <div className="space-y-3">
        <div className="h-4 w-24 rounded bg-white/10" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={`action-row-skeleton-${index}`} className="h-12 rounded-lg bg-white/5" />
        ))}
      </div>
    </div>
  );
}
