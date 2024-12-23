import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // For animations

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<{ text: string; id: string }[]>([]);

  useEffect(() => {
    const parseHeadings = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const h2Elements = doc.querySelectorAll("h2");
      const headingsList = Array.from(h2Elements).map((h2, index) => {
        // Generate unique IDs for headings if they don’t have one
        const id = h2.id || `heading-${index + 1}`;
        h2.id = id; // Set the id on the heading
        return { text: h2.textContent || "Untitled", id };
      });
      setHeadings(headingsList);
    };

    parseHeadings();
  }, [content]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="p-4 sticky top-16 max-h-[80vh] overflow-y-auto z-10 bg-white shadow-lg rounded-lg">
      <motion.h3
        className="text-lg md:text-xl font-bold text-gray-800 mb-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Table of Contents
      </motion.h3>
      <ul className="list-none space-y-2">
        {headings.map((heading) => (
          <motion.li
            key={heading.id}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-sm md:text-base font-medium"
          >
            <button
              onClick={() => scrollToHeading(heading.id)}
              className="text-gray-700 hover:text-blue-500 focus:outline-none transition-all"
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
