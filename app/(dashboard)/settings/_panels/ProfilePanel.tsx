"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Avatar, Grid, Snackbar } from "@mui/material";
import { z } from "zod";
import {
  DeleteOutline as DeleteOutlineIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { SectionCard } from "@/components/ui/SectionCard";
import { updateProfile } from "@/lib/api/auth";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  username: z.string().min(1, "Username is required"),
  role: z.string().optional(),
  timezone: z.string().optional(),
  language: z.string().optional(),
});

type ProfileValues = z.infer<typeof schema>;

const DANGER_GHOST_SX: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #f0797a",
  color: "#f0797a",
  height: "36px",
  borderRadius: "8px",
  padding: "0 14px",
  fontSize: "13px",
  fontWeight: 500,
  textTransform: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  cursor: "pointer",
  transition: "background 150ms ease",
};

export function ProfilePanel() {
  const [toastOpen, setToastOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "Super",
      lastName: "Admin",
      email: "admin@wetfuel.com",
      phone: "+1 555 000 1234",
      username: "super_admin",
      role: "Super Admin",
      timezone: "CST",
      language: "English",
    },
  });

  const onSubmit = async (values: ProfileValues) => {
    // TODO: replace stub call with real lib/api/auth.ts updateProfile
    await updateProfile(values);
    setToastOpen(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SectionCard
        title="Profile Information"
        action={
          <Button type="submit" fullWidth={false} loading={isSubmitting}>
            Save Changes
          </Button>
        }
        bodyPadding="28px 28px 28px"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "28px",
            paddingBottom: "24px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <Avatar
            sx={{
              width: 72,
              height: 72,
              background: "#ce1c1a",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 600,
            }}
          >
            SA
          </Avatar>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#2b2b2b",
                margin: 0,
              }}
            >
              Super Admin
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "#887b6a",
                margin: "2px 0 12px",
              }}
            >
              Franchise Super Admin
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <Button
                variant="ghost"
                fullWidth={false}
                startIcon={<CloudUploadIcon sx={{ fontSize: 16 }} />}
              >
                Upload Photo
              </Button>
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
                <DeleteOutlineIcon sx={{ fontSize: 16 }} />
                Remove
              </button>
            </div>
          </div>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Input
              name="firstName"
              label="First Name"
              register={register("firstName")}
              error={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              name="lastName"
              label="Last Name"
              register={register("lastName")}
              error={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              name="email"
              label="Email Address"
              type="email"
              register={register("email")}
              error={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              name="phone"
              label="Phone Number"
              register={register("phone")}
              error={errors.phone?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              name="username"
              label="Username"
              register={register("username")}
              error={errors.username?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              name="role"
              label="Role"
              register={register("role")}
              error={errors.role?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              name="timezone"
              label="Timezone"
              register={register("timezone")}
              error={errors.timezone?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              name="language"
              label="Language"
              register={register("language")}
              error={errors.language?.message}
            />
          </Grid>
        </Grid>
      </SectionCard>

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
          Profile updated successfully.
        </Alert>
      </Snackbar>
    </form>
  );
}
