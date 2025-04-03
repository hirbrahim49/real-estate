import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzVgylcjOqdewQse3beFptUp9GPc-zpggx64sdwHHbnSNH_j5GF41WuTDTjx6YFfTym/exec",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.text();
    return NextResponse.json({ message: result });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}