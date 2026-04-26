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
              marginBottom: "24px",
            }}
          >
            <BrandMark align="center" />
          </div>

          <div
            className="animate-fade-in"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
              animationDelay: "0.1s",
            }}
          >
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                color: "#ce1c1a",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#bf2524";
                e.currentTarget.style.gap = "8px";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#ce1c1a";
                e.currentTarget.style.gap = "6px";
              }}
            >
              <ArrowBack sx={{ fontSize: "17px" }} />
              Back to sign in
            </Link>
          </div>

          <div
            className="animate-slide-up"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
              animationDelay: "0.2s",
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
                }}
              />
              Password reset
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
              Reset your password
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
              Enter your email and we&apos;ll send you a reset link.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="animate-slide-up"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                animationDelay: "0.3s",
              }}
            >
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
          className="animate-fade-in"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "18px",
          }}
        >
          <span
            aria-hidden
            className="animate-scale-in"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "20px",
              background:
                "linear-gradient(135deg, #fff5f5 0%, #ffe5e5 60%, #ffd0d0 100%)",
              color: "#ce1c1a",
              border: "1.5px solid rgba(206,28,26,0.2)",
              boxShadow:
                "0 10px 28px -8px rgba(206,28,26,0.5), 0 4px 12px rgba(206,28,26,0.2), inset 0 1px 0 rgba(255,255,255,0.7)",
              marginBottom: "8px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "20px",
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)",
              }}
            />
            <CheckCircleOutline sx={{ fontSize: "40px" }} />
          </span>

          <h1
            className="text-gradient-primary animate-slide-up"
            style={{
              fontSize: "28px",
              fontWeight: 700,
              margin: 0,
              letterSpacing: "-0.6px",
              lineHeight: 1.15,
              animationDelay: "0.1s",
            }}
          >
            Check your email
          </h1>
          <p
            className="animate-fade-in"
            style={{
              fontSize: "14px",
              color: "#887b6a",
              margin: 0,
              lineHeight: 1.6,
              maxWidth: "360px",
              fontWeight: 400,
              animationDelay: "0.2s",
            }}
          >
            If that address is registered, you&apos;ll receive a reset link shortly.
          </p>
          <Link
            href="/login"
            className="animate-fade-in"
            style={{
              color: "#ce1c1a",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              marginTop: "8px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 200ms ease",
              animationDelay: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#bf2524";
              e.currentTarget.style.gap = "8px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#ce1c1a";
              e.currentTarget.style.gap = "6px";
            }}
          >
            <ArrowBack sx={{ fontSize: "17px" }} />
            Back to sign in
          </Link>
        </div>
      )}
    </AuthCard>
  );
}
