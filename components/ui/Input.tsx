import type { ReactNode } from "react";
import { TextField } from "@mui/material";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  register?: any;
  endAdornment?: ReactNode;
  fullWidth?: boolean;
}

export function Input({
  name,
  label,
  type = "text",
  placeholder,
  error,
  register,
  endAdornment,
  fullWidth = true,
}: InputProps) {
  return (
    <TextField
      name={name}
      label={label}
      type={type}
      placeholder={placeholder ?? " "}
      fullWidth={fullWidth}
      variant="outlined"
      error={Boolean(error)}
      helperText={error}
      onBlur={register?.onBlur}
      onChange={register?.onChange}
      inputRef={register?.ref}
      FormHelperTextProps={{
        sx: {
          color: "#f0797a",
          fontSize: "13px",
          marginTop: "6px",
          marginLeft: 0,
        },
      }}
      InputProps={{
        endAdornment,
        notched: true,
        sx: {
          height: "46px",
          borderRadius: "10px",
          backgroundColor: "#ffffff",
          color: "#2b2b2b",
          fontSize: "15px",
          outline: "none",
          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          "& input": {
            padding: "10px 14px",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #ffffff inset",
            WebkitTextFillColor: "#2b2b2b",
            caretColor: "#ce1c1a",
            borderRadius: "10px",
          },
          "& input::placeholder": {
            color: "#887b6a",
            opacity: 0.7,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: error ? "#f0797a" : "#e5e5e5",
            borderWidth: "1.5px",
            transition: "all 200ms ease",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: error ? "#f0797a" : "#d0d0d0",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ce1c1a",
            borderWidth: "1.5px",
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 4px rgba(206, 28, 26, 0.1), 0 4px 12px rgba(206, 28, 26, 0.08)",
            transform: "translateY(-1px)",
          },
          "&.Mui-error.Mui-focused": {
            boxShadow: "0 0 0 4px rgba(240, 121, 122, 0.15), 0 4px 12px rgba(240, 121, 122, 0.12)",
          },
        },
      }}
      InputLabelProps={{
        shrink: true,
        sx: {
          fontSize: "14px",
          fontWeight: 500,
          color: "#2b2b2b",
          backgroundColor: "transparent",
          "&.Mui-focused": {
            color: "#ce1c1a",
          },
          "&.Mui-error": {
            color: "#f0797a",
          },
        },
      }}
    />
  );
}
