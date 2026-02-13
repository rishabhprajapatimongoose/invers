"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

import Footer from "../../components/common/Footer";
import useLenis from "../../hooks/useLenis";

import Hero from "./components/Hero";
import Quotes from "./components/Quotes";
import Values from "./components/Values";
import Harvestor from "./harvester/Harvestor";
import HomeEnterAnimation from "./HomeEnterAnimation";

import Menu from "../../components/common/Menu";
import Header from "../../components/common/Header";

const HomePage = () => {
  const lenisRef = useLenis();

  const [showIntro, setShowIntro] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /* Open */
  const openMenu = () => {
    if (!menuRef.current || menuOpen) return;

    setMenuOpen(true);

    lenisRef.current?.stop();

    gsap.to(menuRef.current, {
      x: "0%",
      duration: 0.6,
      ease: "power3.inOut",
      pointerEvents: "auto",
    });
  };

  /* Close */
  const closeMenu = () => {
    if (!menuRef.current || !menuOpen) return;

    gsap.to(menuRef.current, {
      x: "100%",
      duration: 0.6,
      ease: "power3.inOut",
      pointerEvents: "none",

      onComplete: () => {
        lenisRef.current?.start();
        setMenuOpen(false);
      },
    });
  };

  return (
    <div className="bg-[#F4F3E8] relative">
      {/* Intro */}
      {showIntro && (
        <HomeEnterAnimation onComplete={() => setShowIntro(false)} />
      )}

      {/* Header */}
      <Header onMenuOpen={openMenu} />

      {/* Menu */}
      <Menu ref={menuRef} onClose={closeMenu} />

      {/* Content */}
      <Hero />
      <Values />
      <Harvestor />
      <Quotes />
      <Footer />
    </div>
  );
};

export default HomePage;
