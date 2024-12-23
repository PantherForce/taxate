import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animation

interface TableOfContentsProps {
  content: string; // HTML content that includes the headings
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<{ text: string; id: string }[]>([]);

  useEffect(() => {
    const parseHeadings = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const h2Elements = doc.querySelectorAll("h2");
      const headingsList = Array.from(h2Elements).map((h2, index) => {
        const id = `heading-${index + 1}`;
        h2.id = id; // Ensure each heading has an ID for navigation
        return { text: h2.textContent || "", id };
      });
      setHeadings(headingsList);
    };

    if (content) {
      parseHeadings();
    }
  }, [content]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="p-4 sticky top-16 max-h-[70vh]  z-10 bg-white shadow-lg rounded-lg md:max-h-[80vh]">
      <motion.h3
        className="text-xl md:text-3xl text-center font-semibold mb-6 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Table of Contents
      </motion.h3>
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        {headings.map((heading) => (
          <motion.li
            key={heading.id}
            whileHover={{ scale: 1.1 }} // Animation for hover effect
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              onClick={() => handleScrollTo(heading.id)}
              className="text-black text-lg md:text-base font-medium focus:outline-none hover:text-primary transition-all"
            >
              {heading.text}
            </button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
