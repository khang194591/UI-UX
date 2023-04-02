import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

const seedUser = async () => {
  try {
    for (let i = 0; i < 10; i++) {
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.name.fullName(),
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default seedUser;
