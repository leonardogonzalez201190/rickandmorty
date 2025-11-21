// Enable jest-dom matchers (toBeInTheDocument, toHaveAttribute, etc.)
import "@testing-library/jest-dom";

// Optional: clean up the DOM after each test
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
