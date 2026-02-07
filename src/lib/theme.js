import { createTheme } from "@mantine/core";

const customRed = [
  "#ffe9eb",
  "#fed2d5",
  "#f8a3a8",
  "#f37179",
  "#ee4751",
  "#ec2d37",
  "#ec1e2a",
  "#d6111e",
  "#bc0819",
  "#a50013",
];

export const theme = createTheme({
  fontFamily: "Quicksand, system-ui, -apple-system, sans-serif",
  headings: {
    fontFamily: "Quicksand, sans-serif",
    fontWeight: "500",
  },

  defaultRadius: "md",
  primaryColor: "indigo",

  colors: {
    red: customRed,
  },

  components: {
    Paper: {
      defaultProps: {
        withBorder: true,
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
          backgroundColor: "#12133b",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "var(--mantine-color-white)",
          "&::placeholder": {
            color: "var(--mantine-color-gray-5)",
          },
          "&:focus": {
            borderColor: "var(--mantine-color-indigo-4)",
          },
        },
      },
    },
  },
});
