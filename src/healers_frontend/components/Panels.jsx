import {
  ArrowUpRightIcon,
  LayersIcon,
  MessageCircleHeartIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Link from "next/link";

const content = [
  {
    title: "Electronic Health Records",
    description: "",
    href: "/ehr",
    icon: LayersIcon,
  },
  {
    title: "Appointments",
    description: "",
    href: "/appointments",
    icon: MessageCircleHeartIcon,
  },
  {
    title: "Inventory",
    description: "",
    href: "/inventory",
    icon: ShoppingBagIcon,
  },
];

export default function Panels(params) {
  return (
    <>
      <section className="relative lg:h-screen flex items-center px-24">
        <div className="mt-20">
          <div className="max-w-xl space-y-2">
            <h1 className="lg:text-3xl text-2xl font-semibold tracking-tight">
              Our Panels
            </h1>
            <p className="text-gray-500 lg:text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
              adipisci fugit eius alias maxime commodi ipsa. Expedita vitae amet
              laboriosam!
            </p>
          </div>
          <div className="grid grid-cols-12 gap-6 py-10">
            {content.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="lg:col-span-4 sm:col-span-6 col-span-12 p-6 space-y-2 ring-1 ring-gray-300 rounded-xl drop-shadow-lg hover:-translate-y-1.5 hover:ring-2 transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center justify-between mb-6">
                  <item.icon />
                  <ArrowUpRightIcon />
                </div>
                <h1 className="text-xl font-semibold">{item.title}</h1>
                <p className="text-gray-500 lg:text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                  molestiae error fugiat sequi dolore obcaecati.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
