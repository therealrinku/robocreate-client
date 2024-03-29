"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function CoolLoader() {
  const [loaderWidth, setLoaderWidth] = useState(0);

  useEffect(() => {
    const loaderTimer = setInterval(() => {
      setLoaderWidth((prev) => {
        const newLoaderWidth = prev + 10;
        if (newLoaderWidth <= 100) {
          return prev + 10;
        }
        return prev;
      });
    }, 500);

    return () => {
      clearInterval(loaderTimer);
    };
  }, []);

  return (
    <div className="fixed bg-white left-0 top-0 h-screen w-screen flex flex-col items-center justify-center z-10">
      <Logo logoOnly />
      <div className="mt-5 h-2 w-[15%] max-w-[600px] bg-gray-200 ">
        <div style={{ width: loaderWidth + "%" }} className={`h-full bg-red-500 `}></div>
      </div>
    </div>
  );
}
