import HarvestorSlidePara from "./HarvestorSlidePara";

const HarvestorSlideThree = () => {
  return (
    <div className="relative w-full h-full flex-1 flex items-center justify-center ">
      <img
        src="https://inversa.com/svg/3.svg"
        className="absolute h-[80%] w-auto"
      />
      <img
        src="/HSectionThreeImg.png"
        className="absolute top-1/5 left-2/3 w-[40vw] md:w-[30vw] xl:w-[25vw] max-w-85 object-contain"
      />

      <div className="mr-auto mt-auto p-20 md:p-30">
        <HarvestorSlidePara
          title="003 . FIELD APP"
          description="Guides field specialists to priority zones, logs captures, and syncs data instantly with operations."
        />
      </div>
    </div>
  );
};

export default HarvestorSlideThree;
