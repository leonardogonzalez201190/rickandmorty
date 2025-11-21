import { renderHook, waitFor } from "@testing-library/react";
import { describe, beforeEach, test, expect, vi } from "vitest";
import { useRMList } from "../useRMList";

// Mock the global fetch
const mockFetch = vi.fn();
(globalThis as any).fetch = mockFetch;

describe("useRMList", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("fetches characters and updates state", async () => {
    // Mock API response
    const mockData = {
      info: { count: 2, pages: 1, next: null, prev: null },
      results: [
        { id: 1, name: "Rick Sanchez" },
        { id: 2, name: "Morty Smith" }
      ],
    };

    // Mock fetch implementation
    (globalThis.fetch as any) = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { result } = renderHook(() => useRMList());

    // Initial: loading should be true
    expect(result.current.loading).toBe(true);

    // Wait for fetch to complete
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Final state checks
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.characters.length).toBe(2);

    // Data must match
    expect(result.current.characters[0].name).toBe("Rick Sanchez");
    expect(result.current.info?.count).toBe(2);

    // Fetch should have been called once
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });
});
