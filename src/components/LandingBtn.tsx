"use client";
import { useUser } from "@/hooks/useUser";
import { Fragment, useState } from "react";
import LoginModal from "./LoginModal";
import { useRouter } from "next/navigation";
import CoolLoader from "./CoolLoader";

export default function LandingButton() {
  const { user, isLoading } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

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
        className="mt-10 w-36 p-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
      >
        {user ? "Dashboard " : "Get Started "}
      </button>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </Fragment>
  );
}
