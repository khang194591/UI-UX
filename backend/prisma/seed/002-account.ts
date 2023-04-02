import { PrismaClient } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient();

const seedAccount = async () => {
  try {
    // Create Super admin account
    const adminAccount = await prisma.account.create({
      data: {
        email: process.env.SUPER_ADMIN_ACCOUNT,
        password: hashSync(process.env.SUPER_ADMIN_PASSWORD, genSaltSync(10)),
      },
    });
    await prisma.user.create({
      data: {
        email: adminAccount.email,
        name: 'Admin',
        status: 'ACTIVE',
        accountId: adminAccount.id,
      },
    });

    // Create normal account
    const account = await prisma.account.create({
      data: {
        email: 'user@user.com',
        password: hashSync('user', genSaltSync(10)),
      },
    });
    await prisma.user.create({
      data: {
        email: account.email,
        accountId: account.id,
        name: 'User',
        status: 'ACTIVE',
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default seedAccount;
