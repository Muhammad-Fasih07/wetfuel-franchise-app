"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Snackbar } from "@mui/material";
import { z } from "zod";
import {
  Computer as ComputerIcon,
  PhoneIphone as PhoneIphoneIcon,
} from "@mui/icons-material";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusChip } from "@/components/ui/StatusChip";
import { updatePassword } from "@/lib/api/auth";

const passwordRule = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(passwordRule, "Include uppercase, number, and special character"),
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SecurityValues = z.infer<typeof schema>;

// TODO: replace with real session list from lib/api/auth
const SESSIONS: Array<{
  device: string;
  lastActive: string;
  ip: string;
  current: boolean;
  type: "computer" | "phone";
}> = [
  {
    device: "Chrome on Windows",
    lastActive: "Now",
    ip: "192.168.1.1",
    current: true,
    type: "computer",
  },
  {
    device: "Safari on iPhone",
    lastActive: "3 days ago",
    ip: "10.0.0.5",
    current: false,
    type: "phone",
  },
];

const DANGER_GHOST_SX: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #f0797a",
  color: "#f0797a",
  height: "32px",
  borderRadius: "8px",
  padding: "0 12px",
  fontSize: "12px",
  fontWeight: 500,
  textTransform: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "background 150ms ease",
};

export function SecurityPanel() {
  const [toastOpen, setToastOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SecurityValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SecurityValues) => {
    // TODO: wire to lib/api/auth.ts updatePassword
    await updatePassword(values.currentPassword, values.newPassword);
    setToastOpen(true);
    reset();
  };

  return (
    <SectionCard title="Password & Security" bodyPadding="24px 28px 28px">
      <div style={{ maxWidth: "480px" }}>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#2b2b2b",
            margin: "0 0 16px",
          }}
        >
          Change Password
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Input
              name="currentPassword"
              label="Current Password"
              type="password"
              register={register("currentPassword")}
              error={errors.currentPassword?.message}
            />
            <div>
              <Input
                name="newPassword"
                label="New Password"
                type="password"
                register={register("newPassword")}
                error={errors.newPassword?.message}
              />
              <p
                style={{
                  fontSize: "11px",
                  color: "#887b6a",
                  margin: "6px 0 0 4px",
                }}
              >
                Min 8 characters. Include uppercase, number, and special character.
              </p>
            </div>
            <Input
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              register={register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
            <div>
              <Button type="submit" fullWidth={false} loading={isSubmitting}>
                Update Password
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div
        style={{
          height: "1px",
          background: "#f0f0f0",
          margin: "28px 0",
        }}
      />

      <p
        style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#2b2b2b",
          margin: "0 0 16px",
        }}
      >
        Active Sessions
      </p>

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {SESSIONS.map((s, idx) => (
          <li
            key={`${s.device}-${idx}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 0",
              borderBottom:
                idx === SESSIONS.length - 1 ? "none" : "1px solid #f5f5f5",
            }}
          >
            <span style={{ color: "#887b6a", display: "inline-flex" }}>
              {s.type === "computer" ? (
                <ComputerIcon sx={{ fontSize: 20 }} />
              ) : (
                <PhoneIphoneIcon sx={{ fontSize: 20 }} />
              )}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#2b2b2b",
                  margin: 0,
                }}
              >
                {s.device}
              </p>
              <p
                style={{
                  fontSize: "11px",
                  color: "#887b6a",
                  margin: "2px 0 0 0",
                }}
              >
                Last active {s.lastActive} · IP {s.ip}
              </p>
            </div>
            {s.current ? (
              <StatusChip status="active" label="Current" />
            ) : (
              <button
                type="button"
                style={DANGER_GHOST_SX}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#fff5f5")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#ffffff")
                }
              >
                Revoke
              </button>
            )}
          </li>
        ))}
      </ul>

      <Snackbar
        open={toastOpen}
        autoHideDuration={2500}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity="success"
          onClose={() => setToastOpen(false)}
          sx={{
            background: "#f0fdf4",
            color: "#15803d",
            border: "1px solid #bbf7d0",
            fontSize: "13px",
            "& .MuiAlert-icon": { color: "#15803d" },
          }}
        >
          Password updated successfully.
        </Alert>
      </Snackbar>
    </SectionCard>
  );
}
