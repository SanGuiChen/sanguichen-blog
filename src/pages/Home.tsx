import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import BlogList from "../components/BlogList";

interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 导入posts.json文件
        const postsData = await import("../data/posts.json");
        setPosts(postsData.default);
      } catch (err) {
        setError(
          `加载文章列表失败: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading)
    return (
      <Layout>
        <div className="loading">加载文章列表中...</div>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <div className="error">{error}</div>
      </Layout>
    );

  return (
    <Layout>
      <div className="hero">
        <h1>欢迎来到 SanGuiChen 的博客</h1>
        <p>分享我的学习心得、技术探索和生活感悟</p>
      </div>

      {posts.length > 0 ? (
        <BlogList posts={posts} />
      ) : (
        <div className="text-center py-12 text-gray-500">暂无文章</div>
      )}
    </Layout>
  );
};

export default Home;
