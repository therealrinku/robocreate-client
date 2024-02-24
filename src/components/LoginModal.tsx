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
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSignup, setIsSignup] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (isSubmitButtonDisabled) {
      return;
    }

    await setupUser({ email, password, isSignup: isSignup });
  }

  const isSubmitButtonDisabled = useMemo(() => {
    if (!email.includes("@") || email.length <= 5 || isLoading) {
      return true;
    }

    if (isSignup && (password.length !== 8 || password !== confirmPassword)) {
      return true;
    }

    return false;
  }, [email, password, isLoading, isSignup, confirmPassword]);

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

        {isSignup && (
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-2 w-full focus:border-red-500 focus:border-2 outline-none rounded-md text-sm"
            placeholder="Confirm Password"
            required
          />
        )}

        <div className="flex items-center gap-2 text-sm">
          <input name="new-checkbox" type="checkbox" onChange={() => setIsSignup((prev) => !prev)} />
          <label htmlFor="new-checkbox">New to Robocreate ?</label>
        </div>

        <button
          type="submit"
          disabled={isSubmitButtonDisabled}
          className="border bg-red-500 py-2 text-white rounded-md text-sm font-bold w-full disabled:opacity-60"
        >
          {isSignup ? "Signup" : "Login"}
        </button>

        <button type="button" onClick={() => onClose()} className="text-xs underline">
          Cancel
        </button>
      </form>
    </ModalWrapper>
  );
}
