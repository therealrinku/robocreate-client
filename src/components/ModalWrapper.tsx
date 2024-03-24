import { PropsWithChildren } from "react";
import { FiX } from "react-icons/fi";

interface Props extends PropsWithChildren {
  onClose: () => void;
}

export default function ModalWrapper({ children, onClose }: Props) {
  return (
    <div
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      className="z-50 fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center"
    >
      <div onClick={onClose} className="absolute bg-transparent h-full w-full z-10"></div>

      <div className="z-20 bg-white min-w-[300px] lg:w-full lg:max-w-[400px] text-sm ">
        <div onClick={onClose} className="relative w-inherit">
          <button className="absolute right-3 top-2">
            <FiX color="black" size={20} />
          </button>
        </div>

        <div className="z-100 p-5">{children}</div>
      </div>
    </div>
  );
}
