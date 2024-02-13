import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  onClose: () => void;
}

export default function ModalWrapper({ children, onClose }: Props) {
  return (
    <div
      style={{ background: "rgba(0,0,0,0.8)" }}
      className="z-50 fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center"
    >
      <div onClick={onClose} className="fixed top-0 left-0 w-full h-full" />

      <div className="z-100">{children}</div>
    </div>
  );
}
