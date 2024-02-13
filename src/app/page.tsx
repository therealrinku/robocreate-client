import { getMe } from "@/services/authService";
import LandingMain from "../assets/landing_main.svg";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const response = await getMe();

  // if user is logged in, go to dashboard
  if (response.ok) {
    redirect("/dashboard");
  }

  return (
    <main className="flex relative flex-col items-center  gap-3 justify-center h-[88vh] w-full ">
      <div className="flex flex-col items-center">
        <Image src={LandingMain} alt="main" className="h-full w-full" />
      </div>
    </main>
  );
}
