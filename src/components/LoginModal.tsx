import ModalWrapper from "./ModalWrapper";
import { FormEvent, useEffect, useMemo, useState } from "react";
import Logo from "./Logo";
import { useUser } from "@/hooks/useUser";

interface Props {
  onClose: (params?: { loginSuccess: boolean }) => void;
}

export default function LoginModal({ onClose }: Props) {
  const { isLoading, setupUser, user } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    await setupUser({ email, password });
  }

  const isLoginButtonDisabled = useMemo(() => {
    if (!email.includes("@") || email.length <= 5 || isLoading) {
      return true;
    }

    return false;
  }, [email, password, isLoading]);

  useEffect(() => {
    if (user) onClose();
  }, [user]);

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white shadow-md border min-w-[300px] max-w-[800px] px-5 py-7 flex flex-col items-center gap-5 rounded-md"
      >
        <Logo logoOnly />

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full focus:border-red-500 focus:border-2 outline-none rounded-md text-sm"
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full focus:border-red-500 focus:border-2 outline-none rounded-md text-sm"
          placeholder="Password"
          required
        />

        <button
          type="submit"
          disabled={isLoginButtonDisabled}
          className="border bg-red-500 py-2 text-white rounded-md text-sm font-bold w-full disabled:opacity-60"
        >
          Login
        </button>

        <button type="button" onClick={() => onClose()} className="text-xs underline">
          Cancel
        </button>
      </form>
    </ModalWrapper>
  );
}
