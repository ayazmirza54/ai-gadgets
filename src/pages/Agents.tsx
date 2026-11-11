import { Link } from 'react-router-dom';
import { Inbox, LineChart, Newspaper, Headphones, Users, FileSearch, ArrowRight, Play, Plug, CheckCircle2, Bot } from 'lucide-react';
import { PageHero } from '../components/Section';
import { cx } from '../lib/ui';

const agents = [
  { icon: Inbox, name: 'Inbox Zero', by: 'Zapp Labs', desc: 'Triages email, drafts replies and flags what needs you.', runs: '41k', tint: 'text-zap bg-zap/10', integrations: ['Gmail', 'Slack'] },
  { icon: LineChart, name: 'Market Watcher', by: 'quantmind', desc: 'Monitors competitors and sends a Monday-morning brief.', runs: '12k', tint: 'text-aqua bg-aqua/10', integrations: ['Web', 'Notion'] },
  { icon: Newspaper, name: 'Content Engine', by: 'meerawrites', desc: 'Researches, drafts and schedules a week of posts.', runs: '28k', tint: 'text-volt bg-volt/10', integrations: ['LinkedIn', 'X'] },
  { icon: Headphones, name: 'Support Copilot', by: 'helpdeskhq', desc: 'Answers tickets from your docs with human hand-off.', runs: '19k', tint: 'text-volt bg-volt/10', integrations: ['Zendesk', 'Intercom'] },
  { icon: Users, name: 'Recruiter Scout', by: 'hireloop', desc: 'Sources candidates and writes personalised outreach.', runs: '7.4k', tint: 'text-zap bg-zap/10', integrations: ['LinkedIn', 'Sheets'] },
  { icon: FileSearch, name: 'Contract Reviewer', by: 'legalease', desc: 'Flags risky clauses and suggests redlines in minutes.', runs: '5.1k', tint: 'text-aqua bg-aqua/10', integrations: ['Drive', 'DocuSign'] },
];

export default function Agents() {
  return (
    <>
      <PageHero
        eyebrow="Agents · Early access"
        title={<>AI that does the work, <span className="text-ink-400">not just the chat.</span></>}
        subtitle="Pick a ready-made agent, connect your apps, and let it run. No code, no prompt engineering, no babysitting."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <button className="btn-zap btn-lg">Join the waitlist <ArrowRight className="h-4 w-4" /></button>
          <Link to="/submit?type=agent" className="btn-outline btn-lg">Publish an agent</Link>
        </div>
      </PageHero>

      <section className="container-z mt-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { i: Bot, t: 'Pick an agent', d: 'Browse agents built by the community and verified by us.' },
            { i: Plug, t: 'Connect your apps', d: 'One-click connections to Gmail, Slack, Notion, Sheets and 200+ more.' },
            { i: Play, t: 'Let it run', d: 'Schedule it, trigger it, or chat with it. Review every action it takes.' },
          ].map((s, n) => (
            <div key={s.t} className="card p-6">
              <div className="flex items-center justify-between">
                <s.i className="h-6 w-6 text-zap" />
                <span className="font-mono text-xs text-ink-400">0{n + 1}</span>
              </div>
              <p className="mt-6 font-display text-xl font-semibold">{s.t}</p>
              <p className="mt-1 text-sm text-ink-400">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-z mt-20">
        <h2 className="h-display mb-8 text-3xl">Popular agents</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a) => (
            <div key={a.name} className="card card-hover group flex flex-col p-6">
              <span className={cx('grid h-12 w-12 place-items-center rounded-xl', a.tint)}><a.icon className="h-6 w-6" /></span>
              <p className="mt-5 font-display text-xl font-semibold">{a.name}</p>
              <p className="text-xs text-ink-400">by @{a.by}</p>
              <p className="mt-3 text-sm text-ink-300">{a.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {a.integrations.map((i) => <span key={i} className="chip">{i}</span>)}
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-ink-700/70 pt-4 [&]:mt-6">
                <span className="inline-flex items-center gap-1.5 text-xs text-ink-400"><CheckCircle2 className="h-3.5 w-3.5 text-aqua" /> {a.runs} runs</span>
                <button className="btn-outline px-3 py-1.5 text-xs group-hover:border-zap/50 group-hover:text-zap">Deploy</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
