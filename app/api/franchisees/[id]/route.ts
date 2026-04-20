import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Franchisee detail endpoint" });
}

export async function PATCH() {
  return NextResponse.json({ message: "Update franchisee endpoint" });
}
