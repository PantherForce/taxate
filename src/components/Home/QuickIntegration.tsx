import React from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Text from "../Layout/Text/Text";
import Heading from "../Layout/Heading/Heading";

const QuickIntegration: React.FC = () => {
  return (
    <ContentContainer>
      <div className="flex flex-col items-center bg-primary h-auto md:h-[56vh] rounded-lg text-black p-8">
        <div className="flex mt-6 flex-col w-full">
          <Heading
            fontSize="xl"
            className="font-semibold text-white mb-4 text-center"
          >
            Quick Integration
          </Heading>
          <Text fontSize="lg" className="text-gray-200 mt-2 text-center">
            Taxate can process lakhs of transaction data in seconds. Streamline
            data management and make your crypto journey efficient.
          </Text>
        </div>

        <div className="w-full mt-8 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/57/Binance_Logo.png"
              alt="Binance"
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <Heading fontSize="xl" className="font-semibold text-white">
              Binance
            </Heading>
          </div>

          {/* Horizontal Timeline Layout */}
          <div className="flex items-center justify-center space-x-10 relative w-full mt-8">
            {/* Timeline Line */}
            <div className="absolute w-1/2 h-1  bg-gray-300 top-1/2 transform -translate-y-1/2 z-0" />

            {/* Step 1: Importing Transactions */}
            <motion.div
              className="flex flex-col items-center z-10 hover:scale-110"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 mt-5 rounded-full bg-white flex items-center justify-center">
                <FaCheckCircle color="black" size={30} />
              </div>
              <Text fontSize="xl" className="text-white mt-2">
                Importing transactions
              </Text>
            </motion.div>

            {/* Step 2: Processing the Data */}
            <motion.div
              className="flex flex-col items-center z-10 hover:scale-110"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-12 h-12 mt-5 rounded-full bg-white flex items-center justify-center">
                <FaCheckCircle color="black" size={30} />
              </div>
              <Text fontSize="xl" className="text-white mt-2">
                Processing the data
              </Text>
            </motion.div>

            {/* Step 3: Calculating Taxes */}
            <motion.div
              className="flex flex-col items-center z-10 hover:scale-110"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="w-12 h-12 mt-5 rounded-full bg-white flex items-center justify-center">
                <FaCircle color="green" size={30} />
              </div>
              <Text fontSize="xl" className="text-white mt-2">
                Calculating your taxes
              </Text>
            </motion.div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
};

export default QuickIntegration;
