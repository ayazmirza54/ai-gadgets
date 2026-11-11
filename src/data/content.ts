export type Article = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  url: string;
  image: string;
};

export const articles: Article[] = [
  {
    id: 6,
    title: 'Are LLMs just ETL pipelines on steroids? Rethinking AI training',
    excerpt: 'Behind every LLM lies a process strikingly similar to ETL: Extract, Transform, Load.',
    date: 'Apr 15, 2025',
    readTime: '7 min',
    tag: 'Deep dive',
    url: 'https://dev.to/ayazmirza54/are-llms-just-etl-pipelines-on-steroids-rethinking-ai-training-1i0c',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 1,
    title: 'Text-to-Content.ai: AI tools to transform ideas into content',
    excerpt: 'An all-in-one AI content generation platform that transforms ideas into polished content.',
    date: 'Jan 14, 2025',
    readTime: '7 min',
    tag: 'Build log',
    url: 'https://dev.to/ayazmirza54/text-to-contextai-ai-tools-to-transform-ideas-to-content-5g38',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 2,
    title: 'IntelliSketch: building an AI-powered mathematical sketching app',
    excerpt: 'How a smart canvas reads handwriting, understands equations and explains the answer.',
    date: 'Oct 12, 2024',
    readTime: '5 min',
    tag: 'Build log',
    url: 'https://dev.to/ayazmirza54/intellisketch-ai-powered-drawing-tool-3i8e',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 3,
    title: 'Migrating my app from the ChatGPT API to the Gemini API',
    excerpt: 'What changed, what broke, and what got better when switching model providers.',
    date: 'Sep 14, 2024',
    readTime: '4 min',
    tag: 'Guide',
    url: 'https://dev.to/ayazmirza54/migrating-my-app-from-chatgpt-api-to-gemini-ai-api-557o',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 4,
    title: 'ChatGPT on loop using BabyAGI and AutoGPT',
    excerpt: 'Early experiments with autonomous agents that prompt themselves.',
    date: 'Apr 13, 2023',
    readTime: '6 min',
    tag: 'Agents',
    url: 'https://dev.to/ayazmirza54/chatgpt-on-loop-using-babyagi-and-autogpt-29c8',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=70',
  },
  {
    id: 5,
    title: 'Building a text and code utilities app with the OpenAI API',
    excerpt: 'A practical walkthrough of shipping small, useful AI utilities fast.',
    date: 'Jan 28, 2023',
    readTime: '7 min',
    tag: 'Guide',
    url: 'https://dev.to/ayazmirza54/text-and-code-utilities-app-using-openai-api-4m13',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=70',
  },
];

export const newsTicker = [
  'New model drops this week: 3 open-weight LLMs top the leaderboards',
  'Prompt Hub crosses 10,000 community prompts',
  'Agents category up 240% month-over-month',
  'Creators earned ₹18L selling prompts in October',
  'New: one-click "Try in playground" for every prompt',
];
