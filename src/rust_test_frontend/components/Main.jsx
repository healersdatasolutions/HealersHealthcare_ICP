import main from "../public/main.svg";
import Image from "next/image";

export default function Main(params) {
  return (
    <>
      <section className="bg-gradient-to-tl from-primary/20 via-[#e7dff6] to-secondary lg:min-h-96 px-6">
        <div className="relative flex lg:flex-row flex-col items-center justify-between max-w-7xl mx-auto">
          <div className="space-y-2 lg:pt-44 lg:pb-32 py-10 lg:text-start text-center">
            <h1 className="lg:text-5xl text-3xl font-bold uppercase text-primary lg:w-[70%]">
              Treatment with the best doctors
            </h1>
            <p className="lg:text-xl text-gray-600 lg:w-[80%]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              corrupti rerum nisi hic, facere autem! Eum at tempora laborum
              dignissimos perferendis quod eius exercitationem recusandae iure,
              tenetur ipsa explicabo nisi.
            </p>
            <div className="py-4">
              <button
                type="submit"
                className="px-10 py-3 rounded-lg shadow bg-primary text-white font-semibold trackign-tight lg:w-fit w-full"
              >
                Book appointment
              </button>
            </div>
          </div>
          <Image
            src={main}
            width={300}
            height={300}
            alt="Main"
            className="lg:w-auto lg:h-80 w-auto h-72 lg:pt-0 pt-24 lg:order-last order-first"
          />
        </div>
      </section>
    </>
  );
}
