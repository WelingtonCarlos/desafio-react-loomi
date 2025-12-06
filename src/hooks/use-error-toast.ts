"use client";

import { useEffect } from "react";
import { toast } from "sonner";

interface UseErrorToastOptions {
  message: string;
  description?: string;
  toastId?: string;
}

export function useErrorToast(
  isError: boolean,
  { message, description, toastId }: UseErrorToastOptions,
) {
  useEffect(() => {
    if (!isError) return;

    toast.error(message, {
      description,
      id: toastId,
    });
  }, [isError, message, description, toastId]);
}
