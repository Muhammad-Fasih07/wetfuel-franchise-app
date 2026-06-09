"use client";

import { AppLink } from "../../../components/navigation/AppLink";
import { useAppRouter } from "../../../lib/hooks/useAppRouter";
import { withGlobalLoading } from "../../../lib/loading/withGlobalLoading";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Checkbox,
  IconButton,
  InputAdornment,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCard } from "../../../components/ui/AuthCard";
import { BrandMark } from "../../../components/ui/BrandMark";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { signIn } from "../../../lib/api/auth";

/** Demo login — remove or replace when real auth is wired. */
const HARDCODED_EMAIL = "test@test.com";
const HARDCODED_PASSWORD = "test1234";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useAppRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: LoginFormValues) => {
    clearErrors("root");
    const emailOk =
      values.email.trim().toLowerCase() === HARDCODED_EMAIL.toLowerCase();
    const passOk = values.password === HARDCODED_PASSWORD;
    if (!emailOk || !passOk) {
      setError("root", {
        type: "manual",
        message: "Invalid email or password.",
      });
      return;
    }

    try {
      await withGlobalLoading(async () => {
        await signIn({ email: values.email, password: values.password });
        document.cookie = "auth-token=authenticated; path=/; max-age=86400";
      });

      const urlParams = new URLSearchParams(window.location.search);
      const from = urlParams.get("from") || "/";
      router.push(from);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthCard>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "24px",
        }}
      >
        <BrandMark align="center" />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          marginBottom: "32px",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 600,
            margin: 0,
            letterSpacing: "-0.02em",
            textAlign: "center",
            lineHeight: 1.2,
            color: "var(--text-primary)",
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            margin: 0,
            lineHeight: 1.5,
            textAlign: "center",
            maxWidth: "340px",
            fontWeight: 400,
          }}
        >
          Sign in to your franchise account to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Input
            name="email"
            label="Email address"
            type="email"
            register={register("email")}
            error={errors.email?.message}
          />

          <Input
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            register={register("password")}
            error={errors.password?.message}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  aria-label="Toggle password visibility"
                  edge="end"
                  tabIndex={-1}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setShowPassword((prev) => !prev)}
                  sx={{
                    color: "var(--text-muted)",
                    "&:hover": {
                      color: "var(--primary-brand)",
                      backgroundColor: "var(--bg-surface-hover)",
                    },
                    transition: "color var(--transition-fast)",
                  }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "8px",
              marginTop: "4px",
            }}
          >
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={Boolean(field.value)}
                      onChange={(event) => field.onChange(event.target.checked)}
                      onBlur={field.onBlur}
                      inputRef={field.ref}
                      sx={{
                        color: "var(--text-muted)",
                        "&.Mui-checked": { color: "var(--primary-brand)" },
                        "&:hover": { backgroundColor: "var(--bg-surface-hover)" },
                      }}
                    />
                  }
                  label="Remember me"
                  sx={{
                    marginRight: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      color: "var(--text-secondary)",
                      fontWeight: 400,
                    },
                  }}
                />
              )}
            />

            <AppLink
              href="/forgot-password"
              style={{
                color: "var(--primary-brand)",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Forgot password?
            </AppLink>
          </div>

          {errors.root?.message ? (
            <p
              role="alert"
              style={{
                margin: 0,
                fontSize: "14px",
                color: "var(--error-text)",
                fontWeight: 400,
              }}
            >
              {errors.root.message}
            </p>
          ) : null}

          <Button type="submit" fullWidth loading={isSubmitting}>
            Sign in
          </Button>
        </div>
      </form>

      <div
        style={{
          marginTop: "24px",
          paddingTop: "16px",
          borderTop: "1px solid var(--border-subtle)",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-muted)",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Having trouble? Contact your WetFuel administrator.
        </p>
      </div>
    </AuthCard>
  );
}
