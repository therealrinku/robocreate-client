import LandingButton from "@/components/LandingBtn";
import Logo from "@/components/Logo";

export default function Home() {
  return (
    <section className="bg-[#fff8f1] h-screen flex flex-col items-center justify-center">
      <div>
        <div className="flex flex-col items-center  w-full mb-12 text-center">
          <div className="my-5 border inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mx-auto mb-5 text-blue-600 -full bg-gray-50">
            <Logo logoOnly />
          </div>

          <p className="text-md">
            Lets continue your <br />
            <i>social media management journey</i>
            <br /> with <b>Robocreate</b>
          </p>

          <LandingButton />
        </div>
      </div>
    </section>
  );
}
