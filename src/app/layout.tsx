import type { Metadata } from "next";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import "./styles/globals.scss";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  ColorSchemeScript,
  Container,
  createTheme,
  MantineProvider
} from "@mantine/core";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Notifications } from "@mantine/notifications";
import SoftLaunchBanner from "./components/SoftLaunchBanner/SoftLaunchBanner";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Palaviajeros Travel Corp.",
  description: "Your viajero travel buddy",
  keywords:
    "travel, travel agency, philippines, leisure, packages, flights, itineraries"
};
// palaviajeros logo color: #ff4c5c Todo: to add later
const palaViajerosTheme = createTheme({
  primaryColor: "red",
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em"
  }
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={palaViajerosTheme}>
          <Notifications />
          <AppShell header={{ height: { base: 60 } }}>
            <AppShellHeader>
              <Navbar />
            </AppShellHeader>
            <AppShellMain>
              <Container
                size="xl"
                p={{ base: "50px 30px", sm: "50px", lg: "100px 70px" }}
              >
                {children}
              </Container>
              <Footer />
            </AppShellMain>
          </AppShell>
          <SoftLaunchBanner />
        </MantineProvider>
      </body>
      <GoogleAnalytics gaId="G-N1BV0K9S6V" />
    </html>
  );
}
