import React from "react";
import Heading from "../Layout/Heading/Heading";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";

const imageNames = Array.from({ length: 40 }, (_, index) => {
  const baseName = Math.floor(index / 10) + 1; // Grouping every 10 images into the same base name (1, 2, 3, etc.)
  const suffix = index === 0 ? "" : ` (${index})`; // For all but the first image, add a number inside parentheses
  return `${baseName}${suffix}.svg`;
});

const ImageGallery: React.FC = () => {
  return (
    <ContentContainer>
      <div className="space-y-2 rounded-xl bg-primary h-[60vh]">
        <ContentContainer>
          <Heading
            fontSize="xl"
            fontColor="text-white"
            className="text-center  font-bold"
          >
            An Extensive Range of Exchanges and Blockchains
          </Heading>{" "}
        </ContentContainer>
        <div className="relative flex flex-col justify-center items-center gap-8 overflow-hidden">
          <div className="flex animate-scroll-left mt-4 mb-12">
            {imageNames.slice(0, 10).map((imageName) => (
              <div
                key={imageName}
                className="relative flex justify-center items-center bg-white w-20 h-20 rounded-full mx-2"
              >
                <img
                  src={`/images/Crypto-icons/${imageName}`}
                  alt={imageName}
                  className="w-16 h-16 rounded-full"
                />
              </div>
            ))}
            {imageNames.slice(0, 10).map((imageName) => (
              <div
                key={`duplicate-${imageName}`}
                className="relative flex justify-center items-center bg-white w-20 h-20 rounded-full mx-2"
              >
                <img
                  src={`/images/Crypto-icons/${imageName}`}
                  alt={imageName}
                  className="w-16 h-16 rounded-full"
                />
              </div>
            ))}

            {imageNames.slice(0, 10).map((imageName) => (
              <div
                key={imageName}
                className="relative flex justify-center items-center bg-white w-20 h-20 rounded-full mx-2"
              >
                <img
                  src={`/images/Crypto-icons/${imageName}`}
                  alt={imageName}
                  className="w-16 h-16 rounded-full"
                />
              </div>
            ))}
            {imageNames.slice(0, 10).map((imageName) => (
              <div
                key={`duplicate-${imageName}`}
                className="relative flex justify-center items-center bg-white w-20 h-20 rounded-full mx-2"
              >
                <img
                  src={`/images/Crypto-icons/${imageName}`}
                  alt={imageName}
                  className="w-16 h-16 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex flex-col justify-center items-center gap-8 overflow-hidden">
          <div className="flex animate-scroll-right mt-4 mb-12">
            {imageNames.slice(0, 10).map((imageName) => (
              <div
                key={imageName}
                className="relative flex justify-center items-center bg-white w-20 h-20 rounded-full mx-2"
              >
                <img
                  src={`/images/Crypto-icons/${imageName}`}
                  alt={imageName}
                  className="w-16 h-16 rounded-full"
                />
              </div>
            ))}
            {imageNames.slice(0, 10).map((imageName) => (
              <div
                key={`duplicate-${imageName}`}
                className="relative flex justify-center items-center bg-white w-20 h-20 rounded-full mx-2"
              >
                <img
                  src={`/images/Crypto-icons/${imageName}`}
                  alt={imageName}
                  className="w-16 h-16 rounded-full"
                />
              </div>
            ))}

            {imageNames.slice(0, 10).map((imageName) => (
              <div
                key={imageName}
                className="relative flex justify-center items-center bg-white w-20 h-20 rounded-full mx-2"
              >
                <img
                  src={`/images/Crypto-icons/${imageName}`}
                  alt={imageName}
                  className="w-16 h-16 rounded-full"
                />
              </div>
            ))}
            {imageNames.slice(0, 10).map((imageName) => (
              <div
                key={`duplicate-${imageName}`}
                className="relative flex justify-center items-center bg-white w-20 h-20 rounded-full mx-2"
              >
                <img
                  src={`/images/Crypto-icons/${imageName}`}
                  alt={imageName}
                  className="w-16 h-16 rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default ImageGallery;
