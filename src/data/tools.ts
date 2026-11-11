import {
  Sparkles, Database, Mail, Terminal, Search, PenTool, FileText, Wand2, Mic, Film,
  Megaphone, BarChart3, Bot, Languages, Presentation, Music, ScanEye, Workflow, NotebookPen, Code2,
  type LucideIcon,
} from 'lucide-react';

export type Pricing = 'Free' | 'Freemium' | 'Paid';

export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  pricing: Pricing;
  priceLabel: string;
  rating: number;
  reviews: number;
  saves: number;
  tags: string[];
  models: string[];
  icon: LucideIcon;
  gradient: string; // tailwind gradient classes
  url: string;
  thumbnail?: string;
  maker: string;
  verified?: boolean;
  featured?: boolean;
  isNew?: boolean;
  trending?: boolean;
  features: string[];
};

export const tools: Tool[] = [
  {
    slug: 'text-to-content-ai',
    name: 'Text to Content AI',
    tagline: 'One-stop shop for content creation using AI',
    description:
      'Turn a single idea into blog posts, social threads, scripts and captions. Text to Content AI keeps your tone consistent across every format and lets you remix outputs in one click.',
    category: 'writing',
    pricing: 'Free',
    priceLabel: 'Free',
    rating: 4.8,
    reviews: 1284,
    saves: 9200,
    tags: ['Content', 'Social', 'Blog'],
    models: ['Gemini'],
    icon: Sparkles,
    gradient: 'from-zap via-emerald-400 to-aqua',
    url: 'https://texttocontentdotai.vercel.app',
    thumbnail:
      'https://opengraph.b-cdn.net/production/images/d2191f8c-f07c-494b-854b-281f67c52b6e.png?token=QK8jkkzV7j7xvYLQdz4UvUYMfRqlyDzGNER8TCVsP8c&height=1013&width=1200&expires=33271056025',
    maker: 'Zapp Labs',
    verified: true,
    featured: true,
    trending: true,
    features: ['12+ content formats', 'Brand voice memory', 'One-click remix', 'Export to Markdown'],
  },
  {
    slug: 'querysmith-ai',
    name: 'QuerySmith AI',
    tagline: 'Plain English in, production-ready SQL out',
    description:
      'Describe the data you need and QuerySmith writes optimised SQL for Postgres, MySQL, BigQuery and Snowflake — with explanations for every join.',
    category: 'coding',
    pricing: 'Free',
    priceLabel: 'Free',
    rating: 4.7,
    reviews: 812,
    saves: 6100,
    tags: ['SQL', 'Data', 'Dev'],
    models: ['Gemini', 'GPT'],
    icon: Database,
    gradient: 'from-aqua via-cyan-400 to-sky-500',
    url: 'https://query-smith.streamlit.app/',
    thumbnail:
      'https://storage.googleapis.com/s4a-prod-share-preview/default/st_app_screenshot_image/a1f682d0-a02d-4a4b-8c7f-676d398a776d/Home_Page.png',
    maker: 'Zapp Labs',
    verified: true,
    featured: true,
    features: ['Multi-dialect SQL', 'Schema-aware', 'Query explainer', 'Copy & run'],
  },
  {
    slug: 'email-smith-ai',
    name: 'Email Smith AI',
    tagline: 'Emails that sound like you — on your best day',
    description:
      'Draft replies, cold outreach and follow-ups in seconds. Pick a tone, add context, and Email Smith handles the rest.',
    category: 'productivity',
    pricing: 'Free',
    priceLabel: 'Free',
    rating: 4.9,
    reviews: 2031,
    saves: 11800,
    tags: ['Email', 'Outreach'],
    models: ['GPT'],
    icon: Mail,
    gradient: 'from-sky-400 via-volt to-blue-600',
    url: 'https://genanemail.vercel.app/',
    thumbnail:
      'https://opengraph.b-cdn.net/production/images/75ed6f61-b142-4690-9c13-1961cfa28c01.png?token=2a0spdMuDL6smlo0jCBjPyeH_ru0E4j4t5MBC2BaaCc&height=900&width=1200&expires=33278379118',
    maker: 'Zapp Labs',
    verified: true,
    featured: true,
    trending: true,
    features: ['Tone presets', 'Reply threading', 'Multi-language', 'Gmail-ready'],
  },
  {
    slug: 'unix-bot-ai',
    name: 'Unix Bot AI',
    tagline: 'Describe it. Get the exact shell command.',
    description:
      'Stop googling flags. Unix Bot translates natural language into safe, explained shell commands for bash, zsh and PowerShell.',
    category: 'coding',
    pricing: 'Free',
    priceLabel: 'Free',
    rating: 4.6,
    reviews: 544,
    saves: 4300,
    tags: ['Shell', 'CLI', 'DevOps'],
    models: ['Gemini'],
    icon: Terminal,
    gradient: 'from-emerald-300 via-teal-400 to-aqua',
    url: 'https://unix-bot.streamlit.app/',
    thumbnail:
      'https://storage.googleapis.com/s4a-prod-share-preview/default/st_app_screenshot_image/68318dd4-b170-4e16-bde3-ac68ffcb091a/Home_Page.png',
    maker: 'Zapp Labs',
    verified: true,
    features: ['Flag explanations', 'Danger warnings', 'Cross-shell', 'History'],
  },
  {
    slug: 'websearch-ai',
    name: 'WebSearch AI',
    tagline: 'Answers with sources, not ten blue links',
    description:
      'An AI search engine that reads the web for you and returns a cited, summarised answer you can actually trust.',
    category: 'research',
    pricing: 'Free',
    priceLabel: 'Free',
    rating: 4.5,
    reviews: 690,
    saves: 5200,
    tags: ['Search', 'Citations'],
    models: ['Gemini'],
    icon: Search,
    gradient: 'from-lime-300 via-zap to-emerald-500',
    url: 'https://websearchai.streamlit.app/',
    thumbnail:
      'https://storage.googleapis.com/s4a-prod-share-preview/default/st_app_screenshot_image/afbcdf23-6162-4ae8-9056-48820f73395d/Home_Page.png',
    maker: 'Zapp Labs',
    verified: true,
    features: ['Inline citations', 'Follow-up questions', 'Source filters'],
  },
  {
    slug: 'intellisketch-ai',
    name: 'IntelliSketch AI',
    tagline: 'Draw an equation. Watch it solve itself.',
    description:
      'A smart canvas that understands what you sketch — maths, diagrams and flowcharts — and responds with solutions and explanations.',
    category: 'education',
    pricing: 'Free',
    priceLabel: 'Free',
    rating: 4.5,
    reviews: 978,
    saves: 7400,
    tags: ['Canvas', 'Math', 'Vision'],
    models: ['Gemini'],
    icon: PenTool,
    gradient: 'from-teal-300 via-aqua to-volt',
    url: 'https://intellisketch.vercel.app/',
    thumbnail:
      'https://opengraph.b-cdn.net/production/images/bfe7cda6-e841-44c6-8051-50ddc1337c22.png?token=TLmuYhH4eGMunQZnkRk-3cc1ix8qSsgwURDJjzgwtFA&height=513&width=1200&expires=33279220158',
    maker: 'Zapp Labs',
    verified: true,
    featured: true,
    trending: true,
    features: ['Handwriting recognition', 'Step-by-step solutions', 'Diagram parsing'],
  },
  {
    slug: 'chat2pdf',
    name: 'Chat2PDF',
    tagline: 'Talk to any PDF like it’s a colleague',
    description:
      'Upload contracts, papers or manuals and ask questions in plain language. Answers come with page references.',
    category: 'research',
    pricing: 'Free',
    priceLabel: 'Free',
    rating: 4.5,
    reviews: 1120,
    saves: 8000,
    tags: ['PDF', 'RAG', 'Docs'],
    models: ['Gemini'],
    icon: FileText,
    gradient: 'from-green-400 via-emerald-400 to-teal-500',
    url: 'https://chat2pdf-using-gemini.streamlit.app/',
    thumbnail:
      'https://storage.googleapis.com/s4a-prod-share-preview/default/st_app_screenshot_image/f3b3e2e9-49f2-40f8-b409-e77a4614e8d3/Home_Page.png',
    maker: 'Zapp Labs',
    verified: true,
    features: ['Page citations', 'Multi-file', 'Summaries'],
  },
  // ——— Marketplace mock listings ———
  mock('pixelforge', 'PixelForge', 'Studio-grade images from a single sentence', 'image', 'Freemium', 'From ₹499/mo', 4.8, 3410, Wand2, 'from-cyan-300 via-sky-400 to-blue-500', ['Flux', 'Stable Diffusion'], { featured: true, trending: true, isNew: true }),
  mock('voicecraft', 'VoiceCraft', 'Clone, dub and narrate in 30+ languages', 'audio', 'Freemium', 'From ₹799/mo', 4.7, 1890, Mic, 'from-zap via-emerald-400 to-aqua', ['GPT'], { trending: true }),
  mock('reelmint', 'ReelMint', 'Turn long videos into viral shorts', 'video', 'Paid', '₹1,299/mo', 4.6, 970, Film, 'from-aqua via-cyan-400 to-sky-500', ['Gemini'], { isNew: true }),
  mock('adpilot', 'AdPilot', 'Ad copy + creatives that test themselves', 'marketing', 'Paid', '₹2,499/mo', 4.4, 612, Megaphone, 'from-sky-400 via-volt to-blue-600', ['GPT', 'Claude']),
  mock('sheetsense', 'SheetSense', 'Ask your spreadsheet anything', 'data', 'Freemium', 'From ₹299/mo', 4.7, 1402, BarChart3, 'from-emerald-300 via-teal-400 to-aqua', ['Claude'], { featured: true }),
  mock('taskmate', 'TaskMate Agent', 'An autonomous agent for your busywork', 'agents', 'Freemium', 'From ₹999/mo', 4.5, 803, Bot, 'from-lime-300 via-zap to-emerald-500', ['Claude', 'GPT'], { isNew: true, trending: true }),
  mock('lingoloop', 'LingoLoop', 'Real-time translation for meetings & docs', 'productivity', 'Freemium', 'From ₹199/mo', 4.6, 1210, Languages, 'from-teal-300 via-aqua to-volt', ['Gemini']),
  mock('deckdash', 'DeckDash', 'Investor-ready slides from a prompt', 'design', 'Paid', '₹899/mo', 4.5, 540, Presentation, 'from-green-400 via-emerald-400 to-teal-500', ['GPT']),
  mock('tunesmith', 'TuneSmith', 'Royalty-free tracks in any mood', 'audio', 'Freemium', 'From ₹349/mo', 4.3, 470, Music, 'from-cyan-300 via-sky-400 to-blue-500', ['Llama'], { isNew: true }),
  mock('visionlens', 'VisionLens', 'Describe, tag and search any image library', 'image', 'Free', 'Free', 4.4, 380, ScanEye, 'from-zap via-emerald-400 to-aqua', ['Gemini']),
  mock('flowwright', 'FlowWright', 'Drag-and-drop AI automations', 'agents', 'Paid', '₹1,999/mo', 4.7, 920, Workflow, 'from-aqua via-cyan-400 to-sky-500', ['Claude', 'GPT', 'Gemini'], { featured: true }),
  mock('notenova', 'NoteNova', 'Meeting notes that write their own action items', 'productivity', 'Freemium', 'From ₹249/mo', 4.8, 2650, NotebookPen, 'from-sky-400 via-volt to-blue-600', ['Claude'], { trending: true }),
  mock('reviewbot', 'ReviewBot', 'A senior engineer on every pull request', 'coding', 'Freemium', 'From ₹599/mo', 4.6, 1130, Code2, 'from-emerald-300 via-teal-400 to-aqua', ['Claude', 'GPT'], { isNew: true }),
];

function mock(
  slug: string,
  name: string,
  tagline: string,
  category: string,
  pricing: Pricing,
  priceLabel: string,
  rating: number,
  reviews: number,
  icon: LucideIcon,
  gradient: string,
  models: string[],
  flags: Partial<Pick<Tool, 'featured' | 'isNew' | 'trending'>> = {},
): Tool {
  return {
    slug,
    name,
    tagline,
    description: `${tagline}. ${name} is built for teams and creators who want results without the learning curve — connect your workspace, pick a template and ship in minutes.`,
    category,
    pricing,
    priceLabel,
    rating,
    reviews,
    saves: Math.round(reviews * 6.3),
    tags: [category[0].toUpperCase() + category.slice(1), pricing],
    models,
    icon,
    gradient,
    url: '#',
    maker: name.split(' ')[0] + ' Inc.',
    verified: rating >= 4.6,
    features: ['Templates library', 'Team workspaces', 'API access', 'Usage analytics'],
    ...flags,
  };
}

export const toolBySlug = (slug: string) => tools.find((t) => t.slug === slug);
