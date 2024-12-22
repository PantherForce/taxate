import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Navbar from "../Navbar/Navbar";
import Faqs from "../Pages/Faqs/Faqs";

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
        // Replace with your actual API endpoint
        const response = await fetch(
          `https://api.buttercms.com/v2/posts/${slug}/?auth_token=bcd5aa56673a1a8cf6c11dd443b4a0e15486757f`
        );

        // Check if the response is OK
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the response as JSON
        const data = await response.json();
        console.log(data, "data");

        // Assuming the data structure is data.data, set the post state
        setPost(data.data);
      } catch (err: any) {
        // Handle errors
        setError(err.message || "An unexpected error occurred");
      } finally {
        // Always set loading to false after the fetch attempt
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // Show loading state
  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  // Show error message if there's an error
  if (error) {
    return <div className="text-center text-lg text-red-600">{error}</div>;
  }

  // Function to sanitize the HTML content
  const sanitizeHTML = (html: string) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const body = doc.body;

    // Define allowed tags
    const allowedTags = ["p", "h1", "h2", "h3", "ul", "ol", "li", "a", "strong", "em"];

    // Remove disallowed tags
    const elements = body.querySelectorAll("*");
    elements.forEach((element) => {
      if (!allowedTags.includes(element.tagName.toLowerCase())) {
        element.remove();
      }
    });

    return body.innerHTML;
  };

  return (
    <>
      <Navbar />
      <ContentContainer>
        <div className="mx-auto px-6 py-8 w-full">
          <div className="mb-6">
            <div className="w-full flex justify-center items-center lg:w-1/2">
              <img
                src={post?.featured_image || "/default-image.jpg"}
                alt={post?.title || "Default Post Image"}
                className="w-full h-72 object-cover rounded-lg shadow-md mb-4"
              />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
              {post?.title || "Untitled Post"}
            </h1>
          </div>
          <div
            className="prose lg:prose-xl text-gray-800"
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(post?.body || "No content available"),
            }}
          />
        </div>
      </ContentContainer>
      <Faqs />
    </>
  );
};

export default PostPage;
