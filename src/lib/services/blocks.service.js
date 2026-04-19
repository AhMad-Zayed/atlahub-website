'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { fetchOgData } from '@/lib/og-parser';

// ---------------------------------------------------------------------------
// Block Type Definitions
// These are the "Payload Blocks" — each type has a strict validated shape.
// Client-facing: pick a type, fill the fields, UI renders the right controls.
// ---------------------------------------------------------------------------

// Zod-style runtime type guard (no Zod dependency needed)
function assertBlock(block) {
  const validTypes = ['MetaAds', 'CyberAudit', 'Branding', 'Hosting', 'SSL'];
  if (!block?.type || !validTypes.includes(block.type)) {
    throw new Error(`Invalid block type: "${block?.type}". Must be one of: ${validTypes.join(', ')}`);
  }
}

// ---------------------------------------------------------------------------
// Save a Service Block on a campaign
// If block.type === 'MetaAds' and a postUrl is present → auto-fetch OG data
// This is the Payload "afterChange Hook" equivalent for rich media previews.
// ---------------------------------------------------------------------------

export async function addServiceBlock(campaignId, block) {
  assertBlock(block);

  // OG Hook — fires automatically for MetaAds blocks with a URL
  if (block.type === 'MetaAds' && block.postUrl) {
    try {
      const ogData = await fetchOgData(block.postUrl);
      if (ogData) {
        block.ogTitle = ogData.ogTitle || null;
        block.ogDescription = ogData.ogDescription || null;
        block.previewImage = ogData.previewImage || null;
      }
    } catch {
      // OG fetch is non-blocking — proceed even if it fails
    }
  }

  // Load existing blocks and append
  const campaign = await prisma.agencyCampaign.findUnique({
    where: { id: campaignId },
    select: { serviceBlocks: true },
  });

  const existingBlocks = Array.isArray(campaign?.serviceBlocks) ? campaign.serviceBlocks : [];

  const newBlock = {
    id: crypto.randomUUID(), // Stable ID for React keys and future updates
    ...block,
    createdAt: new Date().toISOString(),
  };

  await prisma.agencyCampaign.update({
    where: { id: campaignId },
    data: { serviceBlocks: [...existingBlocks, newBlock] },
  });

  revalidatePath('/[lang]/admin/agency', 'page');
  return newBlock;
}

// ---------------------------------------------------------------------------
// Remove a block by its id
// ---------------------------------------------------------------------------

export async function removeServiceBlock(campaignId, blockId) {
  const campaign = await prisma.agencyCampaign.findUnique({
    where: { id: campaignId },
    select: { serviceBlocks: true },
  });

  const blocks = Array.isArray(campaign?.serviceBlocks) ? campaign.serviceBlocks : [];
  const filtered = blocks.filter(b => b.id !== blockId);

  await prisma.agencyCampaign.update({
    where: { id: campaignId },
    data: { serviceBlocks: filtered },
  });

  revalidatePath('/[lang]/admin/agency', 'page');
  return { removed: blockId };
}


