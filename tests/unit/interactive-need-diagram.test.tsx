import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InteractiveNeedDiagram } from "@/components/sections/interactive-need-diagram";

describe("InteractiveNeedDiagram", () => {
  it("updates the explanation and selected state for all six need paths", () => {
    render(<InteractiveNeedDiagram />);

    expect(
      screen.getByRole("heading", { name: "An idea becomes a product question" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "I'm not sure yet." })).toHaveAttribute(
      "aria-pressed",
      "false"
    );

    const cases = [
      ["I have an idea for a product or app.", "An idea becomes a product question"],
      ["We need a tool for our business.", "A business tool starts with the work"],
      ["Our website or online store needs work.", "A website is part of a visitor journey"],
      ["Too much of our work is manual or disconnected.", "Manual work reveals a handoff question"],
      ["Our existing software needs attention.", "Current software can have several paths"],
      ["I'm not sure yet.", "Start with what you know"]
    ];

    for (const [label, title] of cases) {
      const button = screen.getByRole("button", { name: label });
      expect(button).toHaveAttribute("type", "button");
      fireEvent.click(button);

      expect(button).toHaveAttribute("aria-pressed", "true");
      expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
      expect(document.querySelector("#need-map-title")?.textContent).toBe(
        `Illustrative map for: ${title}`
      );
    }
  });

  it("hydrates with the same deterministic initial SVG title", async () => {
    const markup = renderToString(<InteractiveNeedDiagram />);
    const container = document.createElement("div");
    container.innerHTML = markup;
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
    let root: ReturnType<typeof hydrateRoot> | undefined;

    try {
      await act(async () => {
        root = hydrateRoot(container, <InteractiveNeedDiagram />);
      });

      expect(container.querySelector("#need-map-title")?.textContent).toBe(
        "Illustrative map for: An idea becomes a product question"
      );
      expect(consoleError).not.toHaveBeenCalled();
    } finally {
      if (root) {
        await act(async () => root?.unmount());
      }
      consoleError.mockRestore();
    }
  });

  it("lets visitors revisit stages and move through the story controls", () => {
    render(<InteractiveNeedDiagram />);

    const stageTwo = screen.getByRole("button", { name: /What is involved/ });
    fireEvent.click(stageTwo);
    expect(stageTwo).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(/Stage 02 \/ 04/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous story stage" })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: "Next story stage" }));
    expect(screen.getByText(/Stage 03 \/ 04/)).toBeInTheDocument();
    expect(document.querySelector(".need-map-node.is-focused .need-map-label")?.textContent).toBe(
      "Possible tools"
    );

    fireEvent.click(screen.getByRole("button", { name: "Our existing software needs attention." }));
    expect(screen.getByText(/Stage 01 \/ 04/)).toBeInTheDocument();
    expect(document.querySelector(".need-map-node.is-focused .need-map-label")?.textContent).toBe(
      "Current system"
    );
  });
});
