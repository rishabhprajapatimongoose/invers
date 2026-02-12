import AnimatedText from "../../../components/common/AnimatedText";
import CharFadeScrollText from "../../../components/common/CharFadeScrollText";

const HarvestHeader = () => {
  const baseClass = "text-5xl -mb-1.25 ";
  return (
    <div>
      <div className="w-min whitespace-nowrap mx-auto">
        <AnimatedText text="Creating the" className={baseClass} />
        <AnimatedText text="modern invasive" className={baseClass} />
        <AnimatedText text="management" className={baseClass} />
        <AnimatedText text="workforce" className={baseClass} />
      </div>
      <div className="sm:w-100  pl-40 mx-auto ">
        <CharFadeScrollText
          text="We arm field crews with the 
           tools to restore ecosystems at scale."
          className="text-sm"
        />
      </div>
    </div>
  );
};
export default HarvestHeader;
