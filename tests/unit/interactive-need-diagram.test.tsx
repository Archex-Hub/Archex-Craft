import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { InteractiveNeedDiagram } from "@/components/sections/interactive-need-diagram";

describe("InteractiveNeedDiagram", () => {
  it("starts from the first need and updates the explanation and diagram on selection", () => {
    render(<InteractiveNeedDiagram />);

    expect(screen.getByRole("heading", { name: "An idea becomes a product question" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "I'm not sure yet." })).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(screen.getByRole("button", { name: "Our existing software needs attention." }));

    expect(screen.getByRole("heading", { name: "Current software can have several paths" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Our existing software needs attention." })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("img", { name: /Illustrative map for: Current software can have several paths/ })).toBeInTheDocument();
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
});
