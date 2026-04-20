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
          height: "44px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
          color: "#2b2b2b",
          fontSize: "15px",
          outline: "none",
          transition: "border-color 100ms ease, box-shadow 150ms ease",
          "& input": {
            padding: "10px 12px",
          },
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px #ffffff inset",
            WebkitTextFillColor: "#2b2b2b",
            caretColor: "#2b2b2b",
            borderRadius: "8px",
          },
          "& input::placeholder": {
            color: "#887b6a",
            opacity: 1,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: error ? "#f0797a" : "#e0e0e0",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: error ? "#f0797a" : "#cfcfcf",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ce1c1a",
            borderWidth: "1px",
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 3px rgba(206, 28, 26, 0.12)",
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
