import { FiX } from "react-icons/fi";
import ModalWrapper from "./ModalWrapper";
import { Logo } from "./Nav";
import { FormEvent, useState } from "react";
import { loginUser } from "@/services/authService";

interface Props {
  onClose: (params?: { loginSuccess: boolean }) => void;
}

export default function LoginModal({ onClose }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    try {
      const resp = await loginUser({ email, password });
      if (resp.ok) {
        alert("Login Successful");
        onClose({ loginSuccess: true });
      } else {
        const error = JSON.parse(await resp.text());
        alert(error.errorMessage);
      }
    } catch (err: any) {
      console.log(err, "Err");
      alert(err.message);
    }
  }

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white shadow-md border min-w-[300px] max-w-[800px] px-5 py-7 flex flex-col items-center gap-5 rounded-md"
      >
        <button type="button" onClick={() => onClose()} className="border rounded-md p-1 absolute right-2 top-2">
          <FiX />
        </button>

        <Logo />

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
          disabled={email.trim().length === 0 || password.trim().length === 0}
          className="border bg-red-500 py-2 text-white rounded-md text-sm font-bold w-full disabled:opacity-60"
        >
          Login
        </button>
      </form>
    </ModalWrapper>
  );
}
