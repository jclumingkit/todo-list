import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export const metadata = {
  title: "Todo List",
  description:
    "Creating a simple todo list with Supabase Auth and Nextjs App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* adding defaultColorScheme will remove theme (dark/light) "flashing" on browser reload */}
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          {" "}
          <Notifications />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
