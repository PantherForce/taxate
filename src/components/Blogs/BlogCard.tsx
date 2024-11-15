import React from 'react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ id, title, description, image }) => {
  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link to={`/blog/${id}`} className="text-blue-500 hover:underline">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
