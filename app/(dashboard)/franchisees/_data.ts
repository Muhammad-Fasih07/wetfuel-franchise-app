// TODO: replace this stub data with real API responses from lib/api/franchisees.ts

export type FranchiseeStubStatus = "active" | "frozen";

export interface FranchiseeStub {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  location: string;
  customers: number;
  drivers: number;
  trucks: number;
  avgFuel: string;
  joined: string;
  status: FranchiseeStubStatus;
}

export const FRANCHISEES_STUB: FranchiseeStub[] = [
  {
    id: "1",
    name: "AlphaFuel Co.",
    email: "admin@alphafuel.com",
    username: "alpha_admin",
    phone: "+1 713 000 0001",
    location: "Houston, TX",
    customers: 84,
    drivers: 6,
    trucks: 4,
    avgFuel: "8,200 gal",
    joined: "Jan 12, 2024",
    status: "active",
  },
  {
    id: "2",
    name: "PrimeFuel LLC",
    email: "admin@primefuel.com",
    username: "prime_admin",
    phone: "+1 214 000 0002",
    location: "Dallas, TX",
    customers: 62,
    drivers: 4,
    trucks: 3,
    avgFuel: "6,100 gal",
    joined: "Feb 3, 2024",
    status: "active",
  },
  {
    id: "3",
    name: "SouthFuel Inc.",
    email: "admin@southfuel.com",
    username: "south_admin",
    phone: "+1 512 000 0003",
    location: "Austin, TX",
    customers: 45,
    drivers: 3,
    trucks: 2,
    avgFuel: "4,800 gal",
    joined: "Feb 18, 2024",
    status: "active",
  },
  {
    id: "4",
    name: "NorthFuel Ltd.",
    email: "admin@northfuel.com",
    username: "north_admin",
    phone: "+1 210 000 0004",
    location: "San Antonio, TX",
    customers: 38,
    drivers: 3,
    trucks: 2,
    avgFuel: "3,900 gal",
    joined: "Mar 1, 2024",
    status: "frozen",
  },
  {
    id: "5",
    name: "WestEnd Fuel",
    email: "admin@westendfuel.com",
    username: "west_admin",
    phone: "+1 915 000 0005",
    location: "El Paso, TX",
    customers: 29,
    drivers: 2,
    trucks: 2,
    avgFuel: "2,600 gal",
    joined: "Mar 14, 2024",
    status: "active",
  },
  {
    id: "6",
    name: "Gulf Fuel Co.",
    email: "admin@gulffuel.com",
    username: "gulf_admin",
    phone: "+1 361 000 0006",
    location: "Corpus Christi, TX",
    customers: 21,
    drivers: 2,
    trucks: 1,
    avgFuel: "1,900 gal",
    joined: "Apr 2, 2024",
    status: "active",
  },
  {
    id: "7",
    name: "EastStar Fuel",
    email: "admin@eaststar.com",
    username: "east_admin",
    phone: "+1 409 000 0007",
    location: "Beaumont, TX",
    customers: 17,
    drivers: 1,
    trucks: 1,
    avgFuel: "1,400 gal",
    joined: "Apr 20, 2024",
    status: "active",
  },
  {
    id: "8",
    name: "TexLine Fuel",
    email: "admin@texline.com",
    username: "tex_admin",
    phone: "+1 806 000 0008",
    location: "Lubbock, TX",
    customers: 12,
    drivers: 1,
    trucks: 1,
    avgFuel: "980 gal",
    joined: "May 5, 2024",
    status: "frozen",
  },
];

export function getFranchiseeStubById(
  id: string,
): FranchiseeStub | undefined {
  return FRANCHISEES_STUB.find((row) => row.id === id);
}
