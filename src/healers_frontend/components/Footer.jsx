import { HeartHandshakeIcon } from "lucide-react";

const footer = [
  {
    name: "Quick Links",
    options: [
      { name: "About", href: "" },
      { name: "Our Vision", href: "" },
      { name: "Services", href: "" },
      { name: "Doctors", href: "" },
      { name: "Help Centre", href: "" },
    ],
  },
  {
    name: "Our Socials",
    options: [
      { name: "Instagram", href: "" },
      { name: "Facebook", href: "" },
      { name: "Twitter", href: "" },
      { name: "LinkedIn", href: "" },
    ],
  },
  {
    name: "Legal",
    options: [
      { name: "Privacy Policy", href: "" },
      { name: "Terms Of Service", href: "" },
      { name: "Contact Information", href: "" },
    ],
  },
];

export default function Footer(params) {
  return (
    <>
      <footer className="bg-teal-900 xl:px-0 px-8">
        <div className="flex items-center max-w-7xl mx-auto py-20">
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <section className="lg:col-span-3 md:col-span-4 col-span-12 space-y-4">
              <h1 className="font-medium text-light drop-shadow-lg text-xl flex items-center gap-2">
                <HeartHandshakeIcon strokeWidth={1.5} size={24} />
                Healers Healthcare
              </h1>
              <p className="lg:text-lg text-gray-400 drop-shadow-lg">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Delectus accusantium nam neque molestias repellat! Nemo numquam
                fuga eius possimus maxime necessitatibus consectetur distinctio
                sequi dignissimos reiciendis.
              </p>
            </section>
            {footer.map((item, index) => (
              <section
                key={index}
                className="lg:col-span-3 md:col-span-4 col-span-6 lg:mx-auto"
              >
                <h3 className="text-light lg:text-lg mb-4">{item.name}</h3>
                <ul className="lg:text-lg space-y-1">
                  {item.options.map((option, index) => (
                    <li key={index}>
                      <a
                        href={option.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 ease-in-out"
                      >
                        {option.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
