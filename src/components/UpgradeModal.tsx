import { FiCheck } from "react-icons/fi";
import Logo from "./Logo";
import ModalWrapper from "./ModalWrapper";

interface Props {
  onClose: () => void;
}

export default function UpgradeModal({ onClose }: Props) {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="bg-white min-w-[300px] p-4 rounded flex flex-col items-center">
        <Logo logoOnly />

        <div className="text-sm flex flex-col mt-10">
          <p className="font-bold mb-2">Pro Plan starting $3 a month per channel</p>

          <section className="flex flex-col gap-2">
            <p className="flex items-center gap-2">
              <FiCheck className="text-green-500" /> Unlimited posts
            </p>

            <p className="flex items-center gap-2">
              <FiCheck className="text-green-500" /> Bulk post
            </p>
          </section>

          <button className="bg-red-500 w-full mt-10 text-white py-2 rounded">Coming Soon ✨</button>
        </div>
      </div>
    </ModalWrapper>
  );
}
