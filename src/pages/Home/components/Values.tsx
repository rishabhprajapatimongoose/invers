import AnimatedText from "../../../components/common/AnimatedText";
import CharFadeScrollText from "../../../components/common/CharFadeScrollText";
import DecryptedText from "../../../components/common/DecryptedText";
import MaskedImage from "../../../components/common/MaskedImage";
import NotchedButton from "../../../components/ui/NotchButton";
import type { Value } from "../../../types";

const ValueCardBlock = ({ data, idx }: { data: Value; idx: number }) => {
  return (
    <div
      className={`flex flex-col-reverse md:flex-row items-center my-8 ${idx % 2 !== 0 ? " md:flex-row-reverse" : ""}`}
    >
      <div className="p-6 lg:p-20 md:w-1/2 text-lg lg:text-xl space-y-3 lg:space-y-4 ">
        <h3>
          <span className="animate-blink-fast">▪</span>{" "}
          <DecryptedText
            text={data.title}
            speed={100}
            animateOn="both"
            revealDirection="start"
            className="font-jetbrains uppercase text-[#13140E]"
            encryptedClassName="font-jetbrains uppercase text-[#13140E]"
            sequential
            useOriginalCharsOnly
          />
        </h3>

        <CharFadeScrollText
          text={data.description}
          className="font-medium text-lg leading-normal"
        />

        <NotchedButton>
          <DecryptedText
            text={data.btnText}
            speed={100}
            className="font-jetbrains uppercase text-white"
            encryptedClassName="font-jetbrains uppercase text-white"
            animateOn="hover"
            revealDirection="start"
            sequential
            useOriginalCharsOnly
          />
        </NotchedButton>
      </div>
      <div className="w-full px-5 md:px-6 md:w-1/2 ">
        <MaskedImage imgUrl={data.imgUrl} />
      </div>
    </div>
  );
};

const Values = () => {
  const values: Value[] = [
    {
      id: 1,
      title: "Economics",
      description:
        " Our invasion management approach leverages private capital to reduce             taxpayer costs and maximize conservation impact. We create markets            for invasive biomass through Inversa Leathers: cutting costs,            creating jobs, and making invasive management an investable strategy            with proven ROI.",
      imgUrl: "Value1.png",
      btnText: "INVERSA LEATHERS",
      btnLink: "/",
    },
    {
      id: 2,
      title: "Ecology",
      description:
        "Origin, Inversa's digital platform, applies ecological science like habitat data, species tends, and critical density thresholds to guide precise action. By infusing invasion and biological patterns into programmatic strategy, we helps agencies protect wildlife, safeguard lands, and restore ecosystems through proactive conservation.",
      imgUrl: "Value2.png",
      btnText: "CASE STUDY",
      btnLink: "/",
    },
    {
      id: 3,
      title: "Efficiency",
      description:
        "Impact and restoration happens in the field, while planning and execution happens through software. Origin helps field specialists in real-time, providing teams with digital and physical tools to maximize effectiveness.",
      imgUrl: "Value3.png",
      btnText: "EXPLORE ORIGIN",
      btnLink: "/",
    },
  ];

  return (
    <div>
      <AnimatedText
        text="Inversa is where economics, ecology, and efficiency meet."
        className="text-4xl pt-20 md:pt-20 tracking-tight w-full md:w-1/2 p-4 md:p-5 mb-10 md:mb-20 font-medium "
      />

      {values.map((value, index) => (
        <ValueCardBlock key={value.id} data={value} idx={index} />
      ))}
    </div>
  );
};

export default Values;
