import { useState } from "react";
import Footer from "../../components/common/Footer";
import useLenis from "../../hooks/useLenis";
import Hero from "./components/Hero";
import Quotes from "./components/Quotes";
import Values from "./components/Values";
import Harvestor from "./harvester/Harvestor";
import HomeEnterAnimation from "./HomeEnterAnimation";

const HomePage = () => {
  useLenis();

  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="bg-[#F4F3E8] relative">
      {/* Intro Animation */}
      {showIntro && (
        <HomeEnterAnimation onComplete={() => setShowIntro(false)} />
      )}

      <Hero />
      <Values />
      <Harvestor />
      <Quotes />
      <Footer />
    </div>
  );
};

export default HomePage;
