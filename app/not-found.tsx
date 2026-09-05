import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-start space-y-4 text-center">
      <h1 className="text-2xl font-black tracking-tighter uppercase italic md:text-4xl">
        L&apos;aquila ha perso la strada
      </h1>
      <Image src="/miss.png" className="rounded-xl" alt="404" width={512} height={512} />
      <p className="mx-auto max-w-2xl font-mono text-sm text-muted-foreground md:text-base">
        Controlla il link e riprova
      </p>
      <Link href="/">
        <Button variant="outline">
          <Home />
          Torna allo shop
        </Button>
      </Link>
    </div>
  );
}
