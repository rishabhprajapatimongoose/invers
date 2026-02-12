import HarvestorSlidePara from "./HarvestorSlidePara";

const HarvestorSlideOne = () => {
  return (
    <div className="relative w-full h-full flex-1 flex items-center justify-center ">
      <div className="absolute h-full w-auto   flex items-center">
        <img src="https://inversa.com/svg/1.svg" className="h-[80%] w-auto" />
        <img
          src="https://inversa.com/svg/1-cam.svg"
          className="absolute h-[80%] w-auto"
        />
      </div>
      <img
        src="/HSectionImgOne.png"
        className="absolute top-1/5 left-2/3 w-[40vw] md:w-[30vw] xl:w-[25vw] max-w-85 object-contain"
      />
      <div className="mr-auto mt-auto p-20 md:p-30">
        <HarvestorSlidePara
          title="001 . BODY CAMS"
          description="Document filedwork and verify removals for program transparency and safety, removing preverse incentives."
        />
      </div>
    </div>
  );
};

export default HarvestorSlideOne;
