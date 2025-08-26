import { NextResponse } from 'next/server';
import { getScheduleJson } from '../../../lib/blob';  // <- 3 dấu .. (QUAN TRỌNG)

export const runtime = 'edge';
export const revalidate = 0;

export async function GET() {
  const data = await getScheduleJson();
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'no-store, must-revalidate' },
  });
}
