import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM clients ORDER BY id DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch clients:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}