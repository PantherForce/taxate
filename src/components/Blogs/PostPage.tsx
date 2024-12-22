import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentContainer from "../Layout/ContentContainer/ContentContainer";
import Navbar from "../Navbar/Navbar";
import Faqs from "../Pages/Faqs/Faqs";

interface Post {
  title: string;
  summary: string;
  content: string;
  featured_image: string;
}

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
        const data = await response.json();
        if (response.ok) {
          setPost(data.data);
        } else {
          throw new Error("Failed to fetch post");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div className="text-center text-lg text-gray-600">Loading...</div>;
  if (error) return <div className="text-center text-lg text-red-600">{error}</div>;

  return (
    <>
    <Navbar/>
    <ContentContainer>
    <div className="mx-auto px-6 py-8 w-full">
      <div className="mb-6">
        <img
          src={post?.featured_image || "/path/to/placeholder.jpg"}
          alt={post?.title}
          className="w-full h-72 object-cover rounded-lg shadow-md mb-4"
        />
        <h1 className="text-2xl font-extrabold text-gray-900 mb-4">{post?.title}</h1>
        <p className="text-xl text-gray-700 mb-6">{post?.summary}</p>
      </div>
      <div className="prose lg:prose-xl text-gray-800">
        <div dangerouslySetInnerHTML={{ __html: post?.content || "" }} />
      </div>
    </div>
    </ContentContainer>
    <Faqs/>
    </>
  );
};

export default PostPage;
