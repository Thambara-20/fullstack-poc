// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Creating root menu
  const rootMenu = await prisma.menu.create({
    data: { name: 'System Management' },
  });

  // Creating first-level categories
  const systems = await prisma.menu.create({
    data: { name: 'Systems', parentId: rootMenu.id },
  });

  const apiList = await prisma.menu.create({
    data: { name: 'API List', parentId: rootMenu.id },
  });

  const usersGroups = await prisma.menu.create({
    data: { name: 'Users & Groups', parentId: rootMenu.id },
  });

  // Creating subcategories
  await prisma.menu.createMany({
    data: [
      { name: 'System Code', parentId: systems.id },
      { name: 'Code Registration', parentId: systems.id },
      { name: 'Code Registration - 2', parentId: systems.id },
      { name: 'Properties', parentId: systems.id },
      { name: 'Menus', parentId: systems.id },
      { name: 'Menu Registration', parentId: systems.id },
      { name: 'API Registration', parentId: apiList.id },
      { name: 'API Edit', parentId: apiList.id },
      { name: 'Users', parentId: usersGroups.id },
      { name: 'User Account Registration', parentId: usersGroups.id },
      { name: 'Groups', parentId: usersGroups.id },
      { name: 'User Group Registration', parentId: usersGroups.id },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Add this script to package.json
// "scripts": {
//   "seed": "npx ts-node prisma/seed.ts"
// }
