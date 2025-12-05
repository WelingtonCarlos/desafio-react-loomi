import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorStateProps {
  title?: string
  description?: string
  retryLabel?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = "Não foi possível carregar os dados.",
  description = "Verifique sua conexão e tente novamente em instantes.",
  retryLabel = "Tentar novamente",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-center",
        className
      )}
    >
      <AlertCircle className="h-10 w-10 text-destructive" aria-hidden />
      <div className="space-y-1">
        <p className="text-base font-semibold text-foreground">{title}</p>
        {description ? (
          <p className="text-sm text-muted-soft">{description}</p>
        ) : null}
      </div>
      {onRetry ? (
        <Button
          variant="outline"
          className="border-destructive/40 text-foreground hover:bg-destructive/10"
          onClick={onRetry}
        >
          {retryLabel}
        </Button>
      ) : null}
    </div>
  )
}


