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
          color: "var(--error-text)",
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
          borderRadius: "6px",
          backgroundColor: "var(--bg-surface)",
          color: "var(--text-primary)",
          fontSize: "14px",
          outline: "none",
          transition: "border-color var(--transition-fast)",
          "& input": {
            padding: "10px 14px",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #18181B inset",
            WebkitTextFillColor: "#ffffff",
            caretColor: "var(--primary-brand)",
            borderRadius: "6px",
          },
          "& input::placeholder": {
            color: "var(--text-muted)",
            opacity: 1,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: error ? "var(--error-text)" : "var(--border-subtle)",
            borderWidth: "1px",
            transition: "border-color var(--transition-fast)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: error ? "var(--error-text)" : "var(--border-focus)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: error ? "var(--error-text)" : "var(--primary-brand)",
            borderWidth: "1px",
          },
          "&.Mui-focused": {
            boxShadow: "none",
          },
        },
      }}
      InputLabelProps={{
        shrink: true,
        sx: {
          fontSize: "14px",
          fontWeight: 500,
          color: "var(--text-secondary)",
          backgroundColor: "transparent",
          "&.Mui-focused": {
            color: "var(--primary-brand)",
          },
          "&.Mui-error": {
            color: "var(--error-text)",
          },
        },
      }}
    />
  );
}
