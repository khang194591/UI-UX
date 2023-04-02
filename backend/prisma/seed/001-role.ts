import {
  PermissionAction,
  PermissionResource,
  PrismaClient,
} from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

const seedRole = async () => {
  const resources = Object.values(PermissionResource);
  const actions = Object.values(PermissionAction);
  const permissions: any[] = [];

  resources.map((resource: PermissionResource) => {
    actions.map((action: PermissionAction) => {
      permissions.push({
        action,
        resource,
      });
    });
  });

  try {
    await prisma.role.createMany({
      data: [
        {
          name: 'admin',
          description: 'Admin',
        },
        {
          name: 'user',
          description: 'User',
        },
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

export default seedRole;
