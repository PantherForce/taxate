import React, { useState } from "react";
import BlogCard from "./BlogCard";
import AlphabetFilter from "./AlphabetFilter";
import Navbar from "../Navbar/Navbar";
import HeroBlogSection from "./HeroBlogSection";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import { Link } from "react-router-dom";
import ResponsiveCard from "./ResponsiveCard";

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
}

const blogPosts: Blog[] = [
  // Blog posts with id "1" and "2" have been removed.
  // Add more dummy blogs here if needed
];

const BlogList: React.FC = () => {
  const [filteredLetter, setFilteredLetter] = useState<string | null>(null);
  const filteredBlogs = filteredLetter
    ? blogPosts.filter((blog) => blog.title[0].toUpperCase() === filteredLetter)
    : blogPosts;

  return (
    <>
      <Navbar />
      <HeroBlogSection />
      <ContentContainer>
        <div className="">
          <AlphabetFilter onSelectLetter={setFilteredLetter} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
            {filteredBlogs.map((blog) => (
              <Link key={blog.id} to={`/blogs/${blog.id}`}>
                <BlogCard
                  id={blog.id}
                  title={blog.title}
                  description={blog.description}
                  image={blog.image}
                />
              </Link>
            ))}
          </div>
        </div>

        <ResponsiveCard/>
      </ContentContainer>
    </>
  );
};

export default BlogList;
