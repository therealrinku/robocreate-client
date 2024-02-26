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
      <button onClick={handleClick} className="mx-auto mt-8 text-sm font-semibold text-blue-600 hover:text-neutral-600">
        {user ? "Dashboard " : "Get Started "}»
      </button>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </Fragment>
  );
}
