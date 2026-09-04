import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const items = [
    {
      nome: "T-shirt Evoluzione Monoposto (Fenice - Kraken)",
      price: 25.0,
      images: ["/placeholder-neutral.jpg", "/placeholder-lifestyle.jpg"],
      taglia: "M",
    },
    {
      nome: "Felpa Ufficiale E-AGLE",
      price: 50.0,
      images: ["/placeholder-neutral.jpg", "/placeholder-lifestyle.jpg"],
      taglia: "L",
    },
    {
      nome: 'Portachiavi "REMOVE BEFORE RACE"',
      price: 8.0,
      images: ["/placeholder-neutral.jpg", "/placeholder-lifestyle.jpg"],
      taglia: null,
    },
    {
      nome: "Cappellino Team KRAKEN",
      price: 15.0,
      images: ["/placeholder-neutral.jpg", "/placeholder-lifestyle.jpg"],
      taglia: null,
    },
    {
      nome: "Polo di Rappresentanza",
      price: 35.0,
      images: ["/placeholder-neutral.jpg", "/placeholder-lifestyle.jpg"],
      taglia: "M",
    },
    {
      nome: "Tazza Telemetria",
      price: 12.0,
      images: ["/placeholder-neutral.jpg", "/placeholder-lifestyle.jpg"],
      taglia: null,
    },
    {
      nome: "Zaino Tecnico",
      price: 45.0,
      images: ["/placeholder-neutral.jpg", "/placeholder-lifestyle.jpg"],
      taglia: null,
    },
    {
      nome: "Set Adesivi E-AGLE",
      price: 5.0,
      images: ["/placeholder-neutral.jpg", "/placeholder-lifestyle.jpg"],
      taglia: null,
    },
    {
      nome: "Ombrello Racing",
      price: 20.0,
      images: ["/placeholder-neutral.jpg", "/placeholder-lifestyle.jpg"],
      taglia: null,
    },
  ];

  console.log("Seeding items...");
  for (const item of items) {
    await prisma.item.create({
      data: item,
    });
  }
  console.log("Done seeding.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
