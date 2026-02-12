import HarvestorSlidePara from "./HarvestorSlidePara";

const HarvestorSlideTwo = () => {
  return (
    <div className="relative w-full h-full flex-1 flex items-center justify-center ">
      <img
        src="https://inversa.com/svg/2.svg"
        className="absolute  h-[80%] w-auto"
      />
      <img
        src="/HSectionTwoImgOne.png"
        className="absolute top-1/5 left-2/3 w-[40vw] md:w-[30vw] xl:w-[25vw] max-w-85 object-contain"
      />
      <img
        src="/HSectionTwoImgTwo.png"
        className="absolute top-1/6 left-[10vw] w-[40vw] md:w-[30vw] xl:w-[25vw] max-w-85 object-contain"
      />
      <div className="ml-auto mt-auto p-20 md:p-30">
        <HarvestorSlidePara
          title="002 . PREDICTIVE HEATMAPS"
          description="identify likely invasive hotspots using AI-driven habitat and predicted density models to assign missions"
        />
      </div>
    </div>
  );
};

export default HarvestorSlideTwo;
