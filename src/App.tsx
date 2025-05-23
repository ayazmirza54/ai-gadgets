import React, { useState, useMemo } from 'react';
import { Pencil, GitBranch, Bot, Code } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { ToolCard } from './components/ToolCard';
import { BlogCard } from './components/BlogCard';
import './atariTheme.css';
import { Analytics } from "@vercel/analytics/react"
import logo from './assets/logo.png'
const featuredTools = [
  {
    id: 1,
    title: "Text to Content AI",
    description: "One stop shop for content creation using AI.",
    price: "free",
    rating: 4.8,
    imageUrl: "https://texttocontentdotai.vercel.app",
    category: "image",
    thumbnailUrl: "https://opengraph.b-cdn.net/production/images/d2191f8c-f07c-494b-854b-281f67c52b6e.png?token=QK8jkkzV7j7xvYLQdz4UvUYMfRqlyDzGNER8TCVsP8c&height=1013&width=1200&expires=33271056025"
  },
  {
    id: 2,
    title: "QuerySmith AI",
    description: "Generate SQL queries using AI",
    price: "free",
    rating: 4.7,
    imageUrl: "https://query-smith.streamlit.app/",
    category: "dev",
    thumbnailUrl: "https://storage.googleapis.com/s4a-prod-share-preview/default/st_app_screenshot_image/a1f682d0-a02d-4a4b-8c7f-676d398a776d/Home_Page.png"
  },
  {
    id: 3,
    title: "Email Smith AI",
    description: "AI-powered Email generation tool",
    price: "free",
    rating: 4.9,
    imageUrl: "https://genanemail.vercel.app/",
    category: "productivity",
    thumbnailUrl: "https://opengraph.b-cdn.net/production/images/75ed6f61-b142-4690-9c13-1961cfa28c01.png?token=2a0spdMuDL6smlo0jCBjPyeH_ru0E4j4t5MBC2BaaCc&height=900&width=1200&expires=33278379118"
  },
  {
    id: 4,
    title: "Unix Bot AI",
    description: "Transform text into specific unix commands",
    price: "free",
    rating: 4.6,
    imageUrl: "https://unix-bot.streamlit.app/",
    category: "dev",
    thumbnailUrl: "https://storage.googleapis.com/s4a-prod-share-preview/default/st_app_screenshot_image/68318dd4-b170-4e16-bde3-ac68ffcb091a/Home_Page.png"
  },
  {
    id: 5,
    title: "WebSearch AI",
    description: "AI powered search engine",
    price: "free",
    rating: 4.5,
    imageUrl: "https://websearchai.streamlit.app/",
    category: "dev",
    thumbnailUrl: "https://storage.googleapis.com/s4a-prod-share-preview/default/st_app_screenshot_image/afbcdf23-6162-4ae8-9056-48820f73395d/Home_Page.png"
  },
  {
    id: 6,
    title: "IntelliSketch AI",
    description: "AI powered drawing tool",
    price: "free",
    rating: 4.5,
    imageUrl: "https://intellisketch.vercel.app/",
    category: "ai",
    thumbnailUrl: "https://opengraph.b-cdn.net/production/images/bfe7cda6-e841-44c6-8051-50ddc1337c22.png?token=TLmuYhH4eGMunQZnkRk-3cc1ix8qSsgwURDJjzgwtFA&height=513&width=1200&expires=33279220158"
  },
  {
    id: 7,
    title: "Chat to any PDF using AI",
    description: "AI powered chat",
    price: "free",
    rating: 4.5,
    imageUrl: "https://chat2pdf-using-gemini.streamlit.app/",
    category: "productivity",
    thumbnailUrl: "https://storage.googleapis.com/s4a-prod-share-preview/default/st_app_screenshot_image/f3b3e2e9-49f2-40f8-b409-e77a4614e8d3/Home_Page.png"
  }
];

const blogPosts = [
  
    {
    id: 1,
    title: "Text-to-Context.ai : AI tools to transform ideas to content",
    subtitle: "Text-to-Content AI is an all-in-one AI content generation platform that transforms ideas into polished content.",
    date: "Jan 14, 2025",
    readTime: "7 min",
    source: "https://dev.to/ayazmirza54/text-to-contextai-ai-tools-to-transform-ideas-to-content-5g38",
   
  },
  {
    id: 2,
    title: "Intellisketch : AI powered drawing tool",
    subtitle: "IntelliSketch: Building an AI-Powered Mathematical Sketching App",
    date: "Oct 12, 2024",
    readTime: "5 min",
    source: "https://dev.to/ayazmirza54/intellisketch-ai-powered-drawing-tool-3i8e",

  },
  {
    id: 3,
    title: "Migrating my app from chatgpt API to Gemini AI API",
    subtitle: "Migrating my app from chatgpt API to Gemini AI API",
    date: "Sept 14, 2024",
    readTime: "4 min",
    source: "https://dev.to/ayazmirza54/migrating-my-app-from-chatgpt-api-to-gemini-ai-api-557o",

  },
  {
    id: 4,
    title: "ChatGPT on loop using babyAGI and AutoGPT",
    subtitle: "Using babyAGI and AutoGPT to interact with chatGPT on loop",
    date: "Apr 13, 2023",
    readTime: "6 min",
    source: "https://dev.to/ayazmirza54/chatgpt-on-loop-using-babyagi-and-autogpt-29c8",
    
  },
  {
    id: 5,
    title: "Text and Code Utilities App using OpenAI API",
    subtitle: "Building a Text and Code Utilities App using OpenAI API",
    date: "Jan 28, 2023",
    readTime: "7 min",
    source: "https://dev.to/ayazmirza54/text-and-code-utilities-app-using-openai-api-4m13",
   
  },
   {
    id: 6,
    title: "Are LLMs Just ETL Pipelines on Steroids? Rethinking AI Training",
    subtitle: "We talk a lot about Large Language Models (LLMs) like GPT, Claude, and Llama – their incredible generative capabilities, their potential, and their complexities. But have you ever stopped to think about the process that gets them there? Strip away the most advanced layers, and the initial training phase starts to look surprisingly familiar to something many of us work with daily: ETL (Extract, Transform, Load).",
    date: "Apr 15, 2025",
    readTime: "7 min",
    source: "https://dev.to/ayazmirza54/are-llms-just-etl-pipelines-on-steroids-rethinking-ai-training-1i0c",
   
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
    // Find the tool with the matching ID
    const tool = featuredTools.find(t => t.id === toolId);

    // If the tool exists and has a URL, open it in a new tab
    if (tool && tool.imageUrl) {
      window.open(tool.imageUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleBlogClick = (blogId: number) => {
    // Find the blog with the matching ID
    const blog = blogPosts.find(b => b.id === blogId);

    // If the blog exists and has a URL, open it in a new tab
    if (blog && blog.source) {
      window.open(blog.source, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white atari-container">
      {/* Header */}
      <header className="py-4 shadow-md sticky top-0 z-10 atari-header">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} className="w-12 h-12 md:w-10 md:h-10 atari-logo" />
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
                thumbnailUrl={tool.thumbnailUrl}
              />
            ))}
          </div>
        )}

        {/* Blogs Section */}
        <div className="mt-20 mb-10">
          <h2 className="text font-bold mb-12 uppercase shimmer-text">Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-2">
            {blogPosts.map((blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                subtitle={blog.subtitle}
                date={blog.date}
                readTime={blog.readTime}
              //  source={blog.source}
                onClick={() => handleBlogClick(blog.id)}
              />
            ))}
          </div>
        </div>
      </main>
      <Analytics />
    </div>
  );
}

export default App;
