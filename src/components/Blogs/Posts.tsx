import React, { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.buttercms.com/v2/posts/?auth_token=${process.env.REACT_APP_BUTTERCMS_API_TOKEN}`
        );
        const data = await response.json();
        if (response.ok) {
          setPosts(data.data);
        } else {
          throw new Error("Failed to fetch posts");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-xl transition-all"
          >
            <h2 className="text-xl font-semibold text-blue-600">{post.title}</h2>
            <p className="text-gray-700">{post.summary}</p>
            <a
              href={`https://your-domain.com/${post.slug}`}
              className="text-blue-500 hover:text-blue-700"
            >
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
