import LandingMain from "../assets/landing_main.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex relative flex-col items-center  gap-3 justify-center w-full ">
      <div className="flex flex-col items-center">
        <Image src={LandingMain} alt="main" className="h-full w-full" />
      </div>
    </main>
  );
}
