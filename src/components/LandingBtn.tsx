"use client";
import { useUser } from "@/hooks/useUser";
import { Fragment, useState } from "react";
import LoginModal from "./LoginModal";
import { useRouter } from "next/navigation";

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

  return (
    <Fragment>
      <button
        onClick={handleClick}
        className="rounded-md bg-red-600 flex items-center gap-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {isLoading ? "Loading.." : user ? "Dashboard" : "Get Started"}
        {!isLoading && <span aria-hidden="true">&rarr;</span>}
      </button>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </Fragment>
  );
}
