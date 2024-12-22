import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Faqs from "../Pages/Faqs/Faqs";
import DOMPurify from "dompurify"; // Import DOMPurify

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

  // Function to sanitize the HTML content using DOMPurify
  const sanitizeHTML = (html: string) => {
    return DOMPurify.sanitize(html); // DOMPurify automatically sanitizes the content
  };

  return (
    <>
      <Navbar />
     
        <div className="mx-auto px-6 py-8 w-full max-w-7xl">
          {/* Image Container */}
          <div className="w-full flex justify-center items-center mb-6">
            <img
              src={post?.featured_image || "/default-image.jpg"}
              alt={post?.title || "Default Post Image"}
              className="w-full max-w-3xl h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Post Title */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
            {post?.title || "Untitled Post"}
          </h1>

          {/* Post Content */}
          <div
            className="prose lg:prose-xl text-gray-800 mx-auto mb-12"
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(post?.body || "No content available"),
            }}
          />
        </div>
      
      <Faqs />
    </>
  );
};

export default PostPage;
