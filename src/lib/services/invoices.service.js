'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// ---------------------------------------------------------------------------
// Invoice number generator — format: INV-2026-0001
// ---------------------------------------------------------------------------

async function generateInvoiceNumber() {
  const year = new Date().getFullYear();
  const lastInvoice = await prisma.invoice.findFirst({
    where: { invoiceNumber: { startsWith: `INV-${year}-` } },
    orderBy: { createdAt: 'desc' },
    select: { invoiceNumber: true },
  });

  if (!lastInvoice) return `INV-${year}-0001`;
  const lastSeq = parseInt(lastInvoice.invoiceNumber.split('-')[2] || '0', 10);
  return `INV-${year}-${String(lastSeq + 1).padStart(4, '0')}`;
}

// ---------------------------------------------------------------------------
// Create Invoice — linked to Client (and optionally a Campaign)
// ---------------------------------------------------------------------------

export async function createInvoice({ clientId, campaignId, amount, description, dueAt }) {
  if (!clientId || !amount || amount <= 0) throw new Error('clientId and amount are required');

  const invoiceNumber = await generateInvoiceNumber();

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      clientId,
      campaignId: campaignId || null,
      amount: parseFloat(amount),
      description: description?.trim() || null,
      dueAt: dueAt ? new Date(dueAt) : null,
      status: 'PENDING',
    },
  });

  revalidatePath('/[lang]/admin/clients', 'page');
  return invoice;
}

// ---------------------------------------------------------------------------
// Mark Invoice as PAID — Revenue Hook
// This is the Payload Server Hook equivalent.
// Atomically: marks invoice PAID + increments client's totalRevenue
// ---------------------------------------------------------------------------

export async function markInvoicePaid(invoiceId) {
  if (!invoiceId) throw new Error('invoiceId is required');

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    select: { id: true, status: true, amount: true, clientId: true, campaignId: true },
  });

  if (!invoice) throw new Error('Invoice not found');
  if (invoice.status === 'PAID') return { alreadyPaid: true };

  // Atomic transaction: mark paid + increment totalRevenue + log milestone
  await prisma.$transaction([
    // 1. Mark invoice as PAID
    prisma.invoice.update({
      where: { id: invoiceId },
      data: { status: 'PAID', paidAt: new Date() },
    }),

    // 2. Revenue Hook — increment client totalRevenue
    prisma.agencyClient.update({
      where: { id: invoice.clientId },
      data: { totalRevenue: { increment: invoice.amount } },
    }),

    // 3. Automatically log a client-facing milestone
    ...(invoice.campaignId
      ? [prisma.campaignLog.create({
          data: {
            campaignId: invoice.campaignId,
            action: 'INVOICE_PAID',
            details: `Invoice ${invoice.id.slice(0, 8)} — $${invoice.amount.toLocaleString()} confirmed received.`,
            user: 'ADMIN',
            isVisibleToClient: true, // Visible in client portal
          },
        })]
      : []),
  ]);

  revalidatePath('/[lang]/admin/clients', 'page');
  return { success: true, amount: invoice.amount };
}

// ---------------------------------------------------------------------------
// Mark Invoice as OVERDUE — for batch processing
// ---------------------------------------------------------------------------

export async function markOverdueInvoices() {
  const now = new Date();
  const result = await prisma.invoice.updateMany({
    where: { status: 'PENDING', dueAt: { lt: now } },
    data: { status: 'OVERDUE' },
  });
  revalidatePath('/[lang]/admin/clients', 'page');
  return result;
}

// ---------------------------------------------------------------------------
// List invoices for a client
// ---------------------------------------------------------------------------

export async function listClientInvoices(clientId) {
  return prisma.invoice.findMany({
    where: { clientId },
    include: { campaign: { select: { title: true } } },
    orderBy: { createdAt: 'desc' },
  });
}
