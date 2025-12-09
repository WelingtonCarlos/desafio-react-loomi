import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TicketsPage } from "@/modules/tickets/pages/tickets-page";
import { api } from "@/lib/api/http-client";
import { useTicketFiltersStore } from "@/lib/stores/ticket-filters-store";
import { useTicketModalStore } from "@/lib/stores/ticket-modal-store";
import * as ticketsService from "@/modules/tickets/services/tickets-service";
import type { TicketsResponse } from "@/modules/tickets/types/tickets.types";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: { defaultValue?: string; page?: number; total?: number }) =>
      options?.defaultValue ?? key,
  }),
}));

jest.mock("next/image", () => (props: { src: string; alt: string }) => {
  // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
  return <img {...props} />;
});

jest.mock("sonner", () => ({
  toast: {
    custom: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
    dismiss: jest.fn(),
  },
}));

jest.mock("@/lib/api/http-client", () => ({
  api: {
    get: jest.fn(),
  },
}));

const STORAGE_KEY = "tickets:data-clone";

const ticketsResponseFixture: TicketsResponse = {
  tickets: [
    {
      id: "TCK-001",
      client: "Cliente Alpha",
      email: "alpha@test.com",
      subject: "Erro no aplicativo",
      status: "Aberto",
      priority: "Urgente",
      responsible: "Ana",
      createdAt: "10/02/2024",
    },
    {
      id: "TCK-002",
      client: "Cliente Beta",
      email: "beta@test.com",
      subject: "Falha no pagamento",
      status: "Em andamento",
      priority: "Média",
      responsible: "Bruno",
      createdAt: "11/02/2024",
    },
  ],
  status: ["Aberto", "Em andamento", "Fechado"],
  priorities: ["Urgente", "Média", "Baixa"],
  resumo: {
    open: 1,
    inProgress: 1,
    solved: 0,
    timeAverageHours: 8,
  },
};

const apiGetMock = api.get as jest.MockedFunction<typeof api.get>;
let currentQueryClient: QueryClient | null = null;
let user: ReturnType<typeof userEvent.setup>;

const renderTicketsPage = async () => {
  currentQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={currentQueryClient}>
      <TicketsPage />
    </QueryClientProvider>,
  );

  await act(async () => {
    jest.advanceTimersByTime(1000);
  });

  await screen.findByText("Cliente Alpha");
};

const resetStores = () => {
  act(() => {
    useTicketFiltersStore.setState({
      search: "",
      status: "",
      priority: "",
      responsible: "",
    });

    useTicketModalStore.setState({
      isOpen: false,
      ticket: null,
    });
  });
};

beforeAll(() => {
  if (!global.crypto) {
    // @ts-ignore
    global.crypto = {};
  }
  if (!global.crypto.randomUUID) {
    // @ts-ignore
    global.crypto.randomUUID = () => "mock-uuid";
  }
});

beforeEach(() => {
  jest.useFakeTimers();
  user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
  });
  localStorage.clear();
  resetStores();
  apiGetMock.mockResolvedValue(ticketsResponseFixture);
});

afterEach(() => {
  cleanup();
  currentQueryClient?.clear();
  currentQueryClient = null;
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
});

describe("TicketsPage", () => {
  it("filtra tickets via busca e persiste clone no localStorage", async () => {
    await renderTicketsPage();

    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();

    const searchInput = screen.getByPlaceholderText("tickets:filters.searchPlaceholder");
    await user.type(searchInput, "Beta");

    await waitFor(() => {
      expect(screen.getByText("Cliente Beta")).toBeInTheDocument();
      expect(screen.queryByText("Cliente Alpha")).not.toBeInTheDocument();
    });
  });

  it("cria um novo ticket e mantém clone atualizado no localStorage", async () => {
    jest.setSystemTime(new Date("2024-01-01T12:00:00Z"));
    const createTicketSpy = jest.spyOn(ticketsService, "createTicket");

    await renderTicketsPage();

    await user.click(screen.getByRole("button", { name: /tickets:header.new/i }));

    const clientInput = await screen.findByPlaceholderText(
      "tickets:modal.fields.client.placeholder",
    );
    const emailInput = screen.getByPlaceholderText("tickets:modal.fields.email.placeholder");
    const subjectInput = screen.getByPlaceholderText(
      "tickets:modal.fields.subject.placeholder",
    );
    const responsibleInput = screen.getByPlaceholderText(
      "tickets:modal.fields.responsible.placeholder",
    );

    await user.type(clientInput, "Cliente Novo");
    await user.type(emailInput, "novo@test.com");
    await user.type(subjectInput, "Configurar acesso ao portal");
    await user.type(responsibleInput, "Carlos");

    await user.click(screen.getByRole("button", { name: /tickets:modal.buttons.save/i }));

    await waitFor(() => {
      expect(createTicketSpy).toHaveBeenCalled();
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    expect(stored.tickets[0].client).toBe("Cliente Novo");
    expect(stored.tickets[0].priority).toBe("Média");
    expect(stored.tickets[0].status).toBe("Aberto");
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(await screen.findByText("Cliente Novo")).toBeInTheDocument();
  });

  it("edita um ticket existente e atualiza o clone persistido", async () => {
    const updateTicketSpy = jest.spyOn(ticketsService, "updateTicket");

    await renderTicketsPage();

    const editButtons = screen.getAllByRole("button", { name: /columns\.edit/i });
    await user.click(editButtons[0]);

    const subjectInput = await screen.findByPlaceholderText(
      "tickets:modal.fields.subject.placeholder",
    );
    const responsibleInput = screen.getByPlaceholderText(
      "tickets:modal.fields.responsible.placeholder",
    );

    await user.clear(subjectInput);
    await user.type(subjectInput, "Erro atualizado no aplicativo");
    await user.clear(responsibleInput);
    await user.type(responsibleInput, "Daniela");

    await user.click(screen.getByRole("button", { name: /tickets:modal.buttons.saveChanges/i }));

    await waitFor(() => {
      expect(updateTicketSpy).toHaveBeenCalledWith({
        id: "TCK-001",
        data: expect.objectContaining({
          subject: "Erro atualizado no aplicativo",
          responsible: "Daniela",
        }),
      });
    });

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const updatedTicket = stored.tickets.find((ticket: { id: string }) => ticket.id === "TCK-001");
    expect(updatedTicket.subject).toBe("Erro atualizado no aplicativo");
    expect(updatedTicket.responsible).toBe("Daniela");
  });
});
