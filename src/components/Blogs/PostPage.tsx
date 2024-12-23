import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Navbar from "../Navbar/Navbar";
import Faqs from "../Pages/Faqs/Faqs";
import DOMPurify from "dompurify";
import TableOfContents from "../TableOfContents/TableOfContents"; // Import the TableOfContents component

interface Post {
  title: string;
  summary: string;
  content: string;
  body: string;
  featured_image: string;
  published: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const suffix = (day: number) => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `Published on ${month} ${day}${suffix(day)}, ${year}`;
};

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://api.buttercms.com/v2/posts/${slug}/?auth_token=bcd5aa56673a1a8cf6c11dd443b4a0e15486757f`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setPost(data.data);
      } catch (err: any) {
        setError(err.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-600">{error}</div>;
  }

  const sanitizeHTML = (html: string) => {
    return DOMPurify.sanitize(html);
  };

  return (
    <>
      <Navbar />

      <div className="w-full bg-[#F4F1E6]">
        <div className="h-[60vh]">
          <ContentContainer>
            <h1 className="text-3xl md:text-3xl font-semibold text-gray-900 mb-4 text-center">
              {post?.title || "Untitled Post"}
            </h1>

            <p className="text-center text-lg text-gray-600">
              {formatDate(post?.published || "")}
            </p>
          </ContentContainer>

          <div className="w-full h-[30vh] flex justify-center mb-6">
            <img
              src={post?.featured_image || "/default-image.jpg"}
              alt={post?.title || "Default Post Image"}
              className="w-3/4 sm:w-3/4 md:w-2/3 lg:w-1/3 h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Table of Contents on larger screens */}
          <div className="hidden w-full md:block">
            <TableOfContents content={sanitizeHTML(post?.body || "")} />
          </div>

          {/* Post content */}
          <div className="col-span-2">
            <div
              className="prose  text-gray-800"
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(post?.body || "No content available"),
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Faqs />
      </div>
    </>
  );
};

export default PostPage;
