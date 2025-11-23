export function SkeletonIncludedBenefits() {
  return (
    <div className="bg-linear-to-br from-[#28335098] via-[#28335098 ]/60 to-[#28335098 ]/10 border border-white/5 rounded-3xl p-8">
      <div className="animate-pulse space-y-6">
        <div className="h-6 w-48 rounded bg-white/10" />
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`benefit-skeleton-${index}`}
              className="h-10 w-32 rounded-full border border-white/10 bg-white/5"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonPlansIndicators() {
  return (
    <div className="bg-linear-to-br from-[#28335098] via-[#28335098 ]/60 to-[#28335098 ]/10 border border-white/5 rounded-3xl p-8">
      <div className="animate-pulse space-y-6">
        <div className="h-6 w-40 rounded bg-white/10" />
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`indicator-skeleton-${index}`}
            className="rounded-2xl border border-white/10 bg-[#1a2332] p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="h-4 w-32 rounded bg-white/10" />
              <span className="h-5 w-20 rounded bg-white/10" />
            </div>
            <div className="flex gap-6">
              <span className="h-3 w-24 rounded bg-white/10" />
              <span className="h-3 w-16 rounded bg-white/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
