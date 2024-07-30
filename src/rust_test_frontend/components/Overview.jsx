import Image from "next/image";
import Main from "./Main";
import ehr from "/ehr.svg";
import appointment from "/appointment.svg";
import inventory from "/inventory.svg";
import Link from "next/link";

export default function Overview() {
  const sections = [
    { src: ehr, alt: "EHR", title: "Health Records", link: "ehr" },
    {
      src: appointment,
      alt: "Appointments",
      title: "Appointments",
      link: "appointments",
    },
    { src: inventory, alt: "Inventory", title: "Inventory", link: "inventory" },
  ];

  return (
    <>
      <main className="">
        <Main />
        <section className="flex lg:flex-row flex-col items-center justify-between gap-10 lg:px-10 px-6 py-10 text-center">
          {sections.map((section, index) => (
            <Link
              key={index}
              href={`/${section.link}`}
              className="hover:bg-primary/20 bg-gradient-to-b from-secondary/60 to-[#e7dff6] hover:-translate-y-2 lg:px-20 px-6 py-10 rounded-xl shadow-sm transition duration-300 ease-in-out"
            >
              <Image
                src={section.src}
                width={500}
                height={500}
                alt={section.alt}
                className="lg:w-56 lg:h-56 w-48 h-48 object-contain mx-auto rounded-xl"
              />
              <h1 className="lg:text-2xl text-xl tracking-tight font-medium mt-10 text-black/80">
                {section.title}
              </h1>
              <p className="text-gray-500 tracking-wide">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laborum.
              </p>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
