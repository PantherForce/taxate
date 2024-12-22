import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // If you're using React Router

const PostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); // Get slug from the URL
  const [post, setPost] = useState<any>(null);
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
  }, [slug]); // Run fetch on slug change

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">{post?.title}</h1>
      <div className="prose">
        <p>{post?.summary}</p>
        {/* Render full content of the post, if available */}
      </div>
    </div>
  );
};

export default PostPage;
