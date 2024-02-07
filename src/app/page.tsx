"use client";
import CoolLoader from "@/components/CoolLoader";
import { useEffect, useState } from "react";
import { FacebookProvider } from "react-facebook";
import FbHandler from "@/core/FBHandler";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setInterval(() => setShowLoader(false), 3000);
  }, []);

  if (showLoader) {
    return <CoolLoader />;
  }

  return <HomeChild />;
}

function HomeChild() {
  return (
    <main className="flex flex-col items-center  gap-3 justify-center h-screen w-full ">
      <img
        className="h-20 w-20"
        src="https://camo.githubusercontent.com/e9c1d8b7beb6f26cefc5ab0742b592df1abb0ceb398ee74c1ce33028460b3d9b/68747470733a2f2f63646e2d69636f6e732d706e672e666c617469636f6e2e636f6d2f3132382f31323433352f31323433353233342e706e67"
      />
      <p className="mt-5 uppercase italic font-bold">Robocreate</p>

      <FacebookProvider appId={process.env.NEXT_APP_FB_APP_ID || "hello_there"}>
        <FbHandler />
      </FacebookProvider>

      <p className="fixed bottom-5 mt-5 italic text-xs text-red-500">This is just a test mode. Lots of work needed 🫠</p>
    </main>
  );
}
