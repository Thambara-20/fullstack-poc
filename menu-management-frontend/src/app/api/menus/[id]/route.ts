import { NextRequest, NextResponse } from "next/server";

const NEST_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// GET specific menu by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const resolvedParams = await params;
  if (!resolvedParams?.id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const res = await fetch(`${NEST_BASE_URL}/${resolvedParams.id}`);
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

// PUT update menu
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  try {
    const body = await req.json();
    const res = await fetch(`${NEST_BASE_URL}/${id}`, {
      method: "PUT",
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

// DELETE remove menu
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const { id } = await params;

  const res = await fetch(`${NEST_BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to delete menu" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Deleted successfully", id });
}
