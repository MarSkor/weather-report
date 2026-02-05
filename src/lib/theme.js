import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Quicksand, system-ui, -apple-system, sans-serif",
  headings: {
    fontFamily: "Quicksand, sans-serif",
    fontWeight: "500",
  },

  defaultRadius: "md",
  primaryColor: "indigo",

  components: {
    Paper: {
      defaultProps: {
        withBorder: true,
        shadow: "sm",
      },
    },
    Text: {
      defaultProps: {
        c: "gray.1",
      },
    },
    Input: {
      styles: {
        input: {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "var(--mantine-color-white)",
          "&::placeholder": {
            color: "var(--mantine-color-gray-5)",
            opacity: 0.8,
          },
          "&:focus": {
            borderColor: "var(--mantine-color-indigo-4)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
          },
        },
      },
    },
  },
});
