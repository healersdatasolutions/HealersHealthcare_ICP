"use client";

import {
  ActivityIcon,
  CrossIcon,
  LayoutGridIcon,
  MenuIcon,
  ShoppingCartIcon,
  SpeechIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: LayoutGridIcon,
  },
  {
    name: "About",
    href: "/about",
    icon: ActivityIcon,
  },
  {
    name: "Health Records",
    href: "/ehr",
    icon: CrossIcon,
  },
  {
    name: "Appointments",
    href: "/appointments",
    icon: SpeechIcon,
  },
  {
    name: "Doctor Dashboard",
    href: "/doctor-dashboard",
    icon: ShoppingCartIcon,
  },
];

export default function Header(params) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = usePathname();

  return (
    <>
      <header className="fixed inset-x-0 z-20 lg:px-10 px-6 py-6 backdrop-blur-lg">
        <div className="flex items-center justify-between gap-20">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-primary"
          >
            Healers
          </Link>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden block"
          >
            <MenuIcon />
          </button>
          <nav className="lg:flex hidden items-center gap-10">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-2 font-medium tracking-wider text-sm hover:text-primary transition duration-300 ease-in-out px-4 py-2 hover:bg-primary/5 hover:shadow-inner rounded-full uppercase ${
                  router == item.href
                    ? "shadow-inner bg-primary/5 text-primary"
                    : "text-gray-700"
                }`}
              >
                <item.icon size={14} strokeWidth={2} />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-secondary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-primary"
            >
              Healers
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-4 py-8">
                {navigation.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 font-medium py-2 uppercase tracking-wider"
                  >
                    <item.icon size={14} strokeWidth={2.5} />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}
