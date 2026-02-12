import CharFadeScrollText from "../../../components/common/CharFadeScrollText";
import DecryptedText from "../../../components/common/DecryptedText";

type Props = {
  title: string;
  description: string;
};
const HarvestorSlidePara = ({ title, description }: Props) => {
  return (
    <div className="max-w-78 space-y-3">
      <DecryptedText
        text={title}
        animateOn="view"
        speed={100}
        className="text-lg md:text-xl font-jetbrains text-[#EBFC72]
        "
      />
      <CharFadeScrollText
        text={description}
        className="text-lg md:text-xl leading-tight font-medium"
      />
    </div>
  );
};

export default HarvestorSlidePara;
