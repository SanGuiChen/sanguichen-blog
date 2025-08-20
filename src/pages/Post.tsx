import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import BlogDetail from "../components/BlogDetail";
import BackLink from "../components/BackLink";

const Post: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // 如果slug不存在，重定向到首页
  if (!slug) {
    return (
      <Layout>
        <div className="text-center py-12 text-red-600">文章不存在</div>
        <BackLink to="/" label="← 返回首页" />
      </Layout>
    );
  }

  return (
    <Layout>
      <BlogDetail slug={slug} />
      <BackLink to="/" label="← 返回首页" />
    </Layout>
  );
};

export default Post;
