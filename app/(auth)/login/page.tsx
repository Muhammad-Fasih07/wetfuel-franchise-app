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
    await signIn({ email: values.email, password: values.password });
    // TODO: only redirect after a real successful auth response
    router.push("/");
  };

  return (
    <AuthCard>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <BrandMark align="center" />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "1.4px",
            textTransform: "uppercase",
            color: "#ce1c1a",
            padding: "4px 10px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, rgba(206,28,26,0.10) 0%, rgba(240,121,122,0.10) 100%)",
            border: "1px solid rgba(206,28,26,0.20)",
          }}
        >
          <span
            aria-hidden
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#ce1c1a",
              boxShadow: "0 0 8px rgba(206,28,26,0.6)",
            }}
          />
          Sign in
        </span>

        <h1
          style={{
            fontSize: "26px",
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-0.5px",
            background:
              "linear-gradient(135deg, #2b2b2b 0%, #2b2b2b 55%, #5a5a5a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
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
            lineHeight: 1.55,
            textAlign: "center",
            maxWidth: "320px",
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
                  sx={{ color: "#887b6a", "&:hover": { color: "#2b2b2b" } }}
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
                        color: "#887b6a",
                        "&.Mui-checked": { color: "#ce1c1a" },
                      }}
                    />
                  }
                  label="Remember me"
                  sx={{
                    marginRight: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      color: "#2b2b2b",
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
                fontWeight: 500,
                textDecoration: "none",
              }}
              className="hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" fullWidth loading={isSubmitting}>
            Sign in
          </Button>
        </div>
      </form>

      <div
        style={{
          marginTop: "24px",
          paddingTop: "16px",
          borderTop:
            "1px solid transparent",
          backgroundImage:
            "linear-gradient(#fff, #fff), linear-gradient(90deg, transparent 0%, #e5e5e5 50%, transparent 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            color: "#887b6a",
            textAlign: "center",
            margin: 0,
            letterSpacing: "0.1px",
          }}
        >
          Having trouble? Contact your WetFuel administrator.
        </p>
      </div>
    </AuthCard>
  );
}
