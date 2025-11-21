import { render, screen, fireEvent } from "@testing-library/react";
import { OrderControl } from "..";
import { useState } from "react";
import type { SortOrder } from "../../types/rm.types";
import { describe, test, expect } from "vitest";

function Wrapper() {
  const [order, setOrder] = useState<SortOrder>("none");
  return <OrderControl sortOrder={order} onChange={setOrder} />;
}

describe("OrderControl", () => {
  test("toggles order correctly", () => {
    render(<Wrapper />);

    const button = screen.getByRole("button");

    // none → asc
    fireEvent.click(button);
    expect(button).toHaveTextContent("Ascending");

    // asc → desc
    fireEvent.click(button);
    expect(button).toHaveTextContent("Descending");

    // desc → none
    fireEvent.click(button);
    expect(button).toHaveTextContent("No order");
  });
});
