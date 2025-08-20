import React from "react";
import BlogCard from "./BlogCard.tsx";

interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface BlogListProps {
  posts: Post[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="blog-list">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
