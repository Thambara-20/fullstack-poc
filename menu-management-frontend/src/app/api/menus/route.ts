import { NextRequest, NextResponse } from "next/server";

const NEST_BASE_URL = process.env.NEXT_BASE_URL as string;

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
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
