"use client";

import { menu } from "motion/react-client";
import { forwardRef } from "react";
import DecryptedText from "./DecryptedText";
import AnimatedText from "./AnimatedText";
import NotchedButton from "../ui/NotchButton";

type Props = {
  onClose: () => void;
};

const Menu = forwardRef<HTMLDivElement, Props>(({ onClose }, ref) => {
  const menuItems = ["Origin", "Team", "Partners", "Contact"];
  return (
    <div
      ref={ref}
      className="fixed top-0 right-0 w-1/2 h-screen bg-[#13140E] text-white z-999 translate-x-full pointer-events-none"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-sm opacity-70 hover:opacity-100"
      >
        Close ✕
      </button>

      {/* Content */}
      <div className="h-full flex flex-col justify-center px-20">
        {menuItems.map((item) => (
          <AnimatedText
            key={item}
            className="text-6xl font-medium -mt-3 hover:text-[#EBFC72] tracking-tight leading-tight"
            text={item}
          />
        ))}
        <div className="mt-8 text-sm -space-y-1">
          <DecryptedText
            text="INSTAGRAM"
            className="font-jetbrains uppercase text-lg md:text-xl"
            encryptedClassName="font-jetbrains uppercase text-lg md:text-xl"
          />
          <br />
          <DecryptedText
            text="LINKEDIN"
            className="font-jetbrains uppercase text-lg md:text-xl"
            encryptedClassName="font-jetbrains uppercase text-lg md:text-xl"
          />{" "}
        </div>

        <NotchedButton className="bg-[#EBFC72] text-black mt-10 w-fit">
          <DecryptedText text="INVERSA LEAThERS" useOriginalCharsOnly />
        </NotchedButton>
      </div>
    </div>
  );
});

Menu.displayName = "Menu";

export default Menu;
