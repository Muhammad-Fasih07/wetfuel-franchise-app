"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
      await signIn({ email: values.email, password: values.password });
      
      // Set authentication cookie (temporary until real API is connected)
      document.cookie = "auth-token=authenticated; path=/; max-age=86400"; // 24 hours
      
      // Redirect to dashboard or the original requested page
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
        className="animate-slide-up"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          marginBottom: "32px",
          animationDelay: "0.1s",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: "#ce1c1a",
            padding: "5px 12px",
            borderRadius: "24px",
            background:
              "linear-gradient(135deg, rgba(206,28,26,0.12) 0%, rgba(240,121,122,0.12) 100%)",
            border: "1px solid rgba(206,28,26,0.25)",
            boxShadow: "0 2px 8px rgba(206,28,26,0.1), inset 0 1px 0 rgba(255,255,255,0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          <span
            aria-hidden
            className="animate-glow"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#ce1c1a",
              boxShadow: "0 0 10px rgba(206,28,26,0.7), 0 0 4px rgba(206,28,26,0.5)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          Sign in
        </span>

        <h1
          className="text-gradient-primary"
          style={{
            fontSize: "30px",
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-0.8px",
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#887b6a",
            margin: 0,
            lineHeight: 1.6,
            textAlign: "center",
            maxWidth: "340px",
            fontWeight: 400,
          }}
        >
          Sign in to your franchise account to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div 
          className="animate-slide-up"
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "18px",
            animationDelay: "0.2s",
          }}
        >
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
                    color: "#887b6a", 
                    "&:hover": { 
                      color: "#ce1c1a",
                      backgroundColor: "rgba(206,28,26,0.05)",
                    },
                    transition: "all 200ms ease",
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
                        color: "#d0d0d0",
                        "&.Mui-checked": { 
                          color: "#ce1c1a",
                        },
                        "&:hover": {
                          backgroundColor: "rgba(206,28,26,0.04)",
                        },
                        transition: "all 200ms ease",
                      }}
                    />
                  }
                  label="Remember me"
                  sx={{
                    marginRight: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      color: "#2b2b2b",
                      fontWeight: 500,
                    },
                  }}
                />
              )}
            />

            <Link
              href="/forgot-password"
              style={{
                color: "#ce1c1a",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 200ms ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#bf2524";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#ce1c1a";
              }}
            >
              Forgot password?
            </Link>
          </div>

          {errors.root?.message ? (
            <p
              role="alert"
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#ce1c1a",
                fontWeight: 500,
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
        className="animate-fade-in"
        style={{
          marginTop: "28px",
          paddingTop: "20px",
          borderTop:
            "1px solid transparent",
          backgroundImage:
            "linear-gradient(#fff, #fff), linear-gradient(90deg, transparent 0%, #e5e5e5 50%, transparent 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
          animationDelay: "0.4s",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#887b6a",
            textAlign: "center",
            margin: 0,
            letterSpacing: "0.2px",
            lineHeight: 1.5,
          }}
        >
          Having trouble? Contact your WetFuel administrator.
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.95);
          }
        }
      `}</style>
    </AuthCard>
  );
}
