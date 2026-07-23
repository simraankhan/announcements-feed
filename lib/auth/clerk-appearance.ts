import { ClerkAppearanceTheme } from "@clerk/nextjs/types";
import { dark } from "@clerk/ui/themes";

export const clerkAppearance: ClerkAppearanceTheme = {
  theme: dark,
  variables: {
    colorBackground: "var(--background)",
    colorPrimary: "var(--primary)",
    colorDanger: "var(--state-error)",
    colorSuccess: "var(--state-success)",
    borderRadius: "var(--radius)",
    fontFamily: "var(--font-montserrat)",
    colorMuted: "var(--muted)",
    colorMutedForeground: "var(--muted-foreground)",
    colorPrimaryForeground: "var(--primary-foreground)",
  },
};
