"use client";

export function SkeletonChatMessages() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={`chat-msg-skeleton-${index}`}
          className="rounded-2xl border border-white/5 bg-[#0f1623]/60 p-4 animate-pulse"
        >
          <div className="flex justify-between text-sm text-gray-500">
            <span className="h-3 w-32 rounded bg-white/10" />
            <span className="h-3 w-10 rounded bg-white/10" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-4 w-3/4 rounded bg-white/10" />
            <div className="h-4 w-2/3 rounded bg-white/10" />
            <div className="h-4 w-1/2 rounded bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonChatSidebar() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#0f1623]/50 p-6 animate-pulse">
      <div className="h-4 w-32 rounded bg-white/10 mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={`sidebar-skeleton-${index}`} className="h-4 w-full rounded bg-white/10" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonChatInput() {
  return (
    <div className="mt-6 rounded-2xl border border-white/5 bg-[#0f1623]/50 p-4 animate-pulse">
      <div className="h-12 rounded-xl bg-white/10" />
    </div>
  );
}

