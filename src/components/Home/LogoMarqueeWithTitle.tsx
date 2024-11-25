// @ts-nocheck

import Heading from "../Layout/Heading/Heading";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";

const LogoMarqueeWithTitle = () => {
  const images = [
    "/images/Exhanges/bitbns.svg",
    "/images/Exhanges/Bitget.svg",
    "/images/Exhanges/coindcx.png",
    "/images/Exhanges/mudrex.png",
    "/images/Exhanges/sun.png",
    "/images/Exhanges/giottus.svg",
    "/images/Exhanges/bitbns.svg",
    "/images/Exhanges/Bitget.svg",
    "/images/Exhanges/coindcx.png",
    "/images/Exhanges/mudrex.png",
    "/images/Exhanges/sun.png",
    "/images/Exhanges/giottus.svg",
    "/images/Exhanges/bitbns.svg",
    "/images/Exhanges/Bitget.svg",
    "/images/Exhanges/coindcx.png",
    "/images/Exhanges/mudrex.png",
    "/images/Exhanges/sun.png",
    "/images/Exhanges/giottus.svg"
  ];

  return (
    <ContentContainer>
      <div className="flex h-[36vh] md:h-[36vh] rounded-xl bg-[#F4F1E6] flex-col items-center justify-center px-4 ">
        {/* Centered Heading */}
        <ContentContainer>
          <Heading fontSize="" className="font-bold text-center text-3xl md:text-4xl">
            With best integrations
          </Heading>
        </ContentContainer>

        {/* Marquee Container */}
        <div className="relative overflow-hidden w-full">
          <div className="flex space-x-4 md:space-x-8 animate-marquee justify-center">
            {images.map((src, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-2 md:p-4 bg-black rounded-lg shadow-md"
                style={{ minWidth: '160px' }} // Reduced minimum width for mobile screens
              >
                <img
                  src={src}
                  alt={`Logo ${index + 1}`}
                  className="h-12 md:h-14 w-full object-contain" // Adjusted height for mobile screens (12 units)
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default LogoMarqueeWithTitle;
