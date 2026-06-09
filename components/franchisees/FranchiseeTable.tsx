"use client";

import { useMemo, useState, type MouseEvent } from "react";
import { useAppRouter } from "../../lib/hooks/useAppRouter";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
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
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { Button } from "@/components/ui/Button";
import { BODY_CELL_SX, HEADER_CELL_SX, MONO_DATA_CELL_SX } from "@/lib/styles/tableStyles";

type FranchiseeStatus = "Active" | "Frozen";

interface FranchiseeRow {
  id: string;
  name: string;
  location: string;
  customers: number;
  drivers: number;
  trucks: number;
  avgFuel: string;
  status: FranchiseeStatus;
}

// TODO: replace with real API data from lib/api/franchisees.ts
const STUB_ROWS: FranchiseeRow[] = [
  { id: "1", name: "AlphaFuel Co.", location: "Houston, TX", customers: 84, drivers: 6, trucks: 4, avgFuel: "8,200 gal", status: "Active" },
  { id: "2", name: "PrimeFuel LLC", location: "Dallas, TX", customers: 62, drivers: 4, trucks: 3, avgFuel: "6,100 gal", status: "Active" },
  { id: "3", name: "SouthFuel Inc.", location: "Austin, TX", customers: 45, drivers: 3, trucks: 2, avgFuel: "4,800 gal", status: "Active" },
  { id: "4", name: "NorthFuel Ltd.", location: "San Antonio, TX", customers: 38, drivers: 3, trucks: 2, avgFuel: "3,900 gal", status: "Frozen" },
  { id: "5", name: "WestEnd Fuel", location: "El Paso, TX", customers: 29, drivers: 2, trucks: 2, avgFuel: "2,600 gal", status: "Active" },
  { id: "6", name: "Gulf Fuel Co.", location: "Corpus Christi, TX", customers: 21, drivers: 2, trucks: 1, avgFuel: "1,900 gal", status: "Active" },
];

function FranchiseeStatusChip({ status }: { status: FranchiseeStatus }) {
  const isActive = status === "Active";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: isActive ? "var(--success-bg)" : "var(--error-bg)",
        color: isActive ? "var(--success-text)" : "var(--error-text)",
        borderRadius: "9999px",
        fontSize: "12px",
        fontWeight: 500,
        padding: "2px 8px",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        whiteSpace: "nowrap",
      }}
    >
      <span
        aria-hidden
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: isActive ? "var(--success-text)" : "var(--error-text)",
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
}

export function FranchiseeTable() {
  const router = useAppRouter();
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "frozen">("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [activeRow, setActiveRow] = useState<FranchiseeRow | null>(null);

  const [confirm, setConfirm] = useState<{
    open: boolean;
    action: "freeze" | "unfreeze" | null;
    row: FranchiseeRow | null;
  }>({ open: false, action: null, row: null });

  const filtered = useMemo(() => {
    if (statusFilter === "all") return STUB_ROWS;
    return STUB_ROWS.filter((r) =>
      statusFilter === "active" ? r.status === "Active" : r.status === "Frozen",
    );
  }, [statusFilter]);

  const paged = useMemo(() => {
    const start = page * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, page, rowsPerPage]);

  const openMenu = (event: MouseEvent<HTMLButtonElement>, row: FranchiseeRow) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setActiveRow(row);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setActiveRow(null);
  };

  const handleMenuAction = (action: "view" | "edit" | "freeze" | "unfreeze") => {
    const row = activeRow;
    closeMenu();
    if (!row) return;

    if (action === "view") {
      router.push(`/franchisees/${row.id}`);
    } else if (action === "edit") {
      router.push(`/franchisees/${row.id}/edit`);
    } else {
      setConfirm({ open: true, action, row });
    }
  };

  const closeConfirm = () =>
    setConfirm({ open: false, action: null, row: null });

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Franchisee Overview
        </h2>

        <TextField
          select
          size="small"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | "active" | "frozen")
          }
          SelectProps={{ native: true }}
          sx={{
            width: "140px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "6px",
              fontSize: "13px",
              height: "34px",
              color: "var(--text-primary)",
              backgroundColor: "var(--bg-surface-hover)",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--border-subtle)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--border-focus)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--primary-brand)",
                borderWidth: "1px",
              },
            },
            "& .MuiNativeSelect-select": {
              color: "var(--text-primary)",
            },
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="frozen">Frozen</option>
        </TextField>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={HEADER_CELL_SX}>Franchisee</TableCell>
              <TableCell sx={HEADER_CELL_SX} align="right">Customers</TableCell>
              <TableCell sx={HEADER_CELL_SX} align="right">Drivers</TableCell>
              <TableCell sx={HEADER_CELL_SX} align="right">Trucks</TableCell>
              <TableCell sx={HEADER_CELL_SX} align="right">Avg Fuel/Mo</TableCell>
              <TableCell sx={HEADER_CELL_SX}>Status</TableCell>
              <TableCell sx={HEADER_CELL_SX} align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map((row) => (
              <TableRow
                key={row.id}
                hover
                onClick={() => router.push(`/franchisees/${row.id}`)}
                sx={{
                  cursor: "pointer",
                  "&:hover": { background: "var(--bg-surface-hover)" },
                  "&:last-child td": { borderBottom: 0 },
                }}
              >
                <TableCell sx={BODY_CELL_SX}>
                  <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-primary)" }}>
                    {row.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
                    {row.location}
                  </div>
                </TableCell>
                <TableCell sx={MONO_DATA_CELL_SX} align="right">{row.customers}</TableCell>
                <TableCell sx={MONO_DATA_CELL_SX} align="right">{row.drivers}</TableCell>
                <TableCell sx={MONO_DATA_CELL_SX} align="right">{row.trucks}</TableCell>
                <TableCell sx={MONO_DATA_CELL_SX} align="right">{row.avgFuel}</TableCell>
                <TableCell sx={BODY_CELL_SX}>
                  <FranchiseeStatusChip status={row.status} />
                </TableCell>
                <TableCell sx={BODY_CELL_SX} align="right">
                  <IconButton
                    size="small"
                    onClick={(e) => openMenu(e, row)}
                    sx={{ color: "var(--text-muted)" }}
                  >
                    <MoreVertIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {paged.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  sx={{
                    ...BODY_CELL_SX,
                    textAlign: "center",
                    color: "var(--text-muted)",
                    padding: "32px 16px",
                  }}
                >
                  No franchisees match this filter.
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
        rowsPerPageOptions={[6, 12, 24]}
        sx={{
          borderTop: "1px solid var(--border-subtle)",
          fontSize: "12px",
          color: "var(--text-muted)",
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            { fontSize: "12px", color: "var(--text-muted)", margin: 0 },
          "& .MuiTablePagination-select": { fontSize: "12px", color: "var(--text-primary)" },
          "& .MuiIconButton-root": { color: "var(--text-muted)" },
          "& .MuiIconButton-root.Mui-disabled": { color: "var(--border-subtle)" },
        }}
      />

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "6px",
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-surface)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              minWidth: 180,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => handleMenuAction("view")}
          sx={{ fontSize: "14px", color: "var(--text-primary)" }}
        >
          View details
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuAction("edit")}
          sx={{ fontSize: "14px", color: "var(--text-primary)" }}
        >
          Edit
        </MenuItem>
        {activeRow?.status === "Active" ? (
          <MenuItem
            onClick={() => handleMenuAction("freeze")}
            sx={{ fontSize: "14px", color: "var(--error-text)" }}
          >
            Freeze account
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => handleMenuAction("unfreeze")}
            sx={{ fontSize: "14px", color: "var(--success-text)" }}
          >
            Unfreeze account
          </MenuItem>
        )}
      </Menu>

      <Dialog
        open={confirm.open}
        onClose={closeConfirm}
        PaperProps={{ sx: { borderRadius: "8px", padding: "8px", background: "var(--bg-surface)", border: "1px solid var(--border-subtle)" } }}
      >
        <DialogTitle sx={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
          {confirm.action === "freeze" ? "Freeze account?" : "Unfreeze account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            {confirm.action === "freeze"
              ? `This will temporarily disable ${confirm.row?.name}'s access to the platform.`
              : `${confirm.row?.name} will regain full access to the platform.`}
            {/* TODO: wire to lib/api/franchisees.ts freeze/unfreeze endpoint */}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "8px 16px 16px", gap: "8px" }}>
          <Button variant="ghost" fullWidth={false} onClick={closeConfirm}>
            Cancel
          </Button>
          <Button fullWidth={false} onClick={closeConfirm}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
