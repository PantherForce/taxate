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
      <div className="flex h-[36vh] rounded-xl bg-[#F4F1E6] flex-col items-center justify-center">
        {/* Centered Heading */}
        <ContentContainer>
          <Heading fontSize="xl" className="font-bold text-center">
            With best integrations
          </Heading>
        </ContentContainer>

        {/* Marquee Container */}
        <div className="relative overflow-hidden w-full">
          <div className="flex space-x-8 animate-marquee justify-center">
            {images.map((src, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-black rounded-lg shadow-md"
                style={{ minWidth: '200px' }} // Ensure each logo has a minimum width for consistency
              >
                <img
                  src={src}
                  alt={`Logo ${index + 1}`}
                  className="h-14 w-full object-contain" // Adjusted size for logos (16 units of height)
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
