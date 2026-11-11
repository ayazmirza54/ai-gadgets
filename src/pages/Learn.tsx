import { useState } from 'react';
import { ArrowUpRight, BookOpen, Lightbulb, Newspaper, GraduationCap } from 'lucide-react';
import { articles } from '../data/content';
import { PageHero } from '../components/Section';
import { cx } from '../lib/ui';

const filters = ['All', 'Deep dive', 'Build log', 'Guide', 'Agents'];

export default function Learn() {
  const [f, setF] = useState('All');
  const list = articles.filter((a) => f === 'All' || a.tag === f);
  const [lead, ...rest] = list;

  return (
    <>
      <PageHero eyebrow="Learn" title={<>Get <span className="text-zap">unreasonably good</span> at AI.</>} subtitle="Hands-on guides, build logs and deep dives from people shipping AI products every day.">
        <div className="mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { i: BookOpen, l: 'Guides' },
            { i: Lightbulb, l: 'Prompt craft' },
            { i: Newspaper, l: 'AI news' },
            { i: GraduationCap, l: 'Courses · soon' },
          ].map((c) => (
            <div key={c.l} className="card flex items-center gap-3 p-4 text-sm"><c.i className="h-4 w-4 text-zap" />{c.l}</div>
          ))}
        </div>
      </PageHero>

      <div className="container-z mt-10">
        <div className="scrollbar-none mb-8 flex gap-2 overflow-x-auto">
          {filters.map((x) => <button key={x} onClick={() => setF(x)} className={cx('chip shrink-0 px-4 py-1.5 text-sm', f === x && 'chip-active')}>{x}</button>)}
        </div>

        {lead && (
          <a href={lead.url} target="_blank" rel="noreferrer" className="card card-hover group grid overflow-hidden md:grid-cols-2">
            <div className="aspect-[16/10] overflow-hidden bg-ink-800 md:aspect-auto">
              <img src={lead.image} alt="" className="h-full w-full object-cover opacity-85 transition duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="eyebrow">{lead.tag} · {lead.date} · {lead.readTime}</p>
              <h2 className="h-display mt-4 text-3xl lg:text-4xl">{lead.title}</h2>
              <p className="mt-4 text-ink-300">{lead.excerpt}</p>
              <span className="mt-8 inline-flex items-center gap-1 text-sm text-zap">Read article <ArrowUpRight className="h-4 w-4" /></span>
            </div>
          </a>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <a key={a.id} href={a.url} target="_blank" rel="noreferrer" className="card card-hover group flex flex-col overflow-hidden">
              <div className="aspect-[16/9] overflow-hidden bg-ink-800">
                <img src={a.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="eyebrow">{a.tag} · {a.readTime}</p>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight">{a.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-ink-400">{a.excerpt}</p>
                <p className="mt-auto pt-5 text-xs text-ink-400">{a.date}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
