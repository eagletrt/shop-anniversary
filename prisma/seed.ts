import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const items = [
    // =========================================================
    // 1. PRODOTTI EVENTO DEI 10 ANNI (Prezzo Pieno | tenYears: true)
    // =========================================================
    {
      nome: "Felpa",
      price: 50.0,
      description: "Felpa ufficiale Evento 10 Anni",
      tenYears: true,
      images: ["/images/felpa_front.png", "/images/felpa_back.png"],
      taglia: "M",
    },
    {
      nome: "Maglia",
      price: 30.0,
      description: "Maglia ufficiale Evento 10 Anni",
      tenYears: true,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "M",
    },
    {
      nome: "Cappellino",
      price: 20.0,
      description: "Cappellino con logo ricamato",
      tenYears: true,
      images: ["/images/cappellino.png"],
      taglia: null,
    },
    {
      nome: "Portachiavi RBR",
      price: 7.0,
      description: 'Portachiavi "REMOVE BEFORE RACE"',
      tenYears: true,
      images: ["/images/portachiavi.png"],
      taglia: null,
    },
    {
      nome: "Tote Bag",
      price: 12.0,
      description: "Comoda borsa in tela",
      tenYears: true,
      images: ["/images/totebag.png"],
      taglia: null,
    },
    {
      nome: "Tappetini",
      price: 7.0,
      description: "Tappetino per mouse racing",
      tenYears: true,
      images: ["/images/tappetino.png"],
      taglia: null,
    },
    // PACK EVENTO
    {
      nome: "Starter Pack",
      price: 20.0,
      description: "Include: Portachiavi RBR, Tote Bag, Tappetini",
      tenYears: true,
      images: ["/images/starter_pack.png"],
      taglia: null,
    },
    {
      nome: "Pro Pack",
      price: 60.0,
      description: "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag",
      tenYears: true,
      images: ["/images/pro_pack.png"],
      taglia: "M",
    },
    {
      nome: "VIP Pack",
      price: 110.0,
      description:
        "Include: Tutto (Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetini)",
      tenYears: true,
      images: ["/images/vip_pack.png"],
      taglia: "M",
    },

    // =========================================================
    // 2. PRODOTTI MEMBRI POST-EVENTO (Scontati | tenYears: false)
    // =========================================================
    {
      nome: "Felpa",
      price: 40.0,
      description: "Felpa ufficiale - Prezzo Membri",
      tenYears: false,
      images: ["/images/felpa_front.png", "/images/felpa_back.png"],
      taglia: "M",
    },
    {
      nome: "Maglia",
      price: 20.0,
      description: "Maglia ufficiale - Prezzo Membri",
      tenYears: false,
      images: ["/images/maglia_front.png", "/images/maglia_back.png"],
      taglia: "M",
    },
    {
      nome: "Cappellino",
      price: 15.0,
      description: "Cappellino con logo ricamato - Prezzo Membri",
      tenYears: false,
      images: ["/images/cappellino.png"],
      taglia: null,
    },
    {
      nome: "Portachiavi RBR",
      price: 5.0,
      description: 'Portachiavi "REMOVE BEFORE RACE" - Prezzo Membri',
      tenYears: false,
      images: ["/images/portachiavi.png"],
      taglia: null,
    },
    {
      nome: "Tote Bag",
      price: 10.0,
      description: "Comoda borsa in tela - Prezzo Membri",
      tenYears: false,
      images: ["/images/totebag.png"],
      taglia: null,
    },
    {
      nome: "Tappetini",
      price: 5.0,
      description: "Tappetino per mouse racing - Prezzo Membri",
      tenYears: false,
      images: ["/images/tappetino.png"],
      taglia: null,
    },
    // PACK MEMBRI
    {
      nome: "Starter Pack",
      price: 15.0,
      description: "Include: Portachiavi RBR, Tote Bag, Tappetini",
      tenYears: false,
      images: ["/images/starter_pack.png"],
      taglia: null,
    },
    {
      nome: "Pro Pack",
      price: 40.0,
      description: "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag",
      tenYears: false,
      images: ["/images/pro_pack.png"],
      taglia: "M",
    },
    {
      nome: "VIP Pack",
      price: 70.0,
      description:
        "Include: Tutto (Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetini)",
      tenYears: false,
      images: ["/images/vip_pack.png"],
      taglia: "M",
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
