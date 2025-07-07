// Utility to load and parse blog posts
export const loadPosts = async () => {
  try {
    // In a real app, you'd fetch from your markdown files
    // For now, we'll simulate loading from markdown files
    const posts = await import('../data/posts.json');

    // Load markdown content for each post
    const postsWithContent = await Promise.all(
      posts.default.map(async (post) => {
        try {
          // In a real implementation, you'd dynamically import markdown files
          // const markdownModule = await import(`../data/posts/${post.slug}.md`);
          // For now, we'll use placeholder content
          return {
            ...post,
            content: await loadMarkdownContent(post.slug)
          };
        } catch (error) {
          console.error(`Error loading post ${post.slug}:`, error);
          return post;
        }
      })
    );

    return postsWithContent.filter(post => post.published);
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
};

// Simulate loading markdown content
const loadMarkdownContent = async (slug) => {
  // In a real app, you'd read the actual markdown file
  // For now, return sample content based on slug
  const sampleContent = {
    'pocket-links-analysis': `# I used o3 to profile myself from my saved Pocket links

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

*Have you ever analyzed your own reading habits? What patterns did you discover?*`,

    'llms-security-problems': `# Using LLMs to solve security problems

**TL;DR:** Raink—a novel, general-purpose listwise document ranking algorithm using an LLM as the ranking model—can be used to solve non-trivial security problems.

## Introduction

Large Language Models (LLMs) have shown remarkable capabilities across various domains. Today, I want to explore how we can leverage these models for cybersecurity applications, specifically through document ranking.

## The Raink Algorithm

Raink is a **listwise document ranking algorithm** that uses an LLM as its core ranking model. Here's how it works:
