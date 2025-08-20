#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import matter from 'front-matter';

// 设置路径
const POSTS_DIR = path.join(process.cwd(), 'src', 'assets', 'posts');
const OUTPUT_FILE = path.join(process.cwd(), 'src', 'data', 'posts.json');

// 确保输出目录存在
const ensureDirExists = (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

// 生成posts.json文件
const generatePostsJson = async () => {
  try {
    // 读取posts目录下的所有Markdown文件
    const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));
    
    const posts = [];
    
    // 处理每个文件
    for (const file of files) {
      const filePath = path.join(POSTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // 解析front matter
      const { attributes } = matter(content);
      
      // 获取slug（文件名不带扩展名）
      const slug = path.basename(file, '.md');
      
      // 格式化日期为YYYY-MM-DD格式
      const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        return d.toISOString().split('T')[0];
      };
      
      // 构建post对象
      const post = {
        slug,
        title: attributes.title || '',
        summary: attributes.summary || '',
        date: formatDate(attributes.date),
        readTime: attributes.readTime || '',
        tags: attributes.tags || []
      };
      
      posts.push(post);
    }
    
    // 按日期排序（最新的在前）
    posts.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    // 确保输出目录存在
    ensureDirExists(OUTPUT_FILE);
    
    // 写入posts.json文件
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2), 'utf-8');
    
    console.log(`✅ 成功生成 ${posts.length} 篇文章的数据到 ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('❌ 生成posts.json失败:', error);
    process.exit(1);
  }
};

// 执行脚本
generatePostsJson();