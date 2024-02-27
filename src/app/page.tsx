import LandingButton from "@/components/LandingBtn";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <section className="bg-[#fff8f1] h-screen border-l-8 border-red-500 flex flex-col items-center justify-center">
      <div>
        <div className="flex flex-col items-center  w-full mb-12 text-center">
          <div className="my-5 border inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mx-auto mb-5 text-blue-600 rounded-full bg-gray-50">
            <Logo logoOnly />
          </div>

          <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
            Robocreate is your new
            <br className="hidden lg:block" />
            social media manager
          </h1>

          <LandingButton />
        </div>
      </div>
    </section>
  );
}
