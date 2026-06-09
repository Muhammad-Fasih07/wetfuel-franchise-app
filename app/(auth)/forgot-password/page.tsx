"use client";

import { AppLink } from "../../../components/navigation/AppLink";
import { withGlobalLoading } from "../../../lib/loading/withGlobalLoading";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ArrowBack, CheckCircleOutline } from "@mui/icons-material";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCard } from "../../../components/ui/AuthCard";
import { BrandMark } from "../../../components/ui/BrandMark";
import { Button } from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import { sendResetLink } from "../../../lib/api/auth";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address."),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    const success = await withGlobalLoading(() =>
      sendResetLink(values.email),
    );
    if (success) {
      setSubmitted(true);
    }
  };

  return (
    <AuthCard>
      {!submitted ? (
        <>
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
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <AppLink
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--primary-brand)",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              <ArrowBack sx={{ fontSize: "16px" }} />
              Back to sign in
            </AppLink>
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
              Reset your password
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
              Enter your email and we&apos;ll send you a reset link.
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

              <Button type="submit" fullWidth loading={isSubmitting}>
                Send reset link
              </Button>
            </div>
          </form>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "16px",
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "8px",
              background: "var(--success-bg)",
              color: "var(--success-text)",
              marginBottom: "8px",
            }}
          >
            <CheckCircleOutline sx={{ fontSize: "36px" }} />
          </span>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: 600,
              margin: 0,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "var(--text-primary)",
            }}
          >
            Check your email
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "var(--text-secondary)",
              margin: 0,
              lineHeight: 1.5,
              maxWidth: "360px",
              fontWeight: 400,
            }}
          >
            If that address is registered, you&apos;ll receive a reset link shortly.
          </p>
          <AppLink
            href="/login"
            style={{
              color: "var(--primary-brand)",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              marginTop: "4px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ArrowBack sx={{ fontSize: "16px" }} />
            Back to sign in
          </AppLink>
        </div>
      )}
    </AuthCard>
  );
}
