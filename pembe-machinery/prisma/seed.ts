import "dotenv/config";
import { prisma } from "../src/lib/prisma.ts";
import bcrypt from "bcryptjs";


async function main() {
  // ✅ 0) Create / Update Admin
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in .env");
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: "ADMIN" },
    create: { email: adminEmail, passwordHash, role: "ADMIN" },
  });

  // ✅ 1) Categories
  const categories = [
    { slug: "posho-mills", name: "Posho Mills" },
    { slug: "maize-shellers", name: "Maize Shellers" },
    { slug: "chaff-cutters", name: "Chaff Cutters" },
    { slug: "mixers", name: "Mixers" },
    { slug: "spare-parts", name: "Spare Parts" },
    { slug: "fabrication", name: "Fabrication" },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name },
      create: c,
    });
  }

  const posho = await prisma.category.findUnique({ where: { slug: "posho-mills" } });
  const shellers = await prisma.category.findUnique({ where: { slug: "maize-shellers" } });

  if (!posho || !shellers) throw new Error("Categories missing");

  // ✅ 2) Products
  await prisma.product.upsert({
    where: { slug: "electric-posho-mill-standard" },
    update: {},
    create: {
      slug: "electric-posho-mill-standard",
      name: "Electric Posho Mill (Standard)",
      summary: "Reliable milling for home and small biashara use.",
      description: "A durable electric posho mill suitable for daily milling.",
      featured: true,
      inStock: true,
      categoryId: posho.id,
      specs: {
        power: "3HP",
        output: "Approx. 80–120kg/hr",
        voltage: "Single phase",
      },
      images: ["https://via.placeholder.com/900x700.png?text=Posho+Mill"],
    },
  });

  await prisma.product.upsert({
    where: { slug: "maize-sheller-heavy-duty" },
    update: {},
    create: {
      slug: "maize-sheller-heavy-duty",
      name: "Maize Sheller (Heavy Duty)",
      summary: "Fast shelling with strong build quality.",
      description: "Heavy-duty maize sheller for farms and collection centers.",
      featured: true,
      inStock: true,
      categoryId: shellers.id,
      specs: {
        power: "Petrol/Diesel option",
        output: "High throughput",
      },
      images: ["https://via.placeholder.com/900x700.png?text=Maize+Sheller"],
    },
  });

  console.log(`✅ Seed complete. Admin: ${adminEmail}`);
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });