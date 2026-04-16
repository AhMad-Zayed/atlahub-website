import { NextResponse } from 'next/server';
import { saveContactMessage } from '@/lib/messages-store';
import { dispatchLeadEvent } from '@/lib/analytics-store';

export async function POST(request) {
  try {
    const { name, email, phone, service, message, fingerprint, page_path } = await request.json();

    // Basic validation
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await saveContactMessage({ name, email, phone, service, message });
    await dispatchLeadEvent(
      {
        event_name: 'ContactLead',
        fingerprint: String(fingerprint || ''),
        page_path: String(page_path || '/'),
        payload: {
          service,
          has_phone: Boolean(phone),
          email_domain: String(email || '').split('@')[1] || '',
        },
      },
      request.headers,
    );

    return NextResponse.json({ message: 'Contact request received successfully' }, { status: 201 });

  } catch (error) {
    console.error('Failed to save contact:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
