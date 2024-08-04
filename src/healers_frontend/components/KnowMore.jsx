export default function KnowMore(params) {
  return (
    <>
      <main className="grid grid-cols-12 gap-y-10 lg:pt-4 pt-10 lg:pb-28 pb-16 px-24">
        <section className="lg:col-span-6 col-span-12">
          <div className="max-w-xl space-y-2">
            <h1 className="lg:text-3xl text-2xl font-semibold tracking-tight">
              Know More About Us
            </h1>
            <p className="text-gray-500 lg:text-lg">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure
              adipisci fugit eius alias maxime commodi ipsa. Expedita vitae amet
              laboriosam!
            </p>
          </div>
        </section>
        <section className="lg:col-span-6 col-span-12">
          <form action="" className="">
            <div className="grid grid-cols-12 gap-6">
              <div className="lg:col-span-6 col-span-12 flex flex-col">
                <label className="font-medium" htmlFor="fname">
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  className="w-full py-2 border-0 border-b border-gray-500 outline-none bg-transparent placeholder-gray-400"
                  placeholder="Enter Your First Name"
                />
              </div>
              <div className="lg:col-span-6 col-span-12 flex flex-col">
                <label className="font-medium" htmlFor="lname">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  className="w-full py-2 border-0 border-b border-gray-500 outline-none bg-transparent placeholder-gray-400"
                  placeholder="Enter Your Last Name"
                />
              </div>
              <div className="col-span-12 flex flex-col">
                <label className="font-medium" htmlFor="lname">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="w-full py-2 border-0 border-b border-gray-500 outline-none bg-transparent placeholder-gray-400"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="col-span-12 flex flex-col">
                <label className="font-medium" htmlFor="message">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="w-full py-2 border-0 border-b border-gray-500 outline-none bg-transparent placeholder-gray-400"
                  placeholder="Enter Your Message Here"
                />
              </div>
            </div>
            <button className="px-10 py-3 drop-shadow-lg bg-dark/90 hover:bg-dark text-light my-6 rounded-xl transition duration-300 ease-in-out">
              Get Connected
            </button>
          </form>
        </section>
      </main>
    </>
  );
}
