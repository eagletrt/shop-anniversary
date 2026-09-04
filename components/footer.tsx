"use client";

import Image from "next/image";
import Logo_dark from "@/public/logo_dark.svg";

export function Footer() {
  return (
    <footer className="z-10 mt-auto rounded-t-4xl border-t border-muted-foreground bg-card px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-24">
      {/* Top row */}
      <div className="grid grid-cols-1 gap-6 text-center text-sm text-muted-foreground sm:grid-cols-3 sm:text-left">
        {/* Sede operativa */}
        <div>
          <p className="font-semibold text-foreground">Sede operativa</p>
          <p>
            <a href="https://goo.gl/maps/ZwzsZx3RUqU9Xk5A7" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              Via Sommarive n. 9
              <br />
              38123 Povo (TN) - Italy
            </a>
          </p>
        </div>

        {/* Sede legale */}
        <div className="sm:text-center">
          <p className="font-semibold text-foreground">Sede legale</p>
          <p>
            <a href="https://goo.gl/maps/ogMA9oWj6gYVjdmLA" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              Via Fortunato Zeni n. 8
              <br />
              38068 Rovereto (TN) - Italy
            </a>
          </p>
        </div>

        {/* Contatti */}
        <div className="sm:text-right">
          <p className="font-semibold text-foreground">Contatti</p>
          <p>
            <a href="mailto:fsae@eagletrt.it" className="hover:text-primary">
              fsae@eagletrt.it
            </a>
          </p>
          <p>
            <a href="tel:+390461285271" className="hover:text-primary">
              +39 0461 285271
            </a>
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-muted-foreground/30" />

      {/* Bottom row */}
      <div className="grid grid-cols-1 items-center gap-4 text-center text-xs text-muted-foreground sm:grid-cols-3">
        {/* Copyright */}
        <p className="sm:text-left">© 2026 E-Agle TRT ASD. All rights reserved.</p>

        {/* Logo linking to main website */}
        <div className="flex justify-center">
          <a
            href="https://www.eagletrt.it"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <Image
              src={Logo_dark}
              alt="E-Agle TRT Logo"
              width={40}
              height={40}
              priority
            />
          </a>
        </div>

        {/* P.IVA */}
        <p className="sm:text-right">P.IVA: 02446060226</p>
      </div>
    </footer>
  );
}
