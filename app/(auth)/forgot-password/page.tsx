"use client";

import Link from "next/link";
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
    const success = await sendResetLink(values.email);
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
              marginBottom: "20px",
            }}
          >
            <BrandMark align="center" />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                color: "#ce1c1a",
                fontSize: "13px",
                fontWeight: 500,
                textDecoration: "none",
              }}
              className="hover:underline"
            >
              <ArrowBack sx={{ fontSize: "16px" }} />
              Back to sign in
            </Link>
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
              Password reset
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
              Reset your password
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
            gap: "14px",
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "72px",
              height: "72px",
              borderRadius: "18px",
              background:
                "linear-gradient(135deg, #fff5f5 0%, #ffe5e5 60%, #ffd0d0 100%)",
              color: "#ce1c1a",
              border: "1px solid rgba(206,28,26,0.18)",
              boxShadow:
                "0 8px 22px -8px rgba(206,28,26,0.45), inset 0 1px 0 rgba(255,255,255,0.6)",
              marginBottom: "4px",
            }}
          >
            <CheckCircleOutline sx={{ fontSize: "36px" }} />
          </span>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.4px",
              background:
                "linear-gradient(135deg, #2b2b2b 0%, #2b2b2b 55%, #5a5a5a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.15,
            }}
          >
            Check your email
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#887b6a",
              margin: 0,
              lineHeight: 1.55,
              maxWidth: "320px",
            }}
          >
            If that address is registered, you&apos;ll receive a reset link shortly.
          </p>
          <Link
            href="/login"
            style={{
              color: "#ce1c1a",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              marginTop: "4px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
            className="hover:underline"
          >
            <ArrowBack sx={{ fontSize: "16px" }} />
            Back to sign in
          </Link>
        </div>
      )}
    </AuthCard>
  );
}
