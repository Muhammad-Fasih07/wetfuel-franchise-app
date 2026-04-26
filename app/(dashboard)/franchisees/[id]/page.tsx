"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Grid } from "@mui/material";
import {
  AcUnit as AcUnitIcon,
  ArrowBack as ArrowBackIcon,
  DeleteOutline as DeleteOutlineIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatusChip } from "@/components/ui/StatusChip";
import { getFranchiseeStubById } from "../_data";


const LABEL_STYLE: React.CSSProperties = {
  fontSize: "11px",
  color: "#887b6a",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  margin: 0,
  fontWeight: 600,
};

const VALUE_STYLE: React.CSSProperties = {
  fontSize: "14px",
  color: "#2b2b2b",
  fontWeight: 500,
  margin: "4px 0 0 0",
};

const PAIR_WRAPPER: React.CSSProperties = {
  padding: "12px 0",
  borderBottom: "1px solid #f5f5f5",
};

function InfoPair({
  label,
  value,
  isLast,
}: {
  label: string;
  value: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <div
      style={{
        ...PAIR_WRAPPER,
        borderBottom: isLast ? "none" : PAIR_WRAPPER.borderBottom,
      }}
    >
      <p style={LABEL_STYLE}>{label}</p>
      <div style={VALUE_STYLE}>{value}</div>
    </div>
  );
}

const PERFORMANCE_BTN_DANGER_SX = {
  background: "#ffffff",
  border: "1px solid #f0797a",
  color: "#f0797a",
  width: "100%",
  height: "44px",
  borderRadius: "8px",
  fontWeight: 500,
  fontSize: "14px",
  textTransform: "none" as const,
  boxShadow: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  cursor: "pointer",
  transition: "background 150ms ease",
};

export default function FranchiseeDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "";
  const row = getFranchiseeStubById(id);

  const [confirm, setConfirm] = useState<{
    open: boolean;
    action: "freeze" | "unfreeze" | "delete" | null;
  }>({ open: false, action: null });

  if (!row) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <PageHeader
          title="Franchisee not found"
          subtitle="The franchisee you're looking for doesn't exist."
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
            subtitle="They may have been removed from the network."
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

  const closeConfirm = () => setConfirm({ open: false, action: null });
  const isFrozen = row.status === "frozen";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <PageHeader
        title={row.name}
        subtitle={`${row.location} · Account ID ${row.id}`}
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

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <SectionCard
              title="Franchise Details"
              action={
                <Button
                  variant="ghost"
                  fullWidth={false}
                  startIcon={<EditIcon sx={{ fontSize: 18 }} />}
                  onClick={() =>
                    router.push(`/franchisees/${row.id}/edit`)
                  }
                >
                  Edit
                </Button>
              }
              bodyPadding="0 24px 8px"
            >
              <Grid container columnSpacing={3}>
                <Grid item xs={12} sm={6}>
                  <InfoPair label="Business Name" value={row.name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoPair label="Admin Username" value={row.username} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoPair label="Email" value={row.email} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoPair label="Phone" value={row.phone} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoPair label="Location" value={row.location} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoPair label="Joined Date" value={row.joined} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoPair
                    label="Status"
                    value={<StatusChip status={row.status} />}
                    isLast
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InfoPair label="Account ID" value={row.id} isLast />
                </Grid>
              </Grid>
            </SectionCard>
          </div>
        </Grid>

        <Grid item xs={12} lg={4}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <SectionCard title="Account Actions" bodyPadding="20px 24px 24px">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Button
                  variant="ghost"
                  startIcon={<EditIcon sx={{ fontSize: 18 }} />}
                  onClick={() => router.push(`/franchisees/${row.id}/edit`)}
                >
                  Edit Franchisee Details
                </Button>

                <button
                  type="button"
                  style={PERFORMANCE_BTN_DANGER_SX}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "#fff5f5")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "#ffffff")
                  }
                  onClick={() =>
                    setConfirm({
                      open: true,
                      action: isFrozen ? "unfreeze" : "freeze",
                    })
                  }
                >
                  <AcUnitIcon sx={{ fontSize: 18 }} />
                  {isFrozen ? "Unfreeze Account" : "Freeze Account"}
                </button>

                <button
                  type="button"
                  style={PERFORMANCE_BTN_DANGER_SX}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "#fff5f5")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.background =
                      "#ffffff")
                  }
                  onClick={() => setConfirm({ open: true, action: "delete" })}
                >
                  <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                  Remove Franchisee
                </button>
              </div>
            </SectionCard>
          </div>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={confirm.open && confirm.action !== "delete"}
        title={
          confirm.action === "freeze"
            ? "Freeze this account?"
            : "Unfreeze this account?"
        }
        message={
          confirm.action === "freeze"
            ? "The franchisee will lose access immediately."
            : "The franchisee will regain full access."
        }
        confirmLabel={confirm.action === "freeze" ? "Freeze" : "Unfreeze"}
        confirmColor={confirm.action === "freeze" ? "#f0797a" : "#ce1c1a"}
        onConfirm={() => {
          // TODO: call freezeFranchisee / unfreezeFranchisee
          closeConfirm();
        }}
        onCancel={closeConfirm}
      />

      <ConfirmDialog
        open={confirm.open && confirm.action === "delete"}
        title="Remove this franchisee?"
        message="This permanently removes the franchisee, their admin account, and all associated history. This action cannot be undone."
        confirmLabel="Yes, remove franchisee"
        confirmColor="#dc2626"
        onConfirm={() => {
          // TODO: call deleteFranchisee
          closeConfirm();
          router.push("/franchisees");
        }}
        onCancel={closeConfirm}
      />
    </div>
  );
}
