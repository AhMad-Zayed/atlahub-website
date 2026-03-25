import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM portfolio ORDER BY id DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch portfolio:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}