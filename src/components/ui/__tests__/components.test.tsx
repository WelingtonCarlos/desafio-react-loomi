import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light" }),
}));

describe("UI components", () => {
  it("renderiza Button com texto", () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
  });

  it("renderiza Checkbox marcado", () => {
    render(<Checkbox aria-label="Aceito" defaultChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("renderiza Dialog aberto", () => {
    render(
      <Dialog open onOpenChange={() => {}}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Título</DialogTitle>
            <DialogDescription>Descrição</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.getByText("Título")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();
  });

  it("renderiza InputGroup com addon", () => {
    render(
      <InputGroup>
        <InputGroupInput placeholder="Pesquisar" aria-label="Pesquisar" />
        <InputGroupAddon>R$</InputGroupAddon>
      </InputGroup>,
    );
    expect(screen.getByPlaceholderText("Pesquisar")).toBeInTheDocument();
    expect(screen.getByText("R$")).toBeInTheDocument();
  });

  it("renderiza Input", () => {
    render(<Input placeholder="Nome" />);
    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
  });

  it("renderiza Label associada", () => {
    render(
      <>
        <Label htmlFor="campo">Campo</Label>
        <Input id="campo" />
      </>,
    );
    expect(screen.getByLabelText("Campo")).toBeInTheDocument();
  });

  it("renderiza Progress", () => {
    render(<Progress value={40} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renderiza Select com placeholder", () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="opcao">Opção</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(screen.getByText("Selecione")).toBeInTheDocument();
  });

  it("renderiza Slider", () => {
    render(<Slider defaultValue={[30]} min={0} max={100} aria-label="volume" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  it("renderiza Toaster", () => {
    render(<Toaster />);
    expect(() => render(<Toaster />)).not.toThrow();
  });

  it("renderiza Textarea", () => {
    render(<Textarea placeholder="Mensagem" />);
    expect(screen.getByPlaceholderText("Mensagem")).toBeInTheDocument();
  });
});
