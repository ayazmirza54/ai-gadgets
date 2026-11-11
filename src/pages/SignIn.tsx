import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, ArrowRight } from 'lucide-react';
import { ZapMark } from '../components/Logo';
import { tools } from '../data/tools';
import { ToolIcon } from '../components/ToolIcon';

export default function SignIn() {
  const [sent, setSent] = useState(false);
  return (
    <div className="container-z grid min-h-[80vh] items-center gap-12 py-16 lg:grid-cols-2">
      <div className="mx-auto w-full max-w-sm">
        <ZapMark className="h-12 w-12" />
        <h1 className="h-display mt-8 text-5xl">Welcome to Zapp</h1>
        <p className="mt-3 text-ink-400">Sign in or create an account — it’s the same button.</p>

        <div className="mt-10 space-y-3">
          <button className="btn-outline btn-lg w-full">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden><path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.8-5.4 3.8-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.3 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z"/></svg>
            Continue with Google
          </button>
          <button className="btn-outline btn-lg w-full"><Github className="h-4 w-4" /> Continue with GitHub</button>
        </div>

        <div className="my-6 flex items-center gap-3 text-xs text-ink-400"><span className="h-px flex-1 bg-ink-700" />or<span className="h-px flex-1 bg-ink-700" /></div>

        {sent ? (
          <p className="card flex items-center gap-3 p-4 text-sm"><Mail className="h-4 w-4 text-zap" /> Magic link sent. Check your inbox.</p>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-3">
            <input required type="email" placeholder="you@company.com" className="input py-3" />
            <button className="btn-zap btn-lg w-full">Email me a magic link <ArrowRight className="h-4 w-4" /></button>
          </form>
        )}
        <p className="mt-8 text-xs text-ink-400">By continuing you agree to our <Link to="/" className="underline">Terms</Link> and <Link to="/" className="underline">Privacy Policy</Link>.</p>
      </div>

      <div className="relative hidden h-[560px] overflow-hidden rounded-[32px] border border-ink-700 bg-ink-900 lg:block">
        <div className="bg-grid absolute inset-0" aria-hidden />
        <div aria-hidden className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zap/20 blur-[100px]" />
        <div className="absolute inset-0 grid grid-cols-4 place-items-center gap-6 p-12">
          {tools.slice(0, 16).map((t, i) => (
            <div key={t.slug} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <ToolIcon tool={t} size="lg" />
            </div>
          ))}
        </div>
        <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-ink-600 bg-ink-950/80 p-5 backdrop-blur">
          <p className="font-display text-lg font-semibold">“Zapp replaced my 40 AI bookmarks.”</p>
          <p className="mt-1 text-sm text-ink-400">— every early user, basically</p>
        </div>
      </div>
    </div>
  );
}
