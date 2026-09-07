import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SkeletonImage } from "@/components/skeleton-image";

export const metadata = {
  title: "Guida alle Taglie - Felpa",
};

export default function HoodieSizeGuidePage() {
  const sizes = [
    { size: "XXS", length: "67,00", width: "48,00", sleeve: "62,00" },
    { size: "XS", length: "69,00", width: "51,00", sleeve: "64,00" },
    { size: "S", length: "71,00", width: "54,00", sleeve: "66,00" },
    { size: "M", length: "74,00", width: "57,00", sleeve: "68,00" },
    { size: "L", length: "76,00", width: "60,00", sleeve: "69,00" },
    { size: "XL", length: "78,00", width: "64,00", sleeve: "70,00" },
    { size: "2XL", length: "80,00", width: "68,00", sleeve: "71,00" },
    { size: "3XL", length: "82,00", width: "72,00", sleeve: "72,00" },
    { size: "4XL", length: "84,00", width: "76,00", sleeve: "73,00" },
    { size: "5XL", length: "86,00", width: "80,00", sleeve: "74,00" },
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
            Guida alle Taglie - Felpa
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
          <div className="relative aspect-square w-full overflow-hidden rounded-xl md:max-w-lg lg:max-w-none">
            <SkeletonImage src="/Felpa_size.webp" alt="Felpa" />
          </div>
        </div>
      </div>
    </div>
  );
}
