"use client";
import { Fragment, useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import { getMe } from "@/services/authService";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import CoolLoader from "./CoolLoader";
import { AiFillCrown } from "react-icons/ai";
import UpgradeModal from "./UpgradeModal";
import Logo from "./Logo";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, user, logoutUser } = useUser();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [showCoolLoader, setShowCoolLoader] = useState(isLoading);

  useEffect(() => {
    //show cool timer for at least 2 sec
    setTimeout(() => setShowCoolLoader(false), 3000);
  }, []);

  if (showCoolLoader) {
    return <CoolLoader />;
  }

  return (
    <Fragment>
      <nav className="bg-white -t-md flex border-b items-center gap-2 py-5">
        <div className="flex items-center justify-between w-[95%] lg:max-w-[800px] mx-auto">
          <Logo />

          <div className="flex gap-2">
            {!user ? (
              <button
                disabled={isLoading}
                onClick={() => setShowLoginModal(true)}
                className="font-bold px-5 py-2 text-sm  bg-red-500 text-white hover:bg-red-600"
              >
                Login
              </button>
            ) : (
              <div className="flex gap-10">
                {pathname !== "/dashboard" && (
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="font-bold px-5 py-2 text-sm  bg-red-500 text-white hover:bg-red-600"
                  >
                    Dashboard
                  </button>
                )}

                {pathname === "/dashboard" && (
                  <button disabled={isLoading} className="text-yellow-600" onClick={() => setShowUpgradeModal(true)}>
                    <AiFillCrown size={25} />
                  </button>
                )}

                <button
                  disabled={isLoading}
                  onClick={logoutUser}
                  className="font-bold px-5 py-2 text-sm  bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}

      {showUpgradeModal && <UpgradeModal onClose={() => setShowUpgradeModal(false)} />}
    </Fragment>
  );
}
