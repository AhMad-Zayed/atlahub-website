import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, phone, service, message } = await request.json();

    // Basic validation
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const query = 'INSERT INTO contacts (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)';
    const values = [name, email, phone, service, message];

    await db.query(query, values);

    return NextResponse.json({ message: 'Contact request received successfully' }, { status: 201 });

  } catch (error) {
    console.error('Failed to save contact:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}