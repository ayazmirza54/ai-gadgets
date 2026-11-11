export type Prompt = {
  id: string;
  title: string;
  description: string;
  category: string;
  model: string;
  author: { name: string; handle: string; hue: string };
  likes: number;
  uses: number;
  price: number; // 0 = free (INR)
  tags: string[];
  body: string;
  output?: string;
  isNew?: boolean;
  staffPick?: boolean;
};

const a = (name: string, handle: string, hue: string) => ({ name, handle, hue });

export const prompts: Prompt[] = [
  {
    id: 'cold-email-that-converts',
    title: 'Cold email that actually gets replies',
    description: 'A 4-line cold email framework tuned for B2B founders. Personalised opener, crisp value, soft CTA.',
    category: 'marketing',
    model: 'Claude',
    author: a('Riya Kapoor', 'riya', 'bg-zap'),
    likes: 4210,
    uses: 28400,
    price: 0,
    tags: ['Sales', 'Email', 'B2B'],
    staffPick: true,
    body: `You are a top 1% B2B copywriter.

Write a cold email to {{prospect_name}}, {{prospect_role}} at {{company}}.

Context about them: {{personalisation_hook}}
What we sell: {{product_one_liner}}

Rules:
- Max 4 sentences. No fluff, no "I hope this finds you well".
- Line 1: a specific observation about them.
- Line 2: the problem it implies.
- Line 3: one proof point with a number.
- Line 4: a low-friction question as CTA.
Return 3 variants with different angles.`,
    output: `Hi Ananya — saw Zeta just opened a Bengaluru office (congrats).\nScaling support across two time zones usually means slower first responses.\nWe helped Kite cut theirs from 4h to 22m in six weeks.\nWorth a 10-min look next Tuesday?`,
  },
  {
    id: 'senior-code-reviewer',
    title: 'Senior code reviewer',
    description: 'Get a brutally honest, prioritised review of any diff — bugs first, nits last.',
    category: 'coding',
    model: 'Claude',
    author: a('Dev Malhotra', 'devm', 'bg-aqua'),
    likes: 3880,
    uses: 19100,
    price: 0,
    tags: ['Code review', 'Engineering'],
    staffPick: true,
    body: `Act as a staff engineer reviewing a pull request in {{language}}.

<diff>
{{paste_diff_here}}
</diff>

Review in this order and label each finding:
1. 🔴 Bugs & correctness
2. 🟠 Security & data handling
3. 🟡 Performance
4. 🔵 Readability & naming
For every finding: quote the line, explain the risk in one sentence, and propose the fixed code.
Skip praise. If nothing is wrong in a section, write "None".`,
  },
  {
    id: 'cinematic-portrait',
    title: 'Cinematic portrait — golden hour',
    description: 'Moody 85mm portraits with film grain and soft rim light. Works great for avatars & posters.',
    category: 'image',
    model: 'Midjourney',
    author: a('Kabir Sen', 'kabirshoots', 'bg-ember'),
    likes: 6120,
    uses: 41200,
    price: 149,
    tags: ['Portrait', 'Photography', 'Cinematic'],
    isNew: true,
    body: `cinematic portrait of {{subject}}, golden hour backlight, soft rim light on hair, 85mm f/1.4, shallow depth of field, Kodak Portra 400 film grain, warm amber and teal palette, {{location}} in background bokeh, editorial, ultra detailed skin texture --ar 4:5 --style raw --v 6`,
  },
  {
    id: 'youtube-script-hook',
    title: 'YouTube script with a 5-second hook',
    description: 'Retention-first script structure used by 1M+ sub creators. Hook, loop, payoff.',
    category: 'video',
    model: 'GPT',
    author: a('Sana Iqbal', 'sanacreates', 'bg-volt'),
    likes: 2950,
    uses: 15800,
    price: 0,
    tags: ['YouTube', 'Script', 'Creator'],
    body: `Write a {{length}}-minute YouTube script about "{{topic}}" for {{audience}}.

Structure:
- HOOK (0–5s): a bold claim or visual pattern-interrupt.
- STAKES (5–30s): why the viewer should care right now.
- 3 BEATS: each ends with an open loop that's closed later.
- PAYOFF: deliver on the hook.
- CTA: one, natural, tied to the payoff.
Add [B-ROLL] suggestions in brackets and keep sentences under 15 words.`,
  },
  {
    id: 'sql-from-english',
    title: 'Schema-aware SQL generator',
    description: 'Paste your schema once, ask questions forever. Returns query + plain-English explanation.',
    category: 'data',
    model: 'Gemini',
    author: a('Arjun Rao', 'arjunsql', 'bg-aqua'),
    likes: 1870,
    uses: 12600,
    price: 0,
    tags: ['SQL', 'Analytics'],
    body: `You are an expert {{dialect}} analyst.
Schema:
{{schema}}

Question: {{question}}

Return:
1. The SQL query (use CTEs, no SELECT *)
2. A 2-line explanation
3. One index that would make it faster`,
  },
  {
    id: 'landing-page-copy',
    title: 'Landing page copy in 60 seconds',
    description: 'Hero, subhead, 3 benefits, social proof and FAQ — written in your brand voice.',
    category: 'writing',
    model: 'Claude',
    author: a('Meera Nair', 'meerawrites', 'bg-zap'),
    likes: 3320,
    uses: 22100,
    price: 99,
    tags: ['Copywriting', 'SaaS', 'Web'],
    staffPick: true,
    body: `Product: {{product}}
Audience: {{audience}}
Brand voice: {{voice_adjectives}}

Write landing page copy with:
- H1 (max 8 words) + 3 alternates
- Subhead (max 20 words)
- 3 benefit blocks (title + 1 sentence)
- 3 FAQ with objections handled
Avoid: "revolutionise", "unlock", "seamless", "leverage".`,
  },
  {
    id: 'study-buddy-feynman',
    title: 'Feynman study buddy',
    description: 'Learn anything by teaching it back. The AI quizzes you and patches the gaps.',
    category: 'education',
    model: 'GPT',
    author: a('Ishaan Verma', 'ishaan', 'bg-ember'),
    likes: 2410,
    uses: 9800,
    price: 0,
    tags: ['Learning', 'Students'],
    isNew: true,
    body: `I want to learn {{topic}}. My current level: {{level}}.
Use the Feynman technique:
1. Explain it to me like I'm 12 in under 120 words.
2. Ask me to explain it back.
3. Find the gaps in my explanation and re-teach only those.
4. Quiz me with 3 questions of increasing difficulty.
Wait for my reply after each step.`,
  },
  {
    id: 'brand-logo-minimal',
    title: 'Minimal geometric logo mark',
    description: 'Clean vector-style logo marks that actually look designed. Swap brand + motif.',
    category: 'design',
    model: 'Flux',
    author: a('Tara Bose', 'tarab', 'bg-volt'),
    likes: 1990,
    uses: 14300,
    price: 199,
    tags: ['Logo', 'Branding'],
    body: `minimal geometric logo mark for "{{brand}}", {{motif}} motif, single continuous line, flat vector, bold negative space, {{primary_color}} on off-white, centered, no text, dribbble style, svg-ready`,
  },
  {
    id: 'agent-research-analyst',
    title: 'Autonomous research analyst (agent)',
    description: 'A multi-step agent prompt that plans, searches, verifies and writes a cited brief.',
    category: 'agents',
    model: 'Claude',
    author: a('Nikhil Joshi', 'nikhilbuilds', 'bg-zap'),
    likes: 2780,
    uses: 8700,
    price: 299,
    tags: ['Agent', 'Research', 'Tools'],
    staffPick: true,
    body: `You are a research analyst agent with tools: web_search, read_url, write_file.
Goal: produce a decision brief on "{{question}}".

Loop:
PLAN → list 5 sub-questions.
SEARCH → 2 queries per sub-question; prefer primary sources.
VERIFY → discard claims with < 2 independent sources.
WRITE → 1-page brief: TL;DR, findings with [n] citations, risks, recommendation.
Stop when all sub-questions are answered or after 20 tool calls.`,
  },
  {
    id: 'meeting-to-actions',
    title: 'Meeting transcript → action items',
    description: 'Owners, deadlines and decisions pulled out of messy transcripts. Slack-ready.',
    category: 'productivity',
    model: 'Gemini',
    author: a('Priya Menon', 'priyaops', 'bg-aqua'),
    likes: 1640,
    uses: 11200,
    price: 0,
    tags: ['Meetings', 'Ops'],
    body: `From this transcript, extract:
- Decisions made (bullet, past tense)
- Action items as: [Owner] — task — due {{default_due}} unless stated
- Open questions
Format for Slack with emoji headers. Transcript:
{{transcript}}`,
  },
  {
    id: 'podcast-voice-intro',
    title: 'Podcast intro voice direction',
    description: 'Direct AI voices like a pro — pacing, emphasis and breath marks included.',
    category: 'audio',
    model: 'GPT',
    author: a('Aditya Kulkarni', 'adityak', 'bg-ember'),
    likes: 870,
    uses: 4100,
    price: 0,
    tags: ['Voice', 'Podcast'],
    isNew: true,
    body: `Rewrite this podcast intro as a voice-direction script for {{voice_style}}:
"{{intro_text}}"
Add: [pause 0.4s], *emphasis*, (breath), and pace notes per line. Keep it under 25 seconds when read.`,
  },
  {
    id: 'research-paper-explainer',
    title: 'Research paper → 5-minute explainer',
    description: 'Digest any paper: the claim, the method, the catch, and why it matters.',
    category: 'research',
    model: 'Claude',
    author: a('Dr. Fatima Shaikh', 'fatimaphd', 'bg-volt'),
    likes: 2230,
    uses: 10500,
    price: 0,
    tags: ['Papers', 'Science'],
    body: `Explain the attached paper to a smart non-expert.
Sections: The claim (1 line) · How they tested it · Key result with numbers · The catch / limitations · Why it matters · 3 follow-up papers to read.
Paper: {{paper_text_or_link}}`,
  },
];

export const promptById = (id: string) => prompts.find((p) => p.id === id);
