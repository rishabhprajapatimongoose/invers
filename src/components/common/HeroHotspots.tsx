// HeroHotspots.tsx
import React from "react";

const HeroHotspots: React.FC = () => {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
      <div className="relative w-full h-full">
        {/* --- FLOATING LABELED NODES --- */}
        <div className="absolute top-[25%] left-[35%] flex flex-col items-center hotspot-node">
          <span className="mb-2 text-xs font-bold tracking-widest uppercase text-[#F1664D] drop-shadow-md">
            Hotspot
          </span>
          <div className="relative flex items-center justify-center w-20 h-20">
            <span className="absolute w-full h-full rounded-full bg-[#F1664D] opacity-40 animate-ping" />
            <span className="relative block w-3 h-3 rounded-full bg-[#F1664D] shadow-[0_0_10px_#F1664D]" />
          </div>
        </div>

        <div className="absolute top-[55%] right-[30%] flex flex-col items-center specialist-node">
          <span className="mb-2 text-xs font-bold tracking-widest uppercase text-[#EBFC72] drop-shadow-md">
            Field Specialist
          </span>
          <div className="relative flex items-center justify-center w-6 h-6">
            <span className="absolute w-full h-full rounded-full bg-[#EBFC72] opacity-40 animate-ping" />
            <span className="relative block w-3 h-3 rounded-full bg-[#EBFC72] shadow-[0_0_10px_#EBFC72]" />
          </div>
        </div>

        {/* --- DATA DOTS LAYER (SVG) --- */}
        <svg
          viewBox="0 0 764 542"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <filter id="dot-glow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Hotspots (Red) - Radius 6 */}
          <g className="hotspots-group" filter="url(#dot-glow)">
            <circle
              cx="761"
              cy="45"
              r="6"
              fill="#F1664D"
              className="opacity-60"
            />
            <circle
              cx="247"
              cy="539"
              r="6"
              fill="#F1664D"
              className="opacity-90"
            />
            <circle
              cx="128"
              cy="410"
              r="6"
              fill="#F1664D"
              className="opacity-100"
            />
            <circle
              cx="166"
              cy="190"
              r="6"
              fill="#F1664D"
              className="opacity-100"
            />
            <circle
              cx="511"
              cy="531"
              r="6"
              fill="#F1664D"
              className="opacity-80"
            />
            <circle
              cx="649"
              cy="39"
              r="6"
              fill="#F1664D"
              className="opacity-70"
            />
          </g>

          {/* Specialists (Yellow) - Radius 4 */}
          <g className="specialists-group" filter="url(#dot-glow)">
            <circle
              cx="9"
              cy="229"
              r="4"
              fill="#EBFC72"
              className="opacity-100"
            />
            <circle
              cx="673"
              cy="280"
              r="4"
              fill="#EBFC72"
              className="opacity-60"
            />
            <circle
              cx="554"
              cy="519"
              r="4"
              fill="#EBFC72"
              className="opacity-100"
            />
            <circle
              cx="404"
              cy="412"
              r="4"
              fill="#EBFC72"
              className="opacity-100"
            />
            <circle
              cx="753"
              cy="331"
              r="4"
              fill="#EBFC72"
              className="opacity-90"
            />
            <circle
              cx="332"
              cy="3"
              r="4"
              fill="#EBFC72"
              className="opacity-80"
            />
            <circle
              cx="226"
              cy="39"
              r="4"
              fill="#EBFC72"
              className="opacity-100"
            />
          </g>
        </svg>

        {/* --- GRID MASK LAYER --- */}
        <svg
          viewBox="0 0 1080 748"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full text-white/50 grid-svg"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M582 83H830V0H914V83H997V249H1080V416H997V498H1080V582H997V665H831V748H747V665H665V748H498V665H250V748H166V665H0V498H83V333H0V166H83V83H332V0H582V83ZM167 747H249V665H167V747ZM499 747H581V665H499V747ZM582 747H664V665H582V747ZM748 747H830V665H748V747ZM1 664H83V582H1V664ZM84 664H166V582H84V664ZM167 664H249V582H167V664ZM250 664H332V582H250V664ZM333 664H415V582H333V664ZM416 664H498V582H416V664ZM499 664H581V582H499V664ZM582 664H664V582H582V664ZM665 664H747V582H665V664ZM748 664H830V582H748V664ZM831 664H913V582H831V664ZM914 664H996V582H914V664ZM1 581H83V499H1V581ZM84 581H166V499H84V581ZM167 581H249V499H167V581ZM250 581H332V499H250V581ZM333 581H415V499H333V581ZM416 581H498V499H416V581ZM499 581H581V499H499V581ZM582 581H664V499H582V581ZM665 581H747V499H665V581ZM748 581H830V499H748V581ZM831 581H913V499H831V581ZM914 581H996V499H914V581ZM997 581H1079V499H997V581ZM84 498H166V416H84V498ZM167 498H249V416H167V498ZM250 498H332V416H250V498ZM333 498H415V416H333V498ZM416 498H498V416H416V498ZM499 498H581V416H499V498ZM582 498H664V416H582V498ZM665 498H747V416H665V498ZM748 498H830V416H748V498ZM831 498H913V416H831V498ZM914 498H996V416H914V498ZM84 415H166V333H84V415ZM167 415H249V333H167V415ZM250 415H332V333H250V415ZM333 415H415V333H333V415ZM416 415H498V333H416V415ZM499 415H581V333H499V415ZM582 415H664V333H582V415ZM665 415H747V333H665V415ZM748 415H830V333H748V415ZM831 415H913V333H831V415ZM914 415H996V333H914V415ZM997 415H1079V333H997V415ZM1 332H83V250H1V332ZM84 332H166V250H84V332ZM167 332H249V250H167V332ZM250 332H332V250H250V332ZM333 332H415V250H333V332ZM416 332H498V250H416V332ZM499 332H581V250H499V332ZM582 332H664V250H582V332ZM665 332H747V250H665V332ZM748 332H830V250H748V332ZM831 332H913V250H831V332ZM914 332H996V250H914V332ZM997 332H1079V250H997V332ZM1 249H83V167H1V249ZM84 249H166V167H84V249ZM167 249H249V167H167V249ZM250 249H332V167H250V249ZM333 249H415V167H333V249ZM416 249H498V167H416V249ZM499 249H581V167H499V249ZM582 249H664V167H582V249ZM665 249H747V167H665V249ZM748 249H830V167H748V249ZM831 249H913V167H831V249ZM914 249H996V167H914V249ZM84 166H166V84H84V166ZM167 166H249V84H167V166ZM250 166H332V84H250V166ZM333 166H415V84H333V166ZM416 166H498V84H416V166ZM499 166H581V84H499V166ZM582 166H664V84H582V166ZM665 166H747V84H665V166ZM748 166H830V84H748V166ZM831 166H913V84H831V166ZM914 166H996V84H914V166ZM333 83H415V1H333V83ZM416 83H498V1H416V83ZM499 83H581V1H499V83ZM831 83H913V1H831V83Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroHotspots;
