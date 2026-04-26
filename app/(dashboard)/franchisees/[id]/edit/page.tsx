"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Grid, Snackbar } from "@mui/material";
import { z } from "zod";
import {
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { updateFranchisee } from "@/lib/api/franchisees";
import { getFranchiseeStubById } from "../../_data";

const schema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  adminUsername: z.string().min(1, "Admin username is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(1, "ZIP code is required"),
  registrationNo: z.string().optional(),
  contractStartDate: z.string().optional(),
  territory: z.string().optional(),
  billingContact: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const SECTION_LABEL: React.CSSProperties = {
  fontSize: "11px",
  color: "#887b6a",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  marginBottom: "16px",
  paddingBottom: "8px",
  borderBottom: "1px solid #f0f0f0",
  fontWeight: 600,
};

export default function EditFranchiseePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const row = getFranchiseeStubById(id);
  const [toastOpen, setToastOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: row
      ? {
          businessName: row.name,
          adminUsername: row.username,
          email: row.email,
          phone: row.phone,
          address: row.location,
          city: row.location.split(",")[0]?.trim() ?? "",
          state: row.location.split(",")[1]?.trim() ?? "",
          zip: "",
          registrationNo: "",
          contractStartDate: "",
          territory: "",
          billingContact: "",
        }
      : undefined,
  });

  if (!row) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <PageHeader
          title="Franchisee not found"
          subtitle="Cannot edit a franchisee that does not exist."
          action={
            <Button
              variant="ghost"
              fullWidth={false}
              startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
              onClick={() => router.push("/franchisees")}
            >
              Back to list
            </Button>
          }
        />
        <SectionCard>
          <EmptyState
            title="No franchisee with this ID."
            action={
              <Button
                fullWidth={false}
                onClick={() => router.push("/franchisees")}
              >
                Go to franchisees
              </Button>
            }
          />
        </SectionCard>
      </div>
    );
  }

  const onSubmit = async (values: FormValues) => {
    // TODO: wire to lib/api/franchisees.ts updateFranchisee with full payload
    await updateFranchisee(id, {
      businessName: values.businessName,
      adminUsername: values.adminUsername,
      phone: values.phone,
      email: values.email,
      location: `${values.city}, ${values.state}`,
    } as never);
    setToastOpen(true);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <PageHeader
        title="Edit Franchisee"
        subtitle={`${row.name} · ${row.location}`}
        action={
          <Button
            variant="ghost"
            fullWidth={false}
            startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
            onClick={() => router.push(`/franchisees/${id}`)}
          >
            Back to details
          </Button>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e5e5",
            borderRadius: "12px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            padding: "40px",
            maxWidth: "680px",
            margin: "0 auto",
          }}
        >
          <p style={SECTION_LABEL}>Business Information</p>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input name="businessName" label="Franchise Business Name" register={register("businessName")} error={errors.businessName?.message} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input name="adminUsername" label="Admin Username" register={register("adminUsername")} error={errors.adminUsername?.message} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input name="email" label="Email Address" type="email" register={register("email")} error={errors.email?.message} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input name="phone" label="Phone Number" register={register("phone")} error={errors.phone?.message} />
            </Grid>
          </Grid>

          <div style={{ marginTop: "28px" }}>
            <p style={SECTION_LABEL}>Location Details</p>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input name="address" label="Street Address" register={register("address")} error={errors.address?.message} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input name="city" label="City" register={register("city")} error={errors.city?.message} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input name="state" label="State" register={register("state")} error={errors.state?.message} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input name="zip" label="ZIP Code" register={register("zip")} error={errors.zip?.message} />
              </Grid>
            </Grid>
          </div>

          <div style={{ marginTop: "28px" }}>
            <p style={SECTION_LABEL}>Additional Info</p>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Input name="registrationNo" label="Business Registration No." register={register("registrationNo")} error={errors.registrationNo?.message} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input name="contractStartDate" label="Contract Start Date" type="date" register={register("contractStartDate")} error={errors.contractStartDate?.message} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input name="territory" label="Assigned Territory / Region" register={register("territory")} error={errors.territory?.message} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input name="billingContact" label="Billing Contact Name" register={register("billingContact")} error={errors.billingContact?.message} />
              </Grid>
            </Grid>
          </div>

          <div
            style={{
              marginTop: "32px",
              borderTop: "1px solid #f0f0f0",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
            }}
          >
            <Button
              variant="ghost"
              fullWidth={false}
              onClick={() => router.push(`/franchisees/${id}`)}
            >
              Cancel
            </Button>
            <Button type="submit" fullWidth={false} loading={isSubmitting}>
              Save Changes
            </Button>
          </div>
        </div>
      </form>

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
          Changes saved successfully.
        </Alert>
      </Snackbar>
    </div>
  );
}
