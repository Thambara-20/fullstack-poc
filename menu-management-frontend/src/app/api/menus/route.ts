import { NextRequest, NextResponse } from "next/server";

const NEST_BASE_URL = "http://localhost:3000/menus";

// GET all menus
export async function GET() {
  const res = await fetch(NEST_BASE_URL);
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch menus" },
      { status: 500 }
    );
  }
  const data = await res.json();
  return NextResponse.json(data);
}

// POST create new menu
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(NEST_BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(err, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
