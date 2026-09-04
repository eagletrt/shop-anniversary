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
    // 1. EVENTO DEI 10 ANNI (Prezzo pieno | tenYears: true)
    // =========================================================

    // -- FELPA --
    {
      nome: "Felpa",
      price: 50.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: true,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "XXS",
    },
    {
      nome: "Felpa",
      price: 50.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: true,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "XS",
    },
    {
      nome: "Felpa",
      price: 50.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: true,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "S",
    },
    {
      nome: "Felpa",
      price: 50.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: true,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "M",
    },
    {
      nome: "Felpa",
      price: 50.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: true,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "L",
    },
    {
      nome: "Felpa",
      price: 50.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: true,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "XL",
    },
    {
      nome: "Felpa",
      price: 50.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: true,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "2XL",
    },
    {
      nome: "Felpa",
      price: 50.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: true,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "3XL",
    },
    {
      nome: "Felpa",
      price: 50.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: true,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "4XL",
    },
    {
      nome: "Felpa",
      price: 50.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: true,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "5XL",
    },

    // -- MAGLIA --
    {
      nome: "Maglia",
      price: 30.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: true,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "XXS",
    },
    {
      nome: "Maglia",
      price: 30.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: true,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "XS",
    },
    {
      nome: "Maglia",
      price: 30.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: true,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "S",
    },
    {
      nome: "Maglia",
      price: 30.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: true,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "M",
    },
    {
      nome: "Maglia",
      price: 30.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: true,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "L",
    },
    {
      nome: "Maglia",
      price: 30.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: true,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "XL",
    },
    {
      nome: "Maglia",
      price: 30.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: true,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "2XL",
    },
    {
      nome: "Maglia",
      price: 30.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: true,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "3XL",
    },
    {
      nome: "Maglia",
      price: 30.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: true,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "4XL",
    },
    {
      nome: "Maglia",
      price: 30.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: true,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "5XL",
    },

    // -- ACCESSORI EVENTO (Taglia null) --
    {
      nome: "Cappellino",
      price: 20.0,
      description: "Ricamo davanti mentre stampa ai lati.",
      tenYears: true,
      images: [
        "/images/cap_front.png",
        "/images/cap_dx.png",
        "/images/cap_sx.png",
      ],
      taglia: null,
    },
    {
      nome: "Portachiavi RBR",
      price: 7.0,
      description: "Remove before race ricamato, mentre il logo stampato.",
      tenYears: true,
      images: ["/images/Portachiavi_RBR.png"],
      taglia: null,
    },
    {
      nome: "Tote Bag",
      price: 12.0,
      description: "Stampata da un solo lato.",
      tenYears: true,
      images: ["/images/tote-bag.webp"],
      taglia: null,
    },
    {
      nome: "Tappetini",
      price: 7.0,
      description: "Stampato con la grafica in immagine.",
      tenYears: true,
      images: ["/images/MousePad.png"],
      taglia: null,
    },
    {
      nome: "Starter Pack",
      price: 20.0,
      description: "Include: Portachiavi RBR, Tote Bag, Tappetino.",
      tenYears: true,
      images: [
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: null,
    },

    // -- PRO PACK EVENTO --
    {
      nome: "Pro Pack",
      price: 60.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "XXS",
    },
    {
      nome: "Pro Pack",
      price: 60.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "XS",
    },
    {
      nome: "Pro Pack",
      price: 60.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "S",
    },
    {
      nome: "Pro Pack",
      price: 60.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "M",
    },
    {
      nome: "Pro Pack",
      price: 60.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "L",
    },
    {
      nome: "Pro Pack",
      price: 60.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "XL",
    },
    {
      nome: "Pro Pack",
      price: 60.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "2XL",
    },
    {
      nome: "Pro Pack",
      price: 60.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "3XL",
    },
    {
      nome: "Pro Pack",
      price: 60.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "4XL",
    },
    {
      nome: "Pro Pack",
      price: 60.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "5XL",
    },

    // -- VIP PACK EVENTO --
    {
      nome: "VIP Pack",
      price: 110.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "XXS",
    },
    {
      nome: "VIP Pack",
      price: 110.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "XS",
    },
    {
      nome: "VIP Pack",
      price: 110.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "S",
    },
    {
      nome: "VIP Pack",
      price: 110.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "M",
    },
    {
      nome: "VIP Pack",
      price: 110.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "L",
    },
    {
      nome: "VIP Pack",
      price: 110.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "XL",
    },
    {
      nome: "VIP Pack",
      price: 110.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "2XL",
    },
    {
      nome: "VIP Pack",
      price: 110.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "3XL",
    },
    {
      nome: "VIP Pack",
      price: 110.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "4XL",
    },
    {
      nome: "VIP Pack",
      price: 110.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: true,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "5XL",
    },

    // =========================================================
    // 2. MEMBRI POST-EVENTO (Scontati | tenYears: false)
    // =========================================================

    // -- FELPA MEMBRI --
    {
      nome: "Felpa",
      price: 40.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: false,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "XXS",
    },
    {
      nome: "Felpa",
      price: 40.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: false,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "XS",
    },
    {
      nome: "Felpa",
      price: 40.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: false,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "S",
    },
    {
      nome: "Felpa",
      price: 40.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: false,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "M",
    },
    {
      nome: "Felpa",
      price: 40.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: false,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "L",
    },
    {
      nome: "Felpa",
      price: 40.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: false,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "XL",
    },
    {
      nome: "Felpa",
      price: 40.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: false,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "2XL",
    },
    {
      nome: "Felpa",
      price: 40.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: false,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "3XL",
    },
    {
      nome: "Felpa",
      price: 40.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: false,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "4XL",
    },
    {
      nome: "Felpa",
      price: 40.0,
      description: "Ricamo davanti (logo) mentre dietro stampa.",
      tenYears: false,
      images: ["/images/Felpa_front.webp", "/images/Felpa_back.webp"],
      taglia: "5XL",
    },

    // -- MAGLIA MEMBRI --
    {
      nome: "Maglia",
      price: 20.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: false,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "XXS",
    },
    {
      nome: "Maglia",
      price: 20.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: false,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "XS",
    },
    {
      nome: "Maglia",
      price: 20.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: false,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "S",
    },
    {
      nome: "Maglia",
      price: 20.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: false,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "M",
    },
    {
      nome: "Maglia",
      price: 20.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: false,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "L",
    },
    {
      nome: "Maglia",
      price: 20.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: false,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "XL",
    },
    {
      nome: "Maglia",
      price: 20.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: false,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "2XL",
    },
    {
      nome: "Maglia",
      price: 20.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: false,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "3XL",
    },
    {
      nome: "Maglia",
      price: 20.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: false,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "4XL",
    },
    {
      nome: "Maglia",
      price: 20.0,
      description: "Stampa sia davanti che dietro.",
      tenYears: false,
      images: ["/images/T-Shirt_front.png", "/images/T-Shirt_back.png"],
      taglia: "5XL",
    },

    // -- ACCESSORI MEMBRI (Taglia null) --
    {
      nome: "Cappellino",
      price: 15.0,
      description: "Ricamo davanti mentre stampa ai lati.",
      tenYears: false,
      images: [
        "/images/cap_front.png",
        "/images/cap_dx.png",
        "/images/cap_sx.png",
      ],
      taglia: null,
    },
    {
      nome: "Portachiavi RBR",
      price: 5.0,
      description: "Remove before race ricamato, mentre il logo stampato.",
      tenYears: false,
      images: ["/images/Portachiavi_RBR.png"],
      taglia: null,
    },
    {
      nome: "Tote Bag",
      price: 10.0,
      description: "Stampata da un solo lato.",
      tenYears: false,
      images: ["/images/tote-bag.webp"],
      taglia: null,
    },
    {
      nome: "Tappetini",
      price: 5.0,
      description: "Stampato con la grafica in immagine.",
      tenYears: false,
      images: ["/images/MousePad.png"],
      taglia: null,
    },
    {
      nome: "Starter Pack",
      price: 15.0,
      description: "Include: Portachiavi RBR, Tote Bag, Tappetino.",
      tenYears: false,
      images: [
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: null,
    },

    // -- PRO PACK MEMBRI --
    {
      nome: "Pro Pack",
      price: 40.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "XXS",
    },
    {
      nome: "Pro Pack",
      price: 40.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "XS",
    },
    {
      nome: "Pro Pack",
      price: 40.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "S",
    },
    {
      nome: "Pro Pack",
      price: 40.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "M",
    },
    {
      nome: "Pro Pack",
      price: 40.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "L",
    },
    {
      nome: "Pro Pack",
      price: 40.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "XL",
    },
    {
      nome: "Pro Pack",
      price: 40.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "2XL",
    },
    {
      nome: "Pro Pack",
      price: 40.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "3XL",
    },
    {
      nome: "Pro Pack",
      price: 40.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "4XL",
    },
    {
      nome: "Pro Pack",
      price: 40.0,
      description:
        "Include: Maglia, Cappellino, Portachiavi RBR, Tote Bag. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
      ],
      taglia: "5XL",
    },

    // -- VIP PACK MEMBRI --
    {
      nome: "VIP Pack",
      price: 70.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "XXS",
    },
    {
      nome: "VIP Pack",
      price: 70.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "XS",
    },
    {
      nome: "VIP Pack",
      price: 70.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "S",
    },
    {
      nome: "VIP Pack",
      price: 70.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "M",
    },
    {
      nome: "VIP Pack",
      price: 70.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "L",
    },
    {
      nome: "VIP Pack",
      price: 70.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "XL",
    },
    {
      nome: "VIP Pack",
      price: 70.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "2XL",
    },
    {
      nome: "VIP Pack",
      price: 70.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "3XL",
    },
    {
      nome: "VIP Pack",
      price: 70.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "4XL",
    },
    {
      nome: "VIP Pack",
      price: 70.0,
      description:
        "Include: Felpa, Maglia, Cappellino, Portachiavi RBR, Tote Bag, Tappetino. (Nota: se hai taglie diverse tra i capi, scrivilo nelle note dell'ordine).",
      tenYears: false,
      images: [
        "/images/Felpa_front.webp",
        "/images/T-Shirt_front.png",
        "/images/cap_front.png",
        "/images/Portachiavi_RBR.png",
        "/images/tote-bag.webp",
        "/images/MousePad.png",
      ],
      taglia: "5XL",
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
