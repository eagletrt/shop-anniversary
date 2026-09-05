import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Guida alle Taglie - T-Shirt",
};

export default function TShirtSizeGuidePage() {
  const sizes = [
    { size: "XXS", length: "65,50", width: "44,00", sleeve: "20,00" },
    { size: "XS", length: "67,50", width: "47,00", sleeve: "21,00" },
    { size: "S", length: "72,50", width: "50,00", sleeve: "22,00" },
    { size: "M", length: "74,00", width: "53,00", sleeve: "23,00" },
    { size: "L", length: "75,50", width: "56,00", sleeve: "24,00" },
    { size: "XL", length: "78,50", width: "60,00", sleeve: "25,00" },
    { size: "2XL", length: "81,50", width: "64,00", sleeve: "26,00" },
    { size: "3XL", length: "84,50", width: "68,00", sleeve: "27,00" },
    { size: "4XL", length: "86,50", width: "72,00", sleeve: "28,00" },
    { size: "5XL", length: "88,50", width: "76,00", sleeve: "29,00" },
  ];

  return (
    <div className="container mx-auto max-w-5xl py-10">
      <div className="mb-6">
        <Link
          href="/"
          className="-ml-4 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Torna allo shop
        </Link>
      </div>

      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-8">
        <div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight">
            Guida alle Taglie - T-Shirt
          </h1>
          <p className="mb-8 text-muted-foreground">
            Tutte le misure sono in centimetri (cm) e sono indicative, con una
            tolleranza massima di 2 cm.
          </p>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">
                    Taglia
                  </th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">
                    Lunghezza
                  </th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">
                    Larghezza
                  </th>
                  <th className="px-4 py-3 font-medium whitespace-nowrap">
                    Manica
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sizes.map((row) => (
                  <tr
                    key={row.size}
                    className="bg-background transition-colors hover:bg-muted/50"
                  >
                    <td className="px-4 py-3 font-medium">{row.size}</td>
                    <td className="px-4 py-3">{row.length}</td>
                    <td className="px-4 py-3">{row.width}</td>
                    <td className="px-4 py-3">{row.sleeve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-6 pt-8 lg:pt-16">
          <div className="relative aspect-square w-full md:max-w-lg lg:max-w-none">
            <Image
              src="/T-Shirt_size.png"
              alt="T-Shirt"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
