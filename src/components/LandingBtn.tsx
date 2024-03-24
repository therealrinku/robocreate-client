"use client";
import { useUser } from "@/hooks/useUser";
import { Fragment, useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { useRouter } from "next/navigation";
import CoolLoader from "./CoolLoader";

export default function LandingButton() {
  const { user, isLoading: isUserLoading } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(isUserLoading);

  useEffect(() => {
    if (!isUserLoading) {
      setIsLoading(false);
    }
  }, [isUserLoading]);

  function handleClick() {
    if (user) {
      router.push("/dashboard");
    } else {
      setShowLoginModal(true);
    }
  }

  if (isLoading) {
    return <CoolLoader />;
  }

  return (
    <Fragment>
      <button
        onClick={handleClick}
        className="text-xs font-bold mt-5 px-12 py-3 bg-red-500 text-white  shadow-md hover:bg-red-600"
      >
        {user ? "Dashboard " : "Get Started "}
      </button>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </Fragment>
  );
}
