'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Helper to calculate exact profit boundaries based on total, spend, and service fee.
function computeProfit(totalPaid, platformSpend, serviceFee) {
  // If the total client paid was $1000, and we spent $800 on ads, our rough profit would be $200.
  // We explicitly track "serviceFee" (ex: $200 management fee out of $1000).
  // Easiest true profit metric: total paid - actual ad platform spend.
  return (totalPaid || 0) - (platformSpend || 0);
}

// ----------------------------------------------------
// Core Client Actions
// ----------------------------------------------------

export async function createAgencyClient(data) {
  const client = await prisma.client.create({
    data: {
      name: data.name,
      primaryContact: data.primaryContact,
      logo: data.logo || null,
      preferredCurrency: data.preferredCurrency || 'USD',
      preferredLang: data.preferredLang || 'en',
    }
  });
  
  revalidatePath('/', 'layout');
  return client;
}

export async function createAgencyCampaign(clientId, title) {
  const campaign = await prisma.campaign.create({
    data: {
      clientId,
      title,
      status: 'PENDING'
    }
  });

  await prisma.log.create({
    data: {
      campaignId: campaign.id,
      action: 'CAMPAIGN_CREATED',
      details: 'New campaign initialized.'
    }
  });

  revalidatePath('/', 'layout');
  return campaign;
}

// ----------------------------------------------------
// Financial & Status Updates
// ----------------------------------------------------

export async function updateCampaignFinances(campaignId, data) {
  const { totalClientPaid, actualPlatformSpend, serviceFee } = data;
  
  const profitMargin = computeProfit(totalClientPaid, actualPlatformSpend, serviceFee);

  const campaign = await prisma.campaign.update({
    where: { id: campaignId },
    data: {
      totalClientPaid,
      actualPlatformSpend,
      serviceFee,
    }
  });

  await prisma.log.create({
    data: {
      campaignId,
      action: 'BUDGET_UPDATED',
      details: `Budget adjusted. Total: ${totalClientPaid}, Spend: ${actualPlatformSpend}, Profit: ${profitMargin}`
    }
  });

  revalidatePath('/', 'layout');
  return campaign;
}

export async function setCampaignStatus(campaignId, newStatus) {
  const oldCampaign = await prisma.campaign.findUnique({ where: { id: campaignId }});
  if (!oldCampaign) throw new Error('Not found');

  const campaign = await prisma.campaign.update({
    where: { id: campaignId },
    data: { status: newStatus }
  });

  // Intelligence Automation Hook
  if (oldCampaign.status !== 'ACTIVE' && newStatus === 'ACTIVE') {
    // Simulate WhatsApp/Email external push by asserting a strong log.
    await prisma.log.create({
      data: {
        campaignId,
        action: 'STATUS_SYNC_BROADCAST',
        details: 'Simulated WhatsApp/Email alert dispatched to Client: "Your campaign is now LIVE!"'
      }
    });
  } else {
    await prisma.log.create({
      data: {
        campaignId,
        action: 'STATUS_CHANGED',
        details: `Status shifted from ${oldCampaign.status} to ${newStatus}.`
      }
    });
  }

  revalidatePath('/', 'layout');
  return campaign;
}

// ----------------------------------------------------
// AdItems & Proof of Work
// ----------------------------------------------------

export async function submitClientAdLink(campaignId, urlsArray) {
  // Process Multi-link arrays natively.
  const insertions = urlsArray.map(postUrl => ({
    campaignId,
    postUrl,
    status: 'PENDING',
    itemBudget: 0
  }));

  const ads = await prisma.adItem.createMany({
    data: insertions
  });

  await prisma.log.create({
    data: {
      campaignId,
      action: 'AD_LINKS_SUBMITTED',
      details: `Client submitted ${urlsArray.length} new ad links: ${urlsArray.join(', ')}`,
      user: 'CLIENT'
    }
  });

  revalidatePath('/', 'layout');
  return ads;
}

export async function uploadAdPreview(adId, previewImageUrl) {
  const ad = await prisma.adItem.update({
    where: { id: adId },
    data: { previewImage: previewImageUrl, status: 'ACTIVE' }
  });

  await prisma.log.create({
    data: {
      campaignId: ad.campaignId,
      action: 'PROOF_OF_WORK_UPLOADED',
      details: 'Admin uploaded screenshot proof for an ad item.',
      user: 'ADMIN'
    }
  });

  revalidatePath('/', 'layout');
  return ad;
}

export async function batchApproveAdItems(adItemIds) {
  await prisma.adItem.updateMany({
    where: { id: { in: adItemIds } },
    data: { status: 'APPROVED' }
  });

  // Grab the campaign from one of them to log
  if (adItemIds.length > 0) {
    const sample = await prisma.adItem.findUnique({ where: { id: adItemIds[0] }});
    if (sample) {
      await prisma.log.create({
        data: {
          campaignId: sample.campaignId,
          action: 'BATCH_APPROVAL',
          details: `Admin batch approved ${adItemIds.length} ad links.`
        }
      });
      revalidatePath('/', 'layout');
    }
  }
}

export async function checkMockData() {
  // Developer function to auto-hydrate client if empty.
  const clients = await prisma.client.count();
  if (clients === 0) {
    const tamer = await prisma.client.create({
      data: {
        name: 'Tamer Beauty Center',
        primaryContact: 'tamer@example.com',
        preferredCurrency: 'USD'
      }
    });
    const c1 = await createAgencyCampaign(tamer.id, 'Summer Laser Overhaul');
    await updateCampaignFinances(c1.id, { totalClientPaid: 5000, actualPlatformSpend: 4200, serviceFee: 800 });
  }
}
