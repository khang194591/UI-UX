import {
  PermissionAction,
  PermissionResource,
  PrismaClient,
} from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

const seedPermission = async () => {
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
    console.log(permissions);

    await prisma.permission.createMany({ data: permissions });
  } catch (error) {
    console.log(error);
  }
};

export default seedPermission;
