import { NextResponse } from "next/server";
import familyDetails from "@/data/fontDetails.json";

export async function GET() {
  return NextResponse.json(familyDetails);
}