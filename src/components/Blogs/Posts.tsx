import React, { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  featured_image: string; // Assuming the API returns an image URL
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api.buttercms.com/v2/posts/?auth_token=${
            import.meta.env.VITE_BUTTERCMS_API_TOKEN
          }`
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
    <div className="container mx-auto px-4 py-8">
      {loading && (
        <div className="text-center text-xl text-blue-600">
          <span className="animate-pulse">Loading...</span>
        </div>
      )}

      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-300 p-6 rounded-lg shadow-md hover:shadow-xl transition-all bg-white"
          >
            <div className="relative h-48 mb-4">
              <img
                src={post.featured_image || "/path/to/placeholder.jpg"} // Use a default placeholder image if not available
                alt={post.title}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              {post.title}
            </h2>
            <p className="text-gray-700 text-base mb-4">{post.summary}</p>
            <a
  href={`https://www.taxate.in/post/${post.slug}`}
  className="inline-block text-blue-500 hover:text-blue-700 font-medium"
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
