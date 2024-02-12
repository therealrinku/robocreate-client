import { FiInfo, FiX } from "react-icons/fi";
import ModalWrapper from "./ModalWrapper";
import { Logo } from "./Nav";
import { useState } from "react";

interface Props {
  onClose: () => void;
}

export default function LoginModal({ onClose }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ModalWrapper onClose={onClose}>
      <div className="relative bg-white shadow-md border min-w-[300px] max-w-[800px] px-5 py-7 flex flex-col items-center gap-5 rounded-md">
        <button onClick={onClose} className="border rounded-md p-1 absolute right-2 top-2">
          <FiX />
        </button>

        <Logo />

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full focus:border-green-500 focus:border-2 outline-none rounded-md text-sm"
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full focus:border-green-500 focus:border-2 outline-none rounded-md text-sm"
          placeholder="Password"
        />
        <button
          disabled={email.trim().length === 0 || password.trim().length === 0}
          className="border bg-green-500 py-2 text-white rounded-md text-sm font-bold w-full disabled:opacity-60"
        >
          Login
        </button>

        <p className="text-xs italic flex items-center gap-1 text-red-500 font-bold">
          <FiInfo /> Create account button coming soon
        </p>
      </div>
    </ModalWrapper>
  );
}
