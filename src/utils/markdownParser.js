// Enhanced markdown parser with better formatting
export const parseMarkdown = (markdown, isDark = false) => {
  let html = markdown
    // Handle frontmatter (remove it)
    .replace(/^---[\s\S]*?---\n/, '')

    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-4 mt-8">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-6 mt-10">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-8 mt-12">$1</h1>')

    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

    // Links
    .replace(/\[([^\]]+)\]\(([^\)]+)\)/g, '<a href="$2" class="text-blue-500 hover:text-blue-600 underline">$1</a>')

    // Code blocks with syntax highlighting
    .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const bgClass = isDark ? 'bg-gray-900' : 'bg-gray-100';
      return `<pre class="${bgClass} p-4 rounded-lg overflow-x-auto my-6 border"><code class="text-sm language-${lang || 'text'}">${code.trim()}</code></pre>`;
    })

    // Inline code
    .replace(/`([^`]+)`/g, `<code class="${isDark ? 'bg-gray-800' : 'bg-gray-100'} px-2 py-1 rounded text-sm">$1</code>`)

    // Lists
    .replace(/^- (.*$)/gm, '<li class="mb-2">$1</li>')
    .replace(/(<li.*?<\/li>)/g, '<ul class="list-disc list-inside mb-6 space-y-2">$1</ul>')

    // Blockquotes
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic mb-6 text-gray-600">$1</blockquote>')

    // Horizontal rule
    .replace(/^---$/gm, '<hr class="border-gray-300 my-8">')

    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-6">')
    .replace(/^(?!<[h|u|b|p|c])/gm, '<p class="mb-6">')
    .replace(/$/, '</p>');

  return html;
};

// Extract frontmatter from markdown
export const extractFrontmatter = (markdown) => {
  const frontmatterMatch = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return {};

  const frontmatter = {};
  const lines = frontmatterMatch[1].split('\n');

  lines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      frontmatter[key.trim()] = value;
    }
  });

  return frontmatter;
};
