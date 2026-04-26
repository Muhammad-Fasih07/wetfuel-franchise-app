"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import {
  AcUnit as AcUnitIcon,
  AddBusiness as AddBusinessIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  FiberNew as FiberNewIcon,
  FileDownloadOutlined as FileDownloadOutlinedIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  Store as StoreIcon,
} from "@mui/icons-material";

import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionCard } from "@/components/ui/SectionCard";
import { StatCard } from "@/components/ui/StatCard";
import { StatusChip } from "@/components/ui/StatusChip";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import {
  FRANCHISEES_STUB,
  type FranchiseeStub,
} from "./_data";

const HEADER_CELL_SX = {
  background: "#fafafa",
  fontSize: "11px",
  fontWeight: 600,
  color: "#887b6a",
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  borderBottom: "1px solid #f0f0f0",
  padding: "12px 16px",
};

const BODY_CELL_SX = {
  fontSize: "13px",
  color: "#2b2b2b",
  borderBottom: "1px solid #f5f5f5",
  padding: "14px 16px",
};

// TODO: replace with real summary data from lib/api/franchisees.ts
const FRANCHISEE_STATS = [
  {
    label: "TOTAL FRANCHISEES",
    value: "24",
    subtext: "Registered on network",
    trend: "up" as const,
    trendValue: "+3 this month",
    icon: <StoreIcon sx={{ fontSize: 20 }} />,
  },
  {
    label: "ACTIVE",
    value: "21",
    subtext: "Operational partners",
    trend: "up" as const,
    trendValue: "+2",
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />,
  },
  {
    label: "FROZEN",
    value: "3",
    subtext: "Currently suspended",
    trend: "down" as const,
    trendValue: "-1",
    icon: <AcUnitIcon sx={{ fontSize: 20 }} />,
  },
  {
    label: "ADDED THIS MONTH",
    value: "2",
    subtext: "New partners",
    trend: "up" as const,
    trendValue: "+50%",
    icon: <FiberNewIcon sx={{ fontSize: 20 }} />,
  },
];

export default function FranchiseesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "frozen">(
    "all",
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<FranchiseeStub | null>(null);

  const [confirm, setConfirm] = useState<{
    open: boolean;
    action: "freeze" | "unfreeze" | null;
    row: FranchiseeStub | null;
  }>({ open: false, action: null, row: null });

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return FRANCHISEES_STUB.filter((row) => {
      if (statusFilter !== "all" && row.status !== statusFilter) return false;
      if (!term) return true;
      return (
        row.name.toLowerCase().includes(term) ||
        row.email.toLowerCase().includes(term) ||
        row.location.toLowerCase().includes(term)
      );
    });
  }, [search, statusFilter]);

  const paged = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const openMenu = (event: MouseEvent<HTMLButtonElement>, row: FranchiseeStub) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setActiveRow(row);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setActiveRow(null);
  };

  const handleAction = (action: "edit" | "freeze" | "unfreeze") => {
    const row = activeRow;
    closeMenu();
    if (!row) return;

    if (action === "edit") {
      router.push(`/franchisees/${row.id}/edit`);
    } else {
      setConfirm({ open: true, action, row });
    }
  };

  const closeConfirm = () =>
    setConfirm({ open: false, action: null, row: null });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <PageHeader
        title="Franchisees"
        subtitle="Manage and monitor all registered franchise partners."
        action={
          <Button
            fullWidth={false}
            startIcon={<AddBusinessIcon sx={{ fontSize: 18 }} />}
            onClick={() => router.push("/franchisees/new")}
          >
            Add Franchisee
          </Button>
        }
      />

      <Grid container spacing={3}>
        {FRANCHISEE_STATS.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.label}>
            <StatCard
              label={stat.label}
              value={stat.value}
              subtext={stat.subtext}
              trend={stat.trend}
              trendValue={stat.trendValue}
              icon={stat.icon}
            />
          </Grid>
        ))}
      </Grid>

      <SectionCard
        title="All Franchisees"
        action={
          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <TextField
              size="small"
              placeholder="Search franchisees..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 18, color: "#887b6a" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: 220,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "13px",
                  height: "36px",
                },
              }}
            />
            <TextField
              select
              size="small"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as "all" | "active" | "frozen");
                setPage(0);
              }}
              SelectProps={{ native: true }}
              sx={{
                width: 150,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "13px",
                  height: "36px",
                },
              }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="frozen">Frozen</option>
            </TextField>
            <Button
              variant="ghost"
              fullWidth={false}
              startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 18 }} />}
            >
              Export
            </Button>
          </div>
        }
        bodyPadding={0}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={HEADER_CELL_SX}>Franchisee</TableCell>
                <TableCell sx={HEADER_CELL_SX}>Admin</TableCell>
                <TableCell sx={HEADER_CELL_SX}>Location</TableCell>
                <TableCell sx={HEADER_CELL_SX} align="center">Customers</TableCell>
                <TableCell sx={HEADER_CELL_SX} align="center">Drivers</TableCell>
                <TableCell sx={HEADER_CELL_SX} align="center">Trucks</TableCell>
                <TableCell sx={HEADER_CELL_SX} align="right">Avg Fuel/Mo</TableCell>
                <TableCell sx={HEADER_CELL_SX}>Joined</TableCell>
                <TableCell sx={HEADER_CELL_SX}>Status</TableCell>
                <TableCell sx={HEADER_CELL_SX} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paged.map((row) => (
                <TableRow
                  key={row.id}
                  hover
                  sx={{
                    "&:hover": { background: "#fafafa" },
                    "&:last-child td": { borderBottom: 0 },
                  }}
                >
                  <TableCell sx={BODY_CELL_SX}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#2b2b2b" }}>
                      {row.name}
                    </div>
                    <div style={{ fontSize: 12, color: "#887b6a", marginTop: 2 }}>
                      {row.email}
                    </div>
                  </TableCell>
                  <TableCell sx={BODY_CELL_SX}>
                    <div style={{ fontSize: 13, color: "#2b2b2b" }}>{row.username}</div>
                    <div style={{ fontSize: 12, color: "#887b6a", marginTop: 2 }}>
                      {row.phone}
                    </div>
                  </TableCell>
                  <TableCell sx={BODY_CELL_SX}>{row.location}</TableCell>
                  <TableCell sx={BODY_CELL_SX} align="center">{row.customers}</TableCell>
                  <TableCell sx={BODY_CELL_SX} align="center">{row.drivers}</TableCell>
                  <TableCell sx={BODY_CELL_SX} align="center">{row.trucks}</TableCell>
                  <TableCell sx={BODY_CELL_SX} align="right">{row.avgFuel}</TableCell>
                  <TableCell sx={{ ...BODY_CELL_SX, fontSize: "12px", color: "#887b6a" }}>
                    {row.joined}
                  </TableCell>
                  <TableCell sx={BODY_CELL_SX}>
                    <StatusChip status={row.status} />
                  </TableCell>
                  <TableCell sx={BODY_CELL_SX} align="right">
                    <IconButton
                      size="small"
                      onClick={(e) => openMenu(e, row)}
                      sx={{ color: "#887b6a" }}
                    >
                      <MoreVertIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {paged.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    sx={{
                      ...BODY_CELL_SX,
                      textAlign: "center",
                      color: "#887b6a",
                      padding: "32px 16px",
                    }}
                  >
                    No franchisees match the current filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[8, 16, 24]}
          sx={{
            borderTop: "1px solid #f0f0f0",
            fontSize: "12px",
            color: "#887b6a",
            padding: "8px 16px",
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              { fontSize: "12px", color: "#887b6a", margin: 0 },
            "& .MuiTablePagination-select": { fontSize: "12px" },
          }}
        />
      </SectionCard>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "8px",
              border: "1px solid #e5e5e5",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              minWidth: 180,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleAction("edit")}
          sx={{ fontSize: "13px", color: "#2b2b2b" }}
        >
          Edit details
        </MenuItem>
        <Divider sx={{ my: "4px" }} />
        {activeRow?.status === "active" ? (
          <MenuItem
            onClick={() => handleAction("freeze")}
            sx={{ fontSize: "13px", color: "#dc2626" }}
          >
            Freeze account
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => handleAction("unfreeze")}
            sx={{ fontSize: "13px", color: "#15803d" }}
          >
            Unfreeze account
          </MenuItem>
        )}
      </Menu>

      <ConfirmDialog
        open={confirm.open}
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
          // TODO: call freezeFranchisee / unfreezeFranchisee from lib/api/franchisees.ts
          closeConfirm();
        }}
        onCancel={closeConfirm}
      />
    </div>
  );
}
