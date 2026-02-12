import { forwardRef } from "react";

type Props = {
  imgUrl: string;
  className?: string;
  imgClassName?: string; // Added to target the internal image
};

const MaskedBackgroundImage = forwardRef<HTMLImageElement, Props>(
  ({ imgUrl, className = "", imgClassName = "" }, ref) => {
    const maskUrl = `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1030 701'%3E%3Cpath fill='black' d='M347 0v21h60V0h43v21h44v21h121V21h31V0h117v21h59V0h107v21h59v62h21v42h21v36h-21v38h-21v96h21v14h21v46h-21v21h21v38h-21v50h21v79h-21v74h21v24h-21v20H886v-20h-41v20h-40v-20h-21v20h-42v20h-41v20H559v-20h-23v-20h-50v-20h-41v20H330v-20h-21v20h-52v20h-24v20h-47v-20h-21v20h-21v-20h-21v-20H40v-41H20v-62h20v-46H20v-58h20v-20H20v-20H0V240h20v-53H0v-62h20V63h20V42h41v21h83V42h21V21h85V0z'/%3E%3C/svg%3E")`;

    return (
      <div
        className={`relative w-full h-full overflow-hidden ${className}`}
        style={{
          maskImage: maskUrl,
          WebkitMaskImage: maskUrl,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <img
          ref={ref}
          src={imgUrl}
          alt=""
          className={`absolute top-0 left-0 w-full h-[140%] object-cover ${imgClassName}`}
        />
      </div>
    );
  },
);

MaskedBackgroundImage.displayName = "MaskedBackgroundImage";
export default MaskedBackgroundImage;
