// ./test-utils/render.tsx
import { render as testingLibraryRender } from "@testing-library/react";
import { createTheme, MantineProvider } from "@mantine/core";
import React from "react";

const palaViajerosTheme = createTheme({
  primaryColor: "red",
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
});

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={palaViajerosTheme}>{children}</MantineProvider>
    ),
  });
}
