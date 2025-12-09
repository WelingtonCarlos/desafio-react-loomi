"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ComponentProps, PropsWithChildren } from "react";
import { DialogContent } from "@/components/ui/dialog";

type MotionDialogContentProps = PropsWithChildren<
  ComponentProps<typeof DialogContent> & {
    open: boolean;
  }
>;

export function MotionDialogContent({ open, children, ...props }: MotionDialogContentProps) {
  return (
    <AnimatePresence>
      {open ? (
        <DialogContent {...props}>
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </DialogContent>
      ) : null}
    </AnimatePresence>
  );
}
