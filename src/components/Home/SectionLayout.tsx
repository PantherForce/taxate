import React from 'react';
import { motion } from 'framer-motion';

interface SectionLayoutProps {
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
  blur?: boolean;  // Add this prop to conditionally blur the image
}

const SectionLayout: React.FC<SectionLayoutProps> = ({ title, description, imageSrc, reverse = false, blur = false }) => {
  return (
    <motion.div
      className={`flex ${reverse ? 'flex-row-reverse' : 'flex-row'} items-center justify-between space-x-8 w-full py-10 flex-col sm:flex-row`}  // Make it column on small screens
      initial={{ opacity: 0, x: reverse ? 100 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="w-full sm:w-1/2 text-left space-y-4">
        <motion.h2 className="text-3xl font-bold text-gray-800">{title}</motion.h2>
        <motion.p className="text-xl text-gray-600">{description}</motion.p>
      </motion.div>

      {/* Image Section */}
      <motion.div className="w-full sm:w-1/2">
        <motion.img
          src={imageSrc}
          alt="Image description"
          className={`w-full h-[40vh] object-contain rounded-lg shadow-lg ${blur ? 'filter blur-md' : ''}`}  // Make the image full-width on mobile
        />
      </motion.div>
    </motion.div>
  );
};

export default SectionLayout;
