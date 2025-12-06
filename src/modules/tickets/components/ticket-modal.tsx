"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTicketModalStore } from "@/lib/stores/ticket-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useInvalidateTicketsQueries } from "../hooks/useTicketsData";
import {
  TICKET_PRIORITY_VALUES,
  TICKET_STATUS_VALUES,
  ticketFormSchema,
  type TicketFormValues,
} from "../schemas/ticket-form-schema";
import { createTicket, updateTicket } from "../services/tickets-service";
import type { TicketPriority, TicketStatus } from "../types/tickets.types";

function NewTicketModal() {
  const { t } = useTranslation(["tickets", "common"]);

  const ticket = useTicketModalStore((state) => state.ticket);
  const isOpen = useTicketModalStore((state) => state.isOpen);
  const setModalOpen = useTicketModalStore((state) => state.setOpen);

  const invalidateTickets = useInvalidateTicketsQueries();
  const isEditing = Boolean(ticket);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      status: "Aberto",
      priority: "Média",
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedPriority = watch("priority");
  const selectedStatus = watch("status");

  useEffect(() => {
    if (ticket) {
      reset({
        client: ticket.client,
        email: ticket.email,
        subject: ticket.subject,
        status: ticket.status,
        priority: ticket.priority,
        responsible: ticket.responsible,
      });
      return;
    }

    reset({
      client: "",
      email: "",
      subject: "",
      status: "Aberto",
      priority: "Média",
      responsible: "",
    });
  }, [ticket, reset]);

  const closeAndReset = useCallback(() => {
    reset();
  }, [reset]);

  const handleDialogChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        closeAndReset();
      }
      setModalOpen(nextOpen);
    },
    [closeAndReset, setModalOpen],
  );

  const showTicketCreatedToast = useCallback(() => {
    toast.custom((toastId) => (
      <div className="border-soft bg-brand text-brand-foreground shadow-brand flex w-[380px] items-start gap-3 rounded-2xl border p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/20">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">{t("tickets:toast.createTitle")}</p>
          <p className="text-xs text-white/90">{t("tickets:toast.createDescription")}</p>
        </div>
        <button
          type="button"
          onClick={() => toast.dismiss(toastId)}
          className="text-white/80 transition hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    ));
  }, [t]);

  const onSubmit = useCallback(
    async (values: TicketFormValues) => {
      if (ticket) {
        updateTicket({
          id: ticket.id,
          data: values,
        });
      } else {
        createTicket(values);
        showTicketCreatedToast();
      }

      invalidateTickets();
      closeAndReset();
      setModalOpen(false);
    },
    [ticket, invalidateTickets, closeAndReset, setModalOpen, showTicketCreatedToast],
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent
        className="bg-surface-panel border-panel text-foreground gap-0 overflow-hidden border p-0 sm:max-w-[600px]"
        showCloseButton={false}
      >
        <DialogHeader className="border-panel flex flex-row items-start justify-between space-y-0 border-b p-6 pb-4">
          <div className="space-y-1">
            <DialogTitle className="text-xl font-medium">
              {isEditing ? t("tickets:modal.editTitle") : t("tickets:modal.newTitle")}
            </DialogTitle>
            <DialogDescription className="text-muted-soft text-sm">
              {isEditing ? t("tickets:modal.editDescription") : t("tickets:modal.newDescription")}
            </DialogDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="border-panel hover:bg-surface-contrast text-muted-soft h-8 w-8 cursor-pointer rounded-full border"
            onClick={() => handleDialogChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-6 space-y-0 2xl:grid-cols-1">
              <div className="space-y-2">
                <Label htmlFor="client-name" className="text-foreground text-sm font-medium">
                  {t("tickets:modal.fields.client.label")}
                </Label>
                <Input
                  id="client-name"
                  placeholder={t("tickets:modal.fields.client.placeholder")}
                  className="bg-surface-contrast border-panel placeholder-muted text-foreground h-11 border"
                  {...register("client")}
                />
                {errors.client && <p className="text-xs text-red-400">{errors.client.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground text-sm font-medium">
                  {t("tickets:modal.fields.email.label")}
                </Label>
                <Input
                  id="email"
                  placeholder={t("tickets:modal.fields.email.placeholder")}
                  className="bg-surface-contrast border-panel placeholder-muted text-foreground h-11 border"
                  {...register("email")}
                />
                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="priority" className="text-foreground text-sm font-medium">
                  {t("tickets:modal.fields.priority.label")}
                </Label>
                <Select
                  value={selectedPriority}
                  onValueChange={(value) =>
                    setValue("priority", value as TicketPriority, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className="bg-surface-contrast border-panel text-muted-soft h-11 w-full border">
                    <SelectValue placeholder={t("tickets:modal.fields.priority.placeholder")} />
                  </SelectTrigger>
                  <SelectContent className="bg-surface-contrast border-panel text-foreground w-full border">
                    {TICKET_PRIORITY_VALUES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.priority && (
                  <p className="text-xs text-red-400">{errors.priority.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignee" className="text-foreground text-sm font-medium">
                  {t("tickets:modal.fields.responsible.label")}
                </Label>
                <Input
                  id="assignee"
                  placeholder={t("tickets:modal.fields.responsible.placeholder")}
                  className="bg-surface-contrast border-panel placeholder-muted text-foreground h-11 border"
                  {...register("responsible")}
                />
                {errors.responsible && (
                  <p className="text-xs text-red-400">{errors.responsible.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-foreground text-sm font-medium">
                  {t("tickets:modal.fields.subject.label")}
                </Label>
                <Textarea
                  id="subject"
                  placeholder={t("tickets:modal.fields.subject.placeholder")}
                  className="bg-surface-contrast border-panel placeholder-muted text-foreground min-h-[100px] resize-none border"
                  {...register("subject")}
                />
                {errors.subject && <p className="text-xs text-red-400">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-foreground text-sm font-medium">
                  {t("tickets:modal.fields.status.label")}
                </Label>
                <Select
                  value={selectedStatus}
                  onValueChange={(value) =>
                    setValue("status", value as TicketStatus, {
                      shouldValidate: true,
                    })
                  }
                >
                  <SelectTrigger className="bg-surface-contrast border-panel text-muted-soft h-11 w-full border">
                    <SelectValue placeholder={t("tickets:modal.fields.status.placeholder")} />
                  </SelectTrigger>
                  <SelectContent className="bg-surface-contrast border-panel text-foreground w-full border">
                    {TICKET_STATUS_VALUES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-xs text-red-400">{errors.status.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-6 pt-0">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleDialogChange(false)}
              className="border-panel text-foreground hover:bg-surface-contrast cursor-pointer border bg-transparent px-6"
            >
              {t("tickets:modal.buttons.cancel")}
            </Button>
            <Button
              type="submit"
              className="bg-brand text-brand-foreground hover:bg-brand-strong shadow-brand cursor-pointer px-6"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t("tickets:modal.buttons.saving")
                : isEditing
                  ? t("tickets:modal.buttons.saveChanges")
                  : t("tickets:modal.buttons.save")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { NewTicketModal };
