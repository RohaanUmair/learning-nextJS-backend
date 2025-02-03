import { NextResponse } from "next/server";

const todo = ['Play', 'Dance', 'Code']

export function GET() {
    return NextResponse.json({ todo })
}