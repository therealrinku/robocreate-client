"use client";
import { Fragment, useState } from "react";
import LoginModal from "./LoginModal";

export default function Nav() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <Fragment>
      <nav className="flex border-b-2 items-center gap-2 py-5">
        <div className="flex  items-center justify-between w-[95%] max-w-[800px] mx-auto">
          <Logo />
          <button
            onClick={() => setShowLoginModal(true)}
            className="font-bold border px-5 py-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            Login
          </button>
        </div>
      </nav>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
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
