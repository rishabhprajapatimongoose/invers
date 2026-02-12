import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterSection from "./FooterSection";

gsap.registerPlugin(ScrollTrigger);

const FooterSectionOne = () => {
  return (
    <div className="z-10 grid grid-cols-1 bg-[#13140E] md:grid-cols-3 border border-stone-700 relative">
      {/*  CONTACT */}
      <FooterSection title="CONTACT">
        <div className="space-y-8 md:space-y-12 font-medium text-sm">
          <div className="space-y-1">
            <p className=" cursor-pointer transition-colors">
              info@inversa.com
            </p>
            <p className=" cursor-pointer transition-colors">Get in touch</p>
          </div>
          <div className="space-y-2">
            <p className=" leading-tight">
              INVERSA Origin powers
              <br />
              INVERSA Leathers
            </p>
            <p className="flex items-center gap-1 group cursor-pointer">
              Learn more ↗
            </p>
          </div>
        </div>
      </FooterSection>

      {/* CONNECT */}
      <FooterSection
        title="CONNECT"
        className="border-y md:border-y-0 md:border-x border-stone-700"
      >
        <div className="space-y-2 text-sm">
          <p className=" cursor-pointer ">Instagram</p>
          <p className=" cursor-pointer ">LinkedIn</p>
        </div>
      </FooterSection>

      {/* SUBSCRIBE */}
      <FooterSection title="SUBSCRIBE">
        <div className="flex justify-between items-center border-b  pb-1">
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-white"
          />
          <button className="text-xl hover:translate-x-1 transition-transform">
            →
          </button>
        </div>
      </FooterSection>
    </div>
  );
};

const Footer = () => {
  const logoRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    if (!logoRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo(
        logoRef.current,
        { y: -150 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        },
      );
    });

    // tabs
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      gsap.fromTo(
        logoRef.current,
        { y: -110 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top bottom",
            end: "top 85%",
            scrub: true,
          },
        },
      );
    });

    // Mobile
    mm.add("(max-width: 707px)", () => {
      gsap.fromTo(
        logoRef.current,
        { y: -80 }, // smaller movement
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: logoRef.current,
            start: "top bottom",
            end: "top 85%",
            scrub: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <footer className="bg-[#13140E] text-white pt-10 px-5  overflow-hidden">
      <FooterSectionOne />

      {/* Footer section 2 */}
      <div className="relative py-8 md:py-12 px-4 border border-t-0 border-stone-700 pointer-events-none select-none">
        <img ref={logoRef} src="./InversaLogo.png" className="w-full" />{" "}
      </div>

      {/* section 3 footer */}
      <div className="flex justify-between pt-3 pb-5  text-white font-medium text-sm">
        <p>© 2024 INVERSA</p>
        <p>Privacy Policy</p>
        <p>Crafted by Rishabh </p>
      </div>
    </footer>
  );
};

export default Footer;
