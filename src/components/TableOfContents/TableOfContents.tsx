import React, { useEffect, useState } from "react";

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<string[]>([]);

  useEffect(() => {
    const parseHeadings = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const h2Elements = doc.querySelectorAll("h2");
      const headingsList = Array.from(h2Elements).map((h2, index) => {
        // Generate unique IDs for each heading
        const id = `heading-${index + 1}`;
        h2.id = id;
        return { text: h2.textContent, id };
      });
      setHeadings(headingsList);
    };

    parseHeadings();
  }, [content]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="p-4 sticky top-16 max-h-[70vh] overflow-y-auto">
      <h3 className="text-xl font-semibold mb-4">Table of Contents</h3>
      <ul className="space-y-2 text-gray-600">
        {headings.map((heading) => (
          <li key={heading.id}>
            <button
              onClick={() => handleScrollTo(heading.id)}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
