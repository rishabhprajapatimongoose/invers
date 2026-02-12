import CharFadeScrollText from "./CharFadeScrollText";
import DecryptedText from "./DecryptedText";

type HeroSlideTextProps = {
  heading: string;
  description: string;
};
const HeroSlideText = ({ heading, description }: HeroSlideTextProps) => {
  return (
    <div className="w-1/3 space-y-3">
      <h3 className="text-[#EBFC72] flex gap-2">
        <span className="animate-blink-fast">▪</span>
        <DecryptedText
          speed={100}
          animateOn="view"
          text={heading}
          className="font-jetbrains  uppercase"
          encryptedClassName="font-jetbrains uppercase"
        />
      </h3>
      <CharFadeScrollText text={description} />
    </div>
  );
};
export default HeroSlideText;
