import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const token = await prisma.secureToken.findUnique({
    where: { id: '1613a1da-508e-4912-bbbd-7ab33f5a46a9' },
    include: { project: true }
  });
  console.log('BY ID:', token);
  
  if (!token) {
     const byHash = await prisma.secureToken.findFirst();
     console.log('ANY TOKEN:', byHash);
  }
  
  process.exit(0);
}
check();
