"use client";
import CoolLoader from "@/components/CoolLoader";
import FBLoginHandler from "@/core/FBLoginHandler";
import HomeBranding from "@/components/HomeBranding";
import { useFBConnection } from "@/hooks/useFBConnection";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isLoading, hasFBConnection } = useFBConnection();
  const router = useRouter();

  if (isLoading) {
    return <CoolLoader />;
  }

  if (hasFBConnection) {
    router.push("/dashboard");
    return;
  }

  return (
    <main className="flex flex-col items-center  gap-3 justify-center  h-screen w-full ">
      <HomeBranding />

      <div className="flex flex-col items-center">
        <p className="text-center font-bold">
          Connect your Facebook Page <br />& Get Started now.
        </p>
        <FBLoginHandler />
      </div>
    </main>
  );
}
