import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-start space-y-4 text-center">
      <h2>The eagle has lost its way</h2>
      <Image src="/miss.png" alt="404" width={512} height={512} />
      <p>Check the link and try again</p>
      <Link href="/">
        <Button variant="outline">
          <Home />
          Go back to the Home
        </Button>
      </Link>
    </div>
  );
}
