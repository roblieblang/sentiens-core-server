import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
    coverage: {
      all: true,
      reporter: ["text", "json", "html"],
      provider: "istanbul",
    },
  },
});
