import { PrismaClient, USER_ROLES } from '@prisma/client';
import { adminUser } from '../__mock__/admin';
import { modeTypes } from '../__mock__/mode';
import { hashPassword } from '../src/contexts/shared/infrastructure/encryptor/encryptor';

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
      password: hashPassword(adminUser.password),
      userAddress: adminUser.address && {
        createMany: {
          data: adminUser.address
        }
      }
    },
    update: {}
  });

  //mode

  const isModeAvailable = await prisma.mode.count();

  if (isModeAvailable === 0) {
    const mode = modeTypes.map(({ images, modeDetail, name, trialCount, type, trialDuration }) => {
      return prisma.mode.create({
        data: {
          name,
          images,
          trialCount,
          type,
          trialDuration,
          modeDetail: {
            create: { ...modeDetail }
          }
        }
      });
    });
    await Promise.all(mode);
  }

  console.log(admin.email);
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
