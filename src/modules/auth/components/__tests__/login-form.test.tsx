import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "@/modules/auth/components/login-form";

const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => "/dashboard" }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("../../hooks/useLogin", () => ({
  useLogin: jest.fn(),
}));

const { useLogin } = jest.requireMock("../../hooks/useLogin");
const { toast } = jest.requireMock("sonner");

const mockLogin = jest.fn();

describe("LoginForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    useLogin.mockReturnValue({ login: mockLogin, isLoading: false });
  });

  it("exibe campos e botão", () => {
    render(<LoginForm />);

    expect(screen.getByPlaceholderText("form.emailPlaceholder")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("form.passwordPlaceholder")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /form.submit/i })).toBeInTheDocument();
  });

  it("realiza login com sucesso e redireciona", async () => {
    mockLogin.mockResolvedValue({ success: true, message: "ok" });

    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText("form.emailPlaceholder"), "user@test.com");
    await userEvent.type(screen.getByPlaceholderText("form.passwordPlaceholder"), "123456");

    await userEvent.click(screen.getByRole("button", { name: /form.submit/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        username: "user@test.com",
        password: "123456",
        rememberMe: false,
      });
      expect(toast.success).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("mostra erro quando login falha", async () => {
    mockLogin.mockResolvedValue({ success: false, message: "erro" });

    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText("form.emailPlaceholder"), "user@test.com");
    await userEvent.type(screen.getByPlaceholderText("form.passwordPlaceholder"), "123456");
    await userEvent.click(screen.getByRole("button", { name: /form.submit/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalled();
      expect(mockPush).not.toHaveBeenCalled();
    });
  });
});
