import React from "react";
import Button from "../Layout/Button/Button";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Heading from "../Layout/Heading/Heading";

const Hero: React.FC = () => {
  return (
    <ContentContainer>
      <section
        className="flex flex-col-reverse lg:flex-row items-center bg-cover bg-center h-[60vh]"
        style={{ backgroundImage: "url(/images/Background/background.svg)" }}
      >
        <ContentContainer>
          <div className="w-full flex flex-col gap-6  text-center lg:text-left">
            <Heading fontSize="xl" className="font-bold text-white">
              Simplifying crypto tax compliance and accounting for you
            </Heading>
            <Heading fontSize="lg" className=" text-white">
              Innovative tech for seamless crypto tax management.
            </Heading>
            <div>
              <Button
                fontSize="lg"
                className="px-8 font-semibold py-3 bg-[#F4F1E6] text-black"
              >
                Join wishlist
              </Button>
            </div>
          </div>
        </ContentContainer>
      </section>
    </ContentContainer>
  );
};

export default Hero;
