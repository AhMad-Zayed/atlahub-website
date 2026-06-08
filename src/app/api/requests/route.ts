import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Example Requests action: Fetch all campaign requests
    const requestsData = await payload.find({
      collection: 'os_campaign_requests',
    });

    return NextResponse.json({ success: true, data: requestsData });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
