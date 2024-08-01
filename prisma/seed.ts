import { PrismaClient, USER_ROLES } from '@prisma/client';
import { adminUser } from '__mock__/admin';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  //admin

  const admin = await prisma.user.upsert({
    where: {
      email: adminUser.email
    },
    create: {
      email: adminUser.email,
      role: USER_ROLES.ADMIN,
      password: adminUser.password,
      userAddress: adminUser.address && {
        createMany: {
          data: adminUser.address
        }
      }
    },
    update: {}
  });

  //mode

  console.log(admin);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
