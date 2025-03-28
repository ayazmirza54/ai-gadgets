import React, { useState, useMemo } from 'react';
import { Cpu, Pencil, GitBranch, Bot, Code } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ToolCard } from './components/ToolCard';
import { BlogCard } from './components/BlogCard';
import './atariTheme.css';

const featuredTools = [
  {
    id: 1,
    title: "Text to Content AI",
    description: "One stop shop for content creation using AI.",
    price: "free",
    rating: 4.8,
    imageUrl: "https://texttocontentdotai.vercel.app",
    category: "ai"
  },
  {
    id: 2,
    title: "QuerySmith AI",
    description: "Generate SQL queries using AI",
    price: "free",
    rating: 4.7,
    imageUrl: "https://query-smith.streamlit.app/",
    category: "dev"
  },
  {
    id: 3,
    title: "Email Smith AI",
    description: "AI-powered Email generation tool",
    price: "free",
    rating: 4.9,
    imageUrl: "emailsmith.vercel.app",
    category: "productivity"
  },
  {
    id: 4,
    title: "Unix Bot AI",
    description: "Transform text into specific unix commands",
    price: "free",
    rating: 4.6,
    imageUrl: "https://unix-bot.streamlit.app/",
    category: "dev"
  },
  {
    id: 5,
    title: "WebSearch AI",
    description: "AI powered search engine",
    price: "free",
    rating: 4.5,
    imageUrl:"https://websearchai.streamlit.app/" ,
    category: "dev"
  },
  {
    id: 6,
    title: "IntelliSketch AI",
    description: "AI powered drawing tool",
    price: "free",
    rating: 4.5,
    imageUrl: "https://intellisketch.streamlit.app/",
    category: "ai"},
    {
    id: 7,
    title: "Chat to any PDF using AI",
    description: "AI powered chat",
    price: "free",
    rating: 4.5,
    imageUrl: "https://chat2pdf-using-gemini.streamlit.app/",
    category: "productivity"}
];

const blogPosts = [
  {
    id: 1,
    title: "Intellisketch : AI powered drawing tool",
    subtitle: "IntelliSketch: Building an AI-Powered Mathematical Sketching App",
    date: "Oct 12, 2024",
    readTime: "5 min",
    source: "Dev.to",
    icon: <Pencil className="w-5 h-5" />
  },
  {
    id: 2,
    title: "Migrating my app from chatgpt API to Gemini AI API",
    subtitle: "Migrating my app from chatgpt API to Gemini AI API",
    date: "Sept 14, 2024",
    readTime: "4 min",
    source: "Dev.to",
    icon: <GitBranch className="w-5 h-5" />
  },
  {
    id: 3,
    title: "ChatGPT on loop using babyAGI and AutoGPT",
    subtitle: "Using babyAGI and AutoGPT to interact with chatGPT on loop",
    date: "Apr 13, 2023",
    readTime: "6 min",
    source: "Dev.to",
    icon: <Bot className="w-5 h-5" />
  },
  {
    id: 4,
    title: "Text and Code Utilities App using OpenAI API",
    subtitle: "Building a Text and Code Utilities App using OpenAI API",
    date: "Jan 28, 2023",
    readTime: "7 min",
    source: "Dev.to",
    icon: <Code className="w-5 h-5" />
  }
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTools = useMemo(() => {
    return featuredTools.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleToolClick = (toolId: number) => {
    // In a real app, this would navigate to the tool's detail page
    console.log(`Viewing tool ${toolId}`);
  };

  const handleBlogClick = (blogId: number) => {
    // In a real app, this would navigate to the blog post
    console.log(`Reading blog ${blogId}`);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white atari-container">
      {/* Header */}
      <header className="py-4 shadow-md sticky top-0 z-10 atari-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Cpu className="w-8 h-8 atari-logo" />
              <h1 className="text font-bold shimmer-text">
                AI Gadgets.show - an AI tools marketplace
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="py-16 atari-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8 shimmer-text">
            DISCOVER AI TOOLS
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text atari-subtitle">
            EXPLORE THE MOST POWERFUL AI TOOLS
          </p>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text atari-subtitle">NO TOOLS FOUND</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                {...tool}
                onClick={() => handleToolClick(tool.id)}
              />
            ))}
          </div>
        )}

        {/* Blogs Section */}
        <div className="mt-20 mb-10">
          <h2 className="text font-bold mb-12 uppercase shimmer-text">Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                subtitle={blog.subtitle}
                date={blog.date}
                readTime={blog.readTime}
                source={blog.source}
                icon={blog.icon}
                onClick={() => handleBlogClick(blog.id)}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;