import React, { useEffect, useRef } from "react";

const Modal: React.FC<{
  children: any;
  closeOnClickOutside?: boolean;
  closeOnEsc?: boolean;
  onClose: () => void;
  open?: boolean;
}> = ({
  children,
  closeOnClickOutside = true,
  closeOnEsc = true,
  onClose,
  open = true,
}) => {
  useEffect(() => {
    const onKeyPress = (e: KeyboardEvent) => {
      if (closeOnEsc && open && e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyPress);
    return () => window.removeEventListener("keydown", onKeyPress);
  }, [closeOnEsc, onClose, open]);

  const container = useRef<HTMLDivElement>(null);
  const onOverlayClick = (e: React.MouseEvent) => {
    if (!container.current?.contains(e.target as Node)) onClose();
  };

  return (
    <div
      className={`fixed ${
        open ? "visible" : "invisible"
      } text-white inset-0 z-10 bg-black-default bg-opacity-50 p-8`}
      onClick={closeOnClickOutside ? onOverlayClick : undefined}
    >
      <div
        className="relative mx-auto mt-8 w-full max-w-[fit-content] rounded-lg"
        ref={container}
      >
        <button
          className="absolute -top-2 -right-2 flex h-8 w-8 cursor-pointer justify-center rounded-full bg-white-default shadow-xl"
          onClick={() => onClose()}
          title="Bye bye"
        >
          <span className="select-none text-2xl leading-7">&times;</span>
        </button>
        <div className="overflow-hidden rounded bg-white-default p-4 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;
