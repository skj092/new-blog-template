import React, { useState, useEffect } from 'react';
import { Sun, Moon, Rss, Twitter, Github, Linkedin, Mail, ArrowLeft, Calendar, Clock } from 'lucide-react';

// Theme Toggle Component
const ThemeToggle = ({ isDark, toggleTheme }) => (
  <div className="flex justify-end mb-8">
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition-colors ${
        isDark ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' : 'bg-white hover:bg-gray-100 text-gray-600'
      }`}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  </div>
);

// Profile Header Component
const ProfileHeader = ({ isDark }) => (
  <div className="text-center">
    <h1 className="text-4xl font-bold mb-6">noperator</h1>

    <div className="mb-6">
      <img
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-200 dark:border-gray-700"
      />
    </div>

    <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
      tech tasks are cool and hacking is great
    </p>

    <SocialLinks isDark={isDark} />
  </div>
);

// Social Links Component
const SocialLinks = ({ isDark }) => (
  <div className="flex justify-center space-x-6 mb-12">
    {[
      { icon: Rss, href: "#" },
      { icon: Twitter, href: "#" },
      { icon: Github, href: "#" },
      { icon: Linkedin, href: "#" },
      { icon: Mail, href: "#" }
    ].map(({ icon: Icon, href }, index) => (
      <a
        key={index}
        href={href}
        className={`p-3 rounded-full transition-colors ${
          isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-100 text-gray-600'
        }`}
      >
        <Icon className="w-5 h-5" />
      </a>
    ))}
  </div>
);

// Blog Post Card Component
const BlogPostCard = ({ post, isDark, onClick }) => (
  <article className="group cursor-pointer" onClick={() => onClick(post)}>
    <div className={`p-8 rounded-2xl transition-all duration-300 ${
      isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-lg'
    }`}>
      <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-500 transition-colors">
        {post.title}
      </h2>

      <p className={`text-base leading-relaxed mb-6 ${
        isDark ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {post.excerpt}
      </p>

      <div className={`flex items-center space-x-4 text-sm ${
        isDark ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{post.readTime}</span>
        </div>
      </div>
    </div>
  </article>
);

// Markdown Renderer Component
const MarkdownRenderer = ({ content, isDark }) => {
  const renderMarkdown = (text) => {
    // Simple markdown parser - you can replace this with a more robust one
    let html = text
      // Headers
      .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-4 mt-8">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-6 mt-10">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-8 mt-12">$1</h1>')

      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

      // Links
      .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-blue-500 hover:text-blue-600 underline">$1</a>')

      // Code blocks
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre class="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto my-6"><code class="text-sm">${code.trim()}</code></pre>`;
      })

      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">$1</code>')

      // Lists
      .replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul class="list-disc list-inside mb-6 space-y-2">$1</ul>')
      .replace(/^\d+\. (.*$)/gm, '<li class="mb-2">$1</li>')

      // Blockquotes
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic mb-6">$1</blockquote>')

      // Paragraphs
      .replace(/\n\n/g, '</p><p class="mb-6">')
      .replace(/^/, '<p class="mb-6">')
      .replace(/$/, '</p>');

    return html;
  };

  return (
    <div
      className={`prose max-w-none ${isDark ? 'prose-invert' : ''}`}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
};

// Blog Post View Component
const BlogPostView = ({ post, isDark, onBack }) => (
  <div className="max-w-4xl mx-auto px-6 py-8">
    <button
      onClick={onBack}
      className={`flex items-center space-x-2 mb-8 text-blue-500 hover:text-blue-600 transition-colors`}
    >
      <ArrowLeft className="w-5 h-5" />
      <span>Back to Home</span>
    </button>

    <article className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-lg`}>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className={`flex items-center space-x-4 text-sm ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      <div className="prose-content">
        <MarkdownRenderer content={post.content} isDark={isDark} />
      </div>
    </article>
  </div>
);

// Blog Posts List Component
const BlogPostsList = ({ posts, isDark, onPostClick }) => (
  <main className="max-w-4xl mx-auto px-6 pb-16">
    <div className="space-y-12">
      {posts.map((post) => (
        <BlogPostCard
          key={post.id}
          post={post}
          isDark={isDark}
          onClick={onPostClick}
        />
      ))}
    </div>

    <div className="text-center mt-16">
      <button className={`px-8 py-3 rounded-lg font-medium transition-colors ${
        isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-100 text-gray-600 shadow-sm'
      }`}>
        Load More Posts
      </button>
    </div>
  </main>
);

// Footer Component
const Footer = ({ isDark }) => (
  <footer className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} mt-16`}>
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="text-center">
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          © 2025 noperator. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// Posts Data Manager
const usePostsData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would typically load from your markdown files
    // For now, using sample data
    const samplePosts = [
      {
        id: 1,
        title: "I used o3 to profile myself from my saved Pocket links",
        excerpt: "Welp, Pocket shuts down tomorrow despite our pleas for it to stay. While migrating all of my saved articles, I noticed that I've got almost 900 saved articles spanning nearly 7 years.",
        date: "July 7, 2025",
        readTime: "5 min read",
        slug: "pocket-links-analysis",
        content: `# I used o3 to profile myself from my saved Pocket links

Welp, Pocket shuts down tomorrow despite our pleas for it to stay. While migrating all of my saved articles, I noticed that I've got almost 900 saved articles spanning nearly 7 years. That's a goldmine of stuff I like.

## The Challenge

I had been using Pocket religiously for years, saving articles on everything from **machine learning** to **security research** to random tech blog posts. But with nearly 900 articles, I realized I had no clear picture of what my interests actually were.

## Enter o3

I decided to use OpenAI's o3 model to analyze my saved links and create a profile of my interests. Here's what I discovered:

### My Top Categories:
1. **Security Research** - 35% of my saved articles
2. **Machine Learning** - 28% of my saved articles
3. **Web Development** - 20% of my saved articles
4. **Career Advice** - 10% of my saved articles
5. **Random Tech News** - 7% of my saved articles

### Interesting Patterns

The analysis revealed some fascinating patterns:

\`\`\`python
# Sample code from my analysis
import collections
from datetime import datetime

def analyze_reading_patterns(articles):
    categories = collections.defaultdict(int)
    for article in articles:
        categories[article.category] += 1
    return categories
\`\`\`

## Key Insights

> "Your reading habits show a strong bias toward technical security content, with a particular interest in LLM security and AI safety." - o3's analysis

This was actually quite accurate! I've been deeply involved in AI safety research for the past few years.

## What's Next?

Now that I have this profile, I plan to:

- Be more intentional about what I save
- Create dedicated reading lists for different topics
- Use this data to guide my learning path

The migration from Pocket was bittersweet, but this analysis exercise gave me valuable insights into my own interests and learning patterns.

---

*Have you ever analyzed your own reading habits? What patterns did you discover?*`
      },
      {
        id: 2,
        title: "Using LLMs to solve security problems",
        excerpt: "TL;DR: Raink—a novel, general-purpose listwise document ranking algorithm using an LLM as the ranking model—can be used to solve non-trivial security problems.",
        date: "February 28, 2025",
        readTime: "8 min read",
        slug: "llms-security-problems",
        content: `# Using LLMs to solve security problems

**TL;DR:** Raink—a novel, general-purpose listwise document ranking algorithm using an LLM as the ranking model—can be used to solve non-trivial security problems.

## Introduction

Large Language Models (LLMs) have shown remarkable capabilities across various domains. Today, I want to explore how we can leverage these models for cybersecurity applications, specifically through document ranking.

## The Raink Algorithm

Raink is a **listwise document ranking algorithm** that uses an LLM as its core ranking model. Here's how it works:

\`\`\`python
class SecurityRanker:
    def __init__(self, llm_model):
        self.llm = llm_model

    def rank_threats(self, security_events):
        # Preprocess events into document format
        docs = self.preprocess_events(security_events)

        # Use LLM to rank by severity
        ranked_docs = self.llm.rank_documents(
            docs,
            criteria="security threat severity"
        )

        return ranked_docs
\`\`\`

## Real-World Applications

### 1. Threat Intelligence Analysis
- **Problem**: Analysts receive thousands of threat reports daily
- **Solution**: Raink ranks reports by relevance to organization's threat model
- **Result**: 80% reduction in analysis time

### 2. Incident Response Prioritization
- **Problem**: Multiple security incidents occurring simultaneously
- **Solution**: Rank incidents by potential impact and urgency
- **Result**: Faster response to critical threats

## Technical Deep Dive

The key insight is that many security problems can be reframed as **ranking problems**:

> Instead of asking "Is this a threat?", we ask "How does this threat rank compared to others?"

This subtle shift allows us to leverage the comparative reasoning capabilities of LLMs.

## Conclusion

LLMs offer powerful capabilities for security applications when properly constrained and evaluated. The key is finding the right abstraction—in this case, ranking—that matches both the problem domain and the model's strengths.`
      }
    ];

    setPosts(samplePosts);
    setLoading(false);
  }, []);

  return { posts, loading };
};

// Main Blog Component
const MinimalBlog = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const { posts, loading } = usePostsData();

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setCurrentView('post');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {currentView === 'home' ? (
        <>
          <header className="max-w-4xl mx-auto px-6 py-16">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            <ProfileHeader isDark={isDark} />
          </header>
          <BlogPostsList posts={posts} isDark={isDark} onPostClick={handlePostClick} />
          <Footer isDark={isDark} />
        </>
      ) : (
        <>
          <header className="max-w-4xl mx-auto px-6 py-8">
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          </header>
          <BlogPostView post={selectedPost} isDark={isDark} onBack={handleBackToHome} />
          <Footer isDark={isDark} />
        </>
      )}
    </div>
  );
};

export default MinimalBlog;
