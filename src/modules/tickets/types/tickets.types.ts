export interface TicketsResume {
    open: number;
    inProgress: number;
    solved: number;
    timeAverageHours: number;
}

export type TicketStatus = "Aberto" | "Em andamento" | "Fechado";
export type TicketPriority = "Urgente" | "Média" | "Baixa";

export interface TicketItem {
    id: string;
    priority: TicketPriority;
    client: string;
    email: string;
    subject: string;
    status: TicketStatus;
    createdAt: string;
    responsible: string;
}

export interface TicketsResponse {
    resumo: TicketsResume;
    status: TicketStatus[];
    priorities: TicketPriority[];
    tickets: TicketItem[];
}