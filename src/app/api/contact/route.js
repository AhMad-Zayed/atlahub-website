import { NextResponse } from 'next/server';
import { saveContactMessage } from '@/lib/messages-store';

export async function POST(request) {
  try {
    const { name, email, phone, service, message } = await request.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await saveContactMessage({ name, email, phone, service, message });

    return NextResponse.json({ message: 'Contact request received successfully' }, { status: 201 });

  } catch (error) {
    console.error('Failed to save contact:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
