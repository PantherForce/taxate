import React from "react";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Button from "../Layout/Button/Button";

const SignupCard: React.FC = () => {
  return (
    <ContentContainer>
      <div className="flex justify-center items-center py-4">
        <div className="flex flex-row gap-10 w-full max-w-7xl bg-primary text-white p-6 md:p-12 rounded-xl shadow-lg space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <img
              src="/images/CTA\MessageSent.png"
              alt="Illustration"
              className="w-36 md:w-60 h-60"
            />
          </div>

          <div className="text-center md:text-left max-w-3xl">
            <h2 className="text-lg md:text-4xl font-semibold mb-2">
              How to get started
            </h2>
            <p className="text-sm md:text-lg  mb-4">
              You can sign up at Taxate for free. With our range of features that
              you can equip for free, Taxate allows you to be more educated and
              aware of your tax reports.
            </p>
            <Button
              fontSize="xl"
              fontColor="text-black"
              height="50px"
              width="40%"
              className="mt-4 bg-white font-semibold"
            >
              Get Started for FREE →
            </Button>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default SignupCard;
