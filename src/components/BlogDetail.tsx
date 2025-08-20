import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import fm from "front-matter";

interface BlogDetailProps {
  slug: string;
}

interface PostMeta {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  readTime: string;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ slug }) => {
  const [content, setContent] = useState<string>("");
  const [meta, setMeta] = useState<PostMeta>({
    title: "",
    date: "",
    summary: "",
    tags: [],
    readTime: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 格式化日期函数，确保将任何类型的日期转换为字符串
  const formatDate = (date: string | Date | unknown): string => {
    if (!date) return "";

    // 如果已经是字符串，直接返回
    if (typeof date === "string") {
      return date;
    }

    // 如果是Date对象，转换为YYYY-MM-DD格式字符串
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }

    // 其他情况，尝试转换为字符串
    return String(date);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // 动态导入Markdown文件
        const postFiles = import.meta.glob("/src/assets/posts/*.md", {
          query: "?raw",
          import: "default",
        });
        const fileKey = `/src/assets/posts/${slug}.md`;

        if (postFiles[fileKey]) {
            const markdown = await postFiles[fileKey]();
            const parsed = fm(markdown as string);
          setContent(parsed.body);

          // 确保所有元数据正确处理
          const postMeta = parsed.attributes as PostMeta;
          // 确保date始终是格式化的字符串
          postMeta.date = formatDate(postMeta.date);
          setMeta(postMeta);
        } else {
          setError(`找不到文章: ${slug}`);
        }
      } catch (err) {
        setError(
          `加载文章失败: ${err instanceof Error ? err.message : String(err)}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div className="text-center py-12">加载中...</div>;
  if (error)
    return <div className="text-center py-12 text-red-600">{error}</div>;

  return (
    <div className="blog-detail-container">
      {/* 文章头部 */}
      <div className="blog-detail-header">
        <h1 className="blog-detail-title">{meta.title}</h1>

        {/* 作者信息 */}
        <div className="author-info">
          <div className="author-avatar"></div>
          <div className="author-details">
            <div className="author-name">SanGuiChen</div>
            <div className="author-bio">探索编程、技术和AI的博主</div>
          </div>
        </div>

        {/* 文章元数据 */}
        <div className="blog-detail-meta">
          <span className="meta-item">{meta.date}</span>
          <span className="meta-divider">•</span>
          <span className="meta-item">{meta.readTime}</span>
          <span className="meta-divider">•</span>
          <span className="meta-item">{meta.tags.length} 个标签</span>
        </div>

        {/* 文章标签 */}
        <div className="blog-detail-tags">
          {meta.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 文章摘要 */}
      {meta.summary && (
        <div className="article-summary">
          <h3>摘要</h3>
          <p>{meta.summary}</p>
        </div>
      )}

      {/* 文章内容 */}
      <div className="article-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{}}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDetail;
