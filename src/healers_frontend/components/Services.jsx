"use client";

// import Image from "next/image";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

const content = [
  {
    title: "Electronic Health Records",
    description:
      "Keep all your health records organized and accessible. Upload, store, and share your medical documents securely with healthcare providers.",
    image:
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Appointments",
    description:
      "Book and manage your medical appointments with ease. Our app ensures you never miss a scheduled visit.",
    image:
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Doctor's Dashboard",
    description:
      "Doctors can manage their schedules, view patient records, and conduct virtual consultations all in one place.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "General Medical Consultation",
    description:
      "Get personalized medical advice from certified professionals anytime, anywhere. Our general medical consultation service ensures you receive the care you need without the hassle of appointments or waiting rooms.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Specialist Consultation",
    description:
      "Access top specialists in various medical fields through our app. From cardiologists to dermatologists, get expert opinions and treatment plans tailored to your needs.",
    image:
      "https://images.unsplash.com/photo-1576669801945-7a346954da5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Prescription Management",
    description:
      "Manage your prescriptions easily with our app. Request refills, track your medication, and receive reminders, all in one place.",
    image:
      "https://images.unsplash.com/photo-1576091358783-a212ec293ff3?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Services(params) {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <>
      <section className="relative flex items-center px-24">
        <div className="lg:my-20 mt-20 mb-4">
          <div className="max-w-xl space-y-2">
            <h1 className="lg:text-3xl text-2xl font-semibold tracking-tight">
              Our Services
            </h1>
            <p className="text-gray-500 lg:text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
              adipisci fugit eius alias maxime commodi ipsa. Expedita vitae amet
              laboriosam!
            </p>
          </div>
         
          <div className="grid grid-cols-12 gap-6 py-10">
            {content.map((item, index) => (
              <div
                onClick={open}
                key={index}
                className="cursor-pointer md:col-span-4 sm:col-span-6 col-span-12 ring-1 ring-gray-300 rounded-xl drop-shadow-lg shadow-inner hover:-translate-y-1.5 transition-all duration-300 ease-in-out"
              >
                <img
                  src={item.image}
                  width={500}
                  height={500}
                  alt={item.title}
                  className="w-full h-72 object-cover object-center rounded-t-xl"
                />
                <div className="p-6">
                  <h1 className="text-xl font-semibold mb-2">{item.title}</h1>
                  <p className="text-gray-500 lg:text-lg">
                    {item.description.slice(0, 90)}...{" "}
                    <span className="font-medium text-dark">Read More</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-4xl rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              ></DialogTitle>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
