import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('ChangeMe123!', 12);

  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@uiri.org' },
    update: {},
    create: {
      email: 'admin@uiri.org',
      passwordHash,
      role: ['SUPER_ADMIN'],
      status: 'ACTIVE',
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      instituteName: 'ULTIMATE INTELLIFORGE RESEARCH INSTITUTE',
      tagline: 'Advancing technology through relentless research',
      homepageFeaturedDeptIds: [],
      homepageFeaturedPubIds: [],
    },
  });

  console.warn(`Seeded super admin: ${superAdmin.email}`);
  console.warn('Default password: ChangeMe123! — change on first login');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
