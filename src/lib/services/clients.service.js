'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// ---------------------------------------------------------------------------
// Client Initialisation — atomic transaction
// Creates Client + first Campaign + first CampaignLog in one DB round-trip.
// This is the "New Client Initialisation" equivalent to a Payload Server Hook.
// ---------------------------------------------------------------------------

export async function initialiseClient({ name, primaryContact, preferredCurrency = 'USD', campaignTitle }) {
  if (!name || !primaryContact) throw new Error('Name and contact are required');

  const [client, campaign] = await prisma.$transaction(async (tx) => {
    // 1. Create client entity
    const newClient = await tx.agencyClient.create({
      data: {
        name: name.trim(),
        primaryContact: primaryContact.trim(),
        preferredCurrency,
        totalRevenue: 0,
      },
    });

    // 2. Create default campaign linked to client
    const firstCampaign = await tx.agencyCampaign.create({
      data: {
        clientId: newClient.id,
        title: campaignTitle?.trim() || `${name.trim()} — Initial Project`,
        status: 'PENDING',
      },
    });

    // 3. Log the milestone
    await tx.campaignLog.create({
      data: {
        campaignId: firstCampaign.id,
        action: 'CLIENT_INITIALISED',
        details: `Client "${newClient.name}" created with initial project. Contact: ${newClient.primaryContact}`,
        user: 'ADMIN',
        isVisibleToClient: false,
      },
    });

    return [newClient, firstCampaign];
  });

  revalidatePath('/[lang]/admin/clients', 'page');
  return { client, campaign };
}

// ---------------------------------------------------------------------------
// Get all clients with financial summary (for Client Directory)
// ---------------------------------------------------------------------------

export async function listClients() {
  return prisma.agencyClient.findMany({
    include: {
      campaigns: {
        select: {
          id: true,
          title: true,
          status: true,
          totalClientPaid: true,
          profitMargin: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      },
      invoices: {
        select: { id: true, status: true, amount: true },
        where: { status: 'PENDING' },
      },
      contracts: {
        select: { id: true, renewsAt: true, name: true },
        where: { renewsAt: { lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}
