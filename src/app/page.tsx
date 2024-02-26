import LandingButton from "@/components/LandingBtn";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <section>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
        <div className="flex flex-col w-full mb-12 text-center">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mx-auto mb-5 text-blue-600 rounded-full bg-gray-50">
            <Logo logoOnly />
          </div>
          <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter text-neutral-600 md:text-5xl lg:text-6xl lg:max-w-7xl">
            Robocreate is your new
            <br className="hidden lg:block" />
            social media manager
          </h1>

          <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-center text-gray-500">
            check it out right now!
          </p>

          <LandingButton />
        </div>
      </div>
    </section>
  );
}
