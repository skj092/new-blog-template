import React, { useState } from 'react';
import { Sun, Moon, Rss, Twitter, Github, Linkedin, Mail } from 'lucide-react';

const MinimalBlog = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const blogPosts = [
    {
      id: 1,
      title: "I used o3 to profile myself from my saved Pocket links",
      excerpt: "Welp, Pocket shuts down tomorrow despite our pleas for it to stay. While migrating1 all of my saved articles, I noticed that I've got almost 900 saved articles spanning nearly 7 years. That's a goldmine of stuff I like...",
      date: "July 7, 2025"
    },
    {
      id: 2,
      title: "Using LLMs to solve security problems",
      excerpt: "TL;DR: Raink—a novel, general-purpose listwise document ranking algorithm using an LLM as the ranking model—can be used to solve non-trivial security problems. A very simple explanation of how the Raink...",
      date: "February 28, 2025"
    },
    {
      id: 3,
      title: "Hard problems that reduce to document ranking",
      excerpt: "There are two claims I'd like to make: LLMs can be used effectively1 for listwise document ranking. Some complex problems can (surprisingly) be solved by transforming them into document ranking problems. I've...",
      date: "February 24, 2025"
    },
    {
      id: 4,
      title: "Building Modern Web Applications with React",
      excerpt: "A comprehensive guide to building scalable web applications using React, covering best practices, performance optimization, and modern development patterns...",
      date: "January 15, 2025"
    },
    {
      id: 5,
      title: "The Art of Code Review: Best Practices",
      excerpt: "Code reviews are one of the most important practices in software development. Learn how to conduct effective code reviews that improve code quality and team collaboration...",
      date: "January 10, 2025"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 py-16">
        {/* Theme Toggle */}
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

        {/* Profile Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">noperator</h1>

          {/* Profile Image */}
          <div className="mb-6">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Bio */}
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            tech tasks are cool and hacking is great
          </p>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="#"
              className={`p-3 rounded-full transition-colors ${
                isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Rss className="w-5 h-5" />
            </a>
            <a
              href="#"
              className={`p-3 rounded-full transition-colors ${
                isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className={`p-3 rounded-full transition-colors ${
                isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className={`p-3 rounded-full transition-colors ${
                isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className={`p-3 rounded-full transition-colors ${
                isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Blog Posts */}
      <main className="max-w-4xl mx-auto px-6 pb-16">
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="group">
              <div className={`p-8 rounded-2xl transition-all duration-300 ${
                isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-lg'
              }`}>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-500 transition-colors cursor-pointer">
                  {post.title}
                </h2>

                <p className={`text-base leading-relaxed mb-6 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {post.excerpt}
                </p>

                <div className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {post.date}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            isDark ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-100 text-gray-600 shadow-sm'
          }`}>
            Load More Posts
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className={`border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} mt-16`}>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              © 2025 noperator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MinimalBlog;
