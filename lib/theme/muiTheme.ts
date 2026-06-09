import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#DC2626",
      dark: "#B91C1C",
    },
    error: {
      main: "#EF4444",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A1A1AA",
    },
    background: {
      default: "#09090B",
      paper: "#18181B",
    },
  },
  shape: {
    borderRadius: 6,
  },
  typography: {
    fontFamily: "var(--font-display)",
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          boxShadow: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#27272A",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#DC2626",
            borderWidth: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#DC2626",
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: "#18181B",
          border: "1px solid #27272A",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          "&:hover": {
            background: "#27272A",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "#71717A",
        },
      },
    },
  },
});
