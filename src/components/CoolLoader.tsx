"use client";
import { useEffect, useState } from "react";

interface Props {
  autoLoad?: Boolean;
}

export default function CoolLoader({ autoLoad = true }: Props) {
  const [loaderWidth, setLoaderWidth] = useState(0);

  useEffect(() => {
    if (!autoLoad) return;
    const loaderTimer = setInterval(() => {
      setLoaderWidth((prev) => (prev + 10 <= 100 ? prev + 10 : prev));
    }, 1000);

    return () => {
      clearInterval(loaderTimer);
    };
  }, [autoLoad]);

  return (
    <div className="fixed bg-black h-full w-full flex flex-col items-center justify-center">
      <div className="h-2 w-[15%] max-w-[600px] bg-gray-500">
        <div style={{ width: loaderWidth + "%" }} className={`h-full bg-red-500`}></div>
      </div>
    </div>
  );
}
