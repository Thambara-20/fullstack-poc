import { NextRequest, NextResponse } from "next/server";

const NEST_BASE_URL = "http://localhost:3000/menus";

// GET specific menu by ID
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const res = await fetch(`${NEST_BASE_URL}/${id}`);
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
  { params }: { params: { id: string } }
) {
  const { id } = params;
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
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE remove menu
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const res = await fetch(`${NEST_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to delete menu" },
      { status: 500 }
    );
  }
  return NextResponse.json({ message: "Deleted successfully", id });
}
