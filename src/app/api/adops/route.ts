import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Example Ad-Ops action: Fetch all campaigns
    const campaigns = await payload.find({
      collection: 'os_campaigns',
    });

    // Map to remove hidden margin fields before returning to frontend
    const safeCampaigns = campaigns.docs.map((campaign: any) => {
      const { actualFacebookSpend, agencyMarginAmount, ...clientFacingData } = campaign;
      return clientFacingData;
    });

    return NextResponse.json({ success: true, data: safeCampaigns });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
