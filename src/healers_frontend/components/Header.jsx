"use client";

import {
  CircleHelpIcon,
  GanttChartIcon,
  HeartHandshakeIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

const navigation = [
  { name: "About", href: "/" },
  { name: "Health Records", href: "/ehr" },
  { name: "Doctors", href: "/doctor-dashboard" },
  { name: "Services", href: "" },
  { name: "Contact Us", href: "" },
];

const helpcenter = [
  {
    title: "How to Book an Appointment",
    description:
      "To book an appointment, navigate to the 'Doctors' section, select your preferred doctor, and choose a suitable date and time from their available slots.",
  },
  {
    title: "Managing Your Medical Records",
    description:
      "You can manage your medical records by going to the 'Services' section and selecting 'Medical Records'. Here, you can view, download, and upload your medical documents securely.",
  },
  {
    title: "Understanding Our Specialities",
    description:
      "Our 'Specialities' section provides detailed information about the various medical fields we cover, including cardiology, dermatology, and neurology. Click on each speciality to learn more about our expert services.",
  },
  {
    title: "Contacting Support",
    description:
      "If you need any assistance, visit the 'Contact Us' page. You can reach our support team via phone, email, or live chat for prompt help with any issues you may encounter.",
  },
  {
    title: "Patient Privacy and Data Security",
    description:
      "We prioritize your privacy and data security. Visit our 'Privacy Policy' section to learn more about how we protect your personal information and ensure confidentiality in all our services.",
  },
];

export default function Header(params) {
  const [open, setOpen] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  return (
    <>
      <header className="fixed inset-x-0 z-40">
        <nav className="lg:block hidden max-w-7xl xl:mx-auto mx-6 shadow px-8 py-6 my-6 rounded-full bg-black/40 backdrop-blur drop-shadow-lg">
          <div className="flex items-center justify-between text-light">
            <Link
              href="/"
              className="tracking-wide flex items-center gap-2 font-medium"
            >
              <HeartHandshakeIcon strokeWidth={1.5} size={24} />
              Healers Healthcare
            </Link>
            <ul className="flex items-center gap-10">
              {navigation.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <nav className="lg:hidden flex items-center justify-between m-4 px-6 py-4 rounded-full bg-black/40 backdrop-blur drop-shadow-lg text-light">
          <Link
            href="/"
            className="font-medium tracking-wide flex items-center gap-2"
          >
            <HeartHandshakeIcon strokeWidth={1.5} size={24} />
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={() => setOpenHelp(true)}>
              <CircleHelpIcon strokeWidth={1.5} size={24} />
            </button>

            <button onClick={() => setOpen(true)}>
              <GanttChartIcon strokeWidth={1.5} size={24} />
            </button>
            <Dialog className="relative z-50" open={open} onClose={setOpen}>
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-teal-900 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
              />

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full ps-20">
                    <DialogPanel
                      transition
                      className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                    >
                      <div className="flex h-full flex-col overflow-y-scroll bg-light px-6 py-8 shadow-xl">
                        <DialogTitle className="text-base font-semibold leading-6 text-gray-900 flex items-center justify-end">
                          <button onClick={() => setOpen(false)}>
                            <XIcon strokeWidth={1.5} size={24} />
                          </button>
                        </DialogTitle>
                        <div className="relative mt-6 h-full">
                          <ul className="flex flex-col divide-y divide-gray-500 h-full">
                            {navigation.map((item, index) => (
                              <li
                                key={index}
                                className="py-6"
                                onClick={() => setOpen(false)}
                              >
                                <Link
                                  href={item.href}
                                  className="flex items-center gap-3"
                                >
                                  <span>{index + 1}.</span> {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </nav>
        <Dialog className="relative z-50" open={openHelp} onClose={setOpenHelp}>
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-teal-900 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 w-screen overflow-y-auto p-4">
            <div className="flex min-h-full items-center justify-center">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <DialogPanel
                  transition
                  className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                >
                  <div className="flex h-full flex-col overflow-y-auto bg-light px-6 py-8 shadow-xl">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900 flex items-center justify-between">
                      Help Centre
                      <button onClick={() => setOpenHelp(false)}>
                        <XIcon strokeWidth={1.5} size={24} />
                      </button>
                    </DialogTitle>
                    <div className="relative mt-6 h-full overflow-auto">
                      <ul className="flex flex-col divide-y divide-gray-500 h-full">
                        {helpcenter.map((item, index) => (
                          <li key={index} className="py-6">
                            <h3>{item.title}</h3>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </div>
        </Dialog>
      </header>
    </>
  );
}
