import React from "react";
import { Link } from "react-router-dom";

interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface BlogCardProps {
  post: Post;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <div className="blog-post">
      <div className="post-meta">
        <span className="date">{post.date}</span>
        <span className="read-time">{post.readTime}</span>
      </div>
      <h2>
        <Link to={`/post/${post.slug}`}>{post.title}</Link>
      </h2>
      <p className="post-summary">{post.summary}</p>
      <div className="post-tags">
        {post.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
