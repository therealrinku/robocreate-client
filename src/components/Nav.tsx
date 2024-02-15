"use client";
import { Fragment, useState } from "react";
import LoginModal from "./LoginModal";
import { getMe } from "@/services/authService";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import CoolLoader from "./CoolLoader";
import { AiFillCrown } from "react-icons/ai";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, user, setupUser, logoutUser } = useUser();

  const [showLoginModal, setShowLoginModal] = useState(false);

  async function handleLoginModalClose(params?: { loginSuccess: boolean }) {
    if (params?.loginSuccess) {
      const resp = await getMe();

      if (resp.ok) {
        setupUser(await resp.json());
        setShowLoginModal(false);
        router.push("/dashboard");
      }

      return;
    }
    setShowLoginModal(false);
  }

  if (isLoading) {
    return <CoolLoader />;
  }

  return (
    <Fragment>
      <nav className="flex border-b items-center gap-2 py-5">
        <div className="flex  items-center justify-between w-[95%] max-w-[800px] mx-auto">
          <Logo />

          <div className="flex gap-2">
            {!user ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="font-bold border px-5 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Login
              </button>
            ) : (
              <div className="flex gap-5">
                {pathname !== "/dashboard" && (
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="font-bold border px-5 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                  >
                    Dashboard
                  </button>
                )}

                {pathname === "/dashboard" && (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="font-bold border px-5 py-2 flex items-center gap-2 text-sm rounded-md bg-yellow-300 text-yellow-800"
                  >
                    <AiFillCrown size={20} />
                    <p>Upgrade</p>
                  </button>
                )}

                <button
                  onClick={logoutUser}
                  className="font-bold border px-5 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {showLoginModal && <LoginModal onClose={handleLoginModalClose} />}
    </Fragment>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img
        className="h-9 w-9"
        src="https://camo.githubusercontent.com/e9c1d8b7beb6f26cefc5ab0742b592df1abb0ceb398ee74c1ce33028460b3d9b/68747470733a2f2f63646e2d69636f6e732d706e672e666c617469636f6e2e636f6d2f3132382f31323433352f31323433353233342e706e67"
      />

      <div className="">
        <p className="font-bold">Robocreate</p>
        <p className="italic text-xs">
          your new <span className="font-bold">social media manager</span>
        </p>
      </div>
    </div>
  );
}
