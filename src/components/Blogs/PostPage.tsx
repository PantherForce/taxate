import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Navbar from "../Navbar/Navbar";
import Faqs from "../Pages/Faqs/Faqs";
import DOMPurify from "dompurify";
import TableOfContents from "../TableOfContents/TableOfContents"; // Import the TableOfContents component

// Define the Post type with more precise properties
interface Post {
  title: string;
  summary: string;
  content: string;
  body: string;
  featured_image: string;
}

// Define the PostPage component
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
      <ContentContainer>
        <div className="px-6 py-8 w-full flex">
          {/* Sidebar: Table of Contents */}
          <div className="hidden lg:block w-1/4 mr-6">
            <TableOfContents content={post?.body || ""} />
          </div>

          {/* Main Content Area */}
          <div className="w-full lg:w-3/4">
            <div className="w-full flex justify-center items-center mb-6">
              <img
                src={post?.featured_image || "/default-image.jpg"}
                alt={post?.title || "Default Post Image"}
                className="w-full max-w-3xl h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
              {post?.title || "Untitled Post"}
            </h1>
            <div
              className="prose lg:prose-xl text-gray-800 mx-auto mb-12"
              dangerouslySetInnerHTML={{
                __html: sanitizeHTML(post?.body || "No content available"),
              }}
            />
          </div>
        </div>
      </ContentContainer>
      <Faqs />
    </>
  );
};

export default PostPage;
