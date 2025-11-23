"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TICKET_PRIORITY_VALUES,
  TICKET_STATUS_VALUES,
  ticketFormSchema,
  type TicketFormValues,
} from "../schemas/ticket-form-schema";
import type {
  TicketItem,
  TicketPriority,
  TicketStatus,
} from "../types/tickets.types";
import { createTicket, updateTicket } from "../services/tickets-service";
import { useInvalidateTicketsQueries } from "../hooks/useTicketsData";
import { useTranslation } from "react-i18next";

interface NewTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket?: TicketItem | null;
}

function NewTicketModal({ open, onOpenChange, ticket }: NewTicketModalProps) {
  const { t } = useTranslation(["tickets", "common"]);

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

  function closeAndReset() {
    reset();
  }

  const handleDialogChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      closeAndReset();
    }
    onOpenChange(nextOpen);
  };

  const onSubmit = async (values: TicketFormValues) => {
    if (ticket) {
      updateTicket({
        id: ticket.id,
        data: values,
      });
    } else {
      createTicket(values);
    }

    invalidateTickets();
    closeAndReset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent
        className="bg-[#0f1623] border-[#1f2937] text-white sm:max-w-[600px] p-0 gap-0 overflow-hidden"
        showCloseButton={false}
      >
        <DialogHeader className="p-6 pb-4 border-b border-[#1f2937] flex flex-row items-start justify-between space-y-0">
          <div className="space-y-1">
            <DialogTitle className="text-xl font-medium">
              {isEditing
                ? t("tickets:modal.editTitle")
                : t("tickets:modal.newTitle")}
            </DialogTitle>
            <DialogDescription className="text-gray-400 text-sm">
              {isEditing
                ? t("tickets:modal.editDescription")
                : t("tickets:modal.newDescription")}
            </DialogDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border cursor-pointer border-[#2d3748] hover:bg-[#1f2937] text-gray-400 h-8 w-8"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 2xl:grid-cols-1 gap-6 space-y-0">
              <div className="space-y-2">
                <Label
                  htmlFor="client-name"
                  className="text-sm font-medium text-gray-200"
                >
                  {t("tickets:modal.fields.client.label")}
                </Label>
                <Input
                  id="client-name"
                  placeholder={t("tickets:modal.fields.client.placeholder")}
                  className="bg-[#151b26] border-[#1f2937] placeholder:text-gray-500 text-gray-200 h-11"
                  {...register("client")}
                />
                {errors.client && (
                  <p className="text-xs text-red-400">
                    {errors.client.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-200"
                >
                  {t("tickets:modal.fields.email.label")}
                </Label>
                <Input
                  id="email"
                  placeholder={t("tickets:modal.fields.email.placeholder")}
                  className="bg-[#151b26] border-[#1f2937] placeholder:text-gray-500 text-gray-200 h-11"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2 w-full">
                <Label
                  htmlFor="priority"
                  className="text-sm font-medium text-gray-200"
                >
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
                  <SelectTrigger className="bg-[#151b26] border-[#1f2937] text-gray-500 h-11 w-full">
                    <SelectValue
                      placeholder={t(
                        "tickets:modal.fields.priority.placeholder"
                      )}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-[#151b26] border-[#1f2937] text-gray-200 w-full">
                    {TICKET_PRIORITY_VALUES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.priority && (
                  <p className="text-xs text-red-400">
                    {errors.priority.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="assignee"
                  className="text-sm font-medium text-gray-200"
                >
                  {t("tickets:modal.fields.responsible.label")}
                </Label>
                <Input
                  id="assignee"
                  placeholder={t(
                    "tickets:modal.fields.responsible.placeholder"
                  )}
                  className="bg-[#151b26] border-[#1f2937] placeholder:text-gray-500 text-gray-200 h-11"
                  {...register("responsible")}
                />
                {errors.responsible && (
                  <p className="text-xs text-red-400">
                    {errors.responsible.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-200"
                >
                  {t("tickets:modal.fields.subject.label")}
                </Label>
                <Textarea
                  id="subject"
                  placeholder={t("tickets:modal.fields.subject.placeholder")}
                  className="bg-[#151b26] border-[#1f2937] placeholder:text-gray-500 text-gray-200 min-h-[100px] resize-none"
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-xs text-red-400">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-200"
                >
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
                  <SelectTrigger className="bg-[#151b26] border-[#1f2937] text-gray-500 h-11 w-full">
                    <SelectValue placeholder={t("tickets:modal.fields.status.placeholder")} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#151b26] border-[#1f2937] text-gray-200 w-full">
                    {TICKET_STATUS_VALUES.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && (
                  <p className="text-xs text-red-400">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 pt-0 flex justify-end gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleDialogChange(false)}
              className="bg-transparent border-[#2d3748] cursor-pointer text-white hover:bg-[#1f2937] hover:text-white px-6"
            >
              {t("tickets:modal.buttons.cancel")}
            </Button>
            <Button
              type="submit"
              className="bg-[#1E86FF] cursor-pointer hover:bg-[#1E86FF]/90 text-white px-6"
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
