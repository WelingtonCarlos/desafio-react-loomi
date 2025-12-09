import { render, screen } from "@testing-library/react";
import { Badge } from "@/components";

describe("Badge", () => {
  it("renderiza o texto passado como children", () => {
    render(<Badge>Teste</Badge>);
    expect(screen.getByText("Teste")).toBeInTheDocument();
  });

  it("aplica classes diferentes para cada variant", () => {
    const { rerender } = render(<Badge variant="highlightSoft">Highlight</Badge>);
    expect(screen.getByText("Highlight")).toHaveClass("bg-highlight-soft-bg");

    rerender(<Badge variant="chatTag">Tag</Badge>);
    expect(screen.getByText("Tag")).toHaveClass("bg-brand-name");
  });
});
