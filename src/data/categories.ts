import {
  PenLine, Code2, ImageIcon, Clapperboard, AudioLines, Zap, Megaphone, FlaskConical,
  Bot, Database, Palette, GraduationCap, type LucideIcon,
} from 'lucide-react';

export type Category = {
  slug: string;
  name: string;
  icon: LucideIcon;
  count: number;
  blurb: string;
  tint: string; // tailwind text color
};

export const categories: Category[] = [
  { slug: 'writing', name: 'Writing', icon: PenLine, count: 412, blurb: 'Copy, blogs, emails & docs', tint: 'text-zap' },
  { slug: 'coding', name: 'Coding', icon: Code2, count: 356, blurb: 'Copilots, SQL, shell & review', tint: 'text-aqua' },
  { slug: 'image', name: 'Image', icon: ImageIcon, count: 298, blurb: 'Generate, edit & upscale', tint: 'text-volt' },
  { slug: 'video', name: 'Video', icon: Clapperboard, count: 141, blurb: 'Text-to-video & editing', tint: 'text-volt' },
  { slug: 'audio', name: 'Audio', icon: AudioLines, count: 118, blurb: 'Voice, music & transcription', tint: 'text-aqua' },
  { slug: 'productivity', name: 'Productivity', icon: Zap, count: 264, blurb: 'Notes, meetings & inbox', tint: 'text-zap' },
  { slug: 'marketing', name: 'Marketing', icon: Megaphone, count: 187, blurb: 'Ads, SEO & social', tint: 'text-volt' },
  { slug: 'research', name: 'Research', icon: FlaskConical, count: 132, blurb: 'Search, papers & PDFs', tint: 'text-volt' },
  { slug: 'agents', name: 'Agents', icon: Bot, count: 96, blurb: 'Autonomous workflows', tint: 'text-zap' },
  { slug: 'data', name: 'Data', icon: Database, count: 104, blurb: 'Analytics & spreadsheets', tint: 'text-aqua' },
  { slug: 'design', name: 'Design', icon: Palette, count: 89, blurb: 'UI, logos & brand kits', tint: 'text-volt' },
  { slug: 'education', name: 'Education', icon: GraduationCap, count: 76, blurb: 'Tutors & study tools', tint: 'text-volt' },
];

export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

export const models = ['GPT', 'Claude', 'Gemini', 'Llama', 'Mistral', 'Midjourney', 'Stable Diffusion', 'Flux'];
