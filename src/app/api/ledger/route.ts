import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { walletId, amount, type, description } = await request.json();

    // High-Integrity Financial Ledger using Native Prisma Transaction
    // Explicitly isolated from Payload CMS to ensure ACID compliance
    const transaction = await prisma.$transaction(async (tx) => {
      // 1. Fetch wallet
      const wallet = await tx.osWallet.findUnique({
        where: { id: walletId },
      });

      if (!wallet) throw new Error('Wallet not found');

      // 2. Perform logic
      const currentBalance = Number(wallet.balance);
      const transactionAmount = Number(amount);
      const newBalance = type === 'CREDIT' ? currentBalance + transactionAmount : currentBalance - transactionAmount;
      
      if (newBalance < 0) throw new Error('Insufficient funds');

      // 3. Update wallet
      const updatedWallet = await tx.osWallet.update({
        where: { id: walletId },
        data: { balance: newBalance },
      });

      // 4. Create financial transaction ledger entry
      const finTx = await tx.osFinancialTransaction.create({
        data: {
          clientId: wallet.clientId,
          amount: transactionAmount,
          type,
          description: description || 'API Transaction',
        },
      });

      return { updatedWallet, finTx };
    });

    return NextResponse.json({ success: true, data: transaction });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
