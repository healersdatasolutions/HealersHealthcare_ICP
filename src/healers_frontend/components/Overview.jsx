import { ArrowRightIcon } from "lucide-react";
// import Image from "next/image";

export default function Overview(params) {
  return (
    <>
      <div className="absolute inset-0 bg-teal-900 "></div>
      <main className="grid grid-cols-12 items-center justify-between h-screen lg:py-0 py-20 px-24">
        <section className="lg:col-span-6 col-span-12 lg:order-first order-last flex flex-col items-start gap-4 text-light lg:mt-20">
          <h1 className="lg:text-6xl text-3xl font-medium tracking-tighter drop-shadow-xl">
            Advanced Care, Exceptional Outcomes.
          </h1>
          <p className="text-gray-300 lg:text-lg drop-shadow-lg">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
            possimus accusamus asperiores aspernatur! Fugiat odio vero eligendi
            dicta accusamus quis, sunt tempora maxime minus, numquam asperiores
            iusto, voluptate vel voluptatibus.
          </p>
          <button className="lg:text-base text-sm px-10 py-3 rounded-full bg-light hover:bg-white transition duration-300 ease-in-out text-dark font-semibold lg:mt-6 mt-2 flex items-center gap-2 drop-shadow-lg">
            Book appointment <ArrowRightIcon size={20} />
          </button>
        </section>
        <section className="hidden lg:block absolute right-0 col-span-6 w-[46%] h-screen drop-shadow-xl">
          {/* <img
            src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={1000}
            height={1000}
            alt="Banner"
            className="w-full h-full object-cover object-center"
          />  */}
        </section>
      </main>
    </>
  );
}
