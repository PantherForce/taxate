import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type StatsProps = {
  platforms: number;
  investors: string;
  taxRate: string;
};

const Stats: React.FC<StatsProps> = ({ platforms, investors, taxRate }) => {
  const [platformCount, setPlatformCount] = useState(0);
  const [investorCount, setInvestorCount] = useState(0);

  const countUp = (start: number, end: number, setter: React.Dispatch<React.SetStateAction<number>>) => {
    let current = start;
    const step = (end - start) / 120;

    const interval = setInterval(() => {
      current += step;
      if (current >= end) {
        clearInterval(interval);
        setter(end);
      } else {
        setter(Math.floor(current));
      }
    }, 30);
  };

  useEffect(() => {
    countUp(0, platforms, setPlatformCount);
    countUp(0, parseInt(investors), setInvestorCount);
  }, [platforms, investors]);

  const statVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex justify-center items-center h-[60vh] bg-gary-50 ">
      <div className="grid gap-8 text-center max-w-4xl mx-auto">
        <motion.div
          className="text-5xl md:text-6xl font-bold text-primary leading-tight"
          initial="hidden"
          animate="visible"
          variants={statVariants}
          transition={{ duration: 0.7 }}
        >
          {platformCount}+ <span className="text-xl md:text-2xl text-black font-medium">Platforms</span>
        </motion.div>
        <motion.div
          className="text-5xl md:text-6xl font-bold text-primary  leading-tight"
          initial="hidden"
          animate="visible"
          variants={statVariants}
          transition={{ duration: 0.9 }}
        >
          {investorCount}M+ <span className="text-xl md:text-2xl font-medium text-black">Investors</span>
        </motion.div>
        <motion.div
          className="text-5xl md:text-6xl font-bold text-primary  leading-tight"
          initial="hidden"
          animate="visible"
          variants={statVariants}
          transition={{ duration: 1.1 }}
        >
          {taxRate} 
        </motion.div>
      </div>
    </div>
  );
};

export default function Info() {
  return (
    <Stats
      platforms={20}
      investors="115"
      taxRate="30% Crypto tax and 1% TDS"
    />
  );
}
