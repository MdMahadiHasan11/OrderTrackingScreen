"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavLink {
  name: string;
  href: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
}

export function MobileMenu({ navLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex md:hidden items-center gap-2">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingBag className="h-5 w-5" />
        <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-primary" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* Base UI SheetTrigger natively renders a button, so we style it directly to match ghost/icon button look */}
        <SheetTrigger className="inline-flex items-center justify-center h-9 w-9 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </SheetTrigger>
        
        <SheetContent side="right" className="w-75 md:w-87.5">
          <SheetHeader>
            <SheetTitle className="text-left text-lg font-bold">
              Daily<span className="text-primary">Shop</span>
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-6 mt-8">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium transition-colors hover:text-primary p-2 rounded-md hover:bg-muted"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <hr className="my-2" />

            <div className="flex flex-col gap-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <User className="h-4 w-4" />
                My Account
              </Button>
              <Button className="w-full justify-start gap-2">
                <ShoppingBag className="h-4 w-4" />
                Cart (0)
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}