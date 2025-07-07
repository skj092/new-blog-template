import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { marked } from 'marked'; // Import marked library

const BlogPost = ({ postId, onBack, isDark, blogPostsMetadata }) => {
  const [postContent, setPostContent] = useState('');
  const [currentPostMetadata, setCurrentPostMetadata] = useState(null);

  useEffect(() => {
    // Find the metadata for the current post
    const metadata = blogPostsMetadata.find(post => post.id === postId);
    setCurrentPostMetadata(metadata);

    if (metadata && metadata.markdownFile) {
      // Fetch the markdown file content
      fetch(metadata.markdownFile)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(markdown => {
          // Parse markdown to HTML and set the content
          setPostContent(marked(markdown));
        })
        .catch(error => {
          console.error("Error fetching or parsing markdown:", error);
          setPostContent('<p>Error loading post content.</p>');
        });
    } else {
      setPostContent('<p>Post not found.</p>');
    }
  }, [postId, blogPostsMetadata]); // Re-run effect if postId or metadata changes

  if (!currentPostMetadata) {
    return (
      <div className={`max-w-4xl mx-auto px-6 pb-16 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <div className="flex justify-start mb-8">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700 text-blue-400' : 'bg-white hover:bg-gray-100 text-blue-600'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>
        <p className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>Loading post...</p>
      </div>
    );
  }

  return (
    <div className={`max-w-4xl mx-auto px-6 pb-16 ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex justify-start mb-8">
        <button
          onClick={onBack}
          className={`p-2 rounded-lg transition-colors ${
            isDark ? 'bg-gray-800 hover:bg-gray-700 text-blue-400' : 'bg-white hover:bg-gray-100 text-blue-600'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      <article className="group">
        <div className={`p-8 rounded-2xl transition-all duration-300 ${
          isDark ? 'bg-gray-800' : 'bg-white shadow-lg'
        }`}>
          <h2 className="text-3xl font-bold mb-4">
            {currentPostMetadata.title}
          </h2>

          <div
            className={`text-base leading-relaxed mb-6 prose ${ // Add 'prose' for Tailwind Typography if installed
              isDark ? 'text-gray-300 prose-invert' : 'text-gray-700'
            }`}
            dangerouslySetInnerHTML={{ __html: postContent }} // Render parsed HTML
          />

          <div className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {currentPostMetadata.date}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
