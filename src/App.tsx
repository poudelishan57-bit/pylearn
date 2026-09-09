import { useEffect, useMemo, useRef, useState } from "react";
import { levelColors, levelLabels, levelTopicCatalog, pythonNotes, roadmap } from "./data/notes";
import { levelQuizzes } from "./data/levelQuizzes";
import { projectIdeas } from "./data/projects";
import type { Level, ProjectIdea, QuizQuestion } from "./types";
import { storage } from "./utils/storage";

type Page = "home" | "roadmap" | "notes" | "projects" | "quizzes";

type Route = {
  page: Page;
  level?: Level;
  slug?: string;
};

const navItems: { label: string; path: string; page: Page }[] = [
  { label: "Home", path: "#/", page: "home" },
  { label: "Roadmap", path: "#/roadmap", page: "roadmap" },
  { label: "Notes", path: "#/notes", page: "notes" },
  { label: "Projects", path: "#/projects", page: "projects" },
  { label: "Quizzes", path: "#/quizzes", page: "quizzes" },
];

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");

const highlightPython = (code: string) => {
  const keywords = /\b(def|class|if|elif|else|for|while|return|in|import|from|as|try|except|with|async|await|True|False|None|and|or|not|continue|break|pass|yield)\b/g;
  const numbers = /\b(\d+(?:\.\d+)?)\b/g;
  return escapeHtml(code)
    .replace(/(".*?"|'.*?')/g, '<span class="token-string">$1</span>')
    .replace(/(#.*)/g, '<span class="token-comment">$1</span>')
    .replace(keywords, '<span class="token-keyword">$1</span>')
    .replace(numbers, '<span class="token-number">$1</span>');
};

function parseRoute(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const segments = raw.split("/").filter(Boolean);
  if (segments.length === 0) return { page: "home" };
  const page = segments[0] as Page;
  if (page === "notes") {
    return {
      page,
      level: segments[1] as Level | undefined,
      slug: segments[2],
    };
  }
  if (["home", "roadmap", "projects", "quizzes"].includes(page)) return { page };
  return { page: "home" };
}

function moveTo(path: string) {
  window.location.hash = path;
}

function levelDot(level: Level) {
  if (level === "beginner") return "bg-emerald-400";
  if (level === "intermediate") return "bg-amber-400";
  return "bg-rose-400";
}

function CodeBlock({ code, language = "Python", tryItUrl }: { code: string; language?: string; tryItUrl?: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-slate-300">
        <span>{language}</span>
        <div className="flex items-center gap-2">
          {tryItUrl && (
            <a
              href={tryItUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/20 px-2 py-1 text-[11px] hover:bg-white/10"
            >
              Try it
            </a>
          )}
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1200);
            }}
            className="rounded-lg border border-white/20 px-2 py-1 text-[11px] hover:bg-white/10"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[auto_1fr] text-sm">
        {lines.length > 4 && (
          <div className="select-none border-r border-white/10 bg-slate-900 px-3 py-3 text-right text-slate-500">
            {lines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
        )}
        <pre className="overflow-x-auto p-3 text-slate-100">
          <code dangerouslySetInnerHTML={{ __html: highlightPython(code) }} />
        </pre>
      </div>
    </div>
  );
}

function QuizBlock({
  quizKey,
  questions,
  scoreMap,
  onSaveScore,
}: {
  quizKey: string;
  questions: QuizQuestion[];
  scoreMap: Record<string, number>;
  onSaveScore: (key: string, score: number) => void;
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = questions.reduce((acc, q) => acc + (answers[q.id] === q.correctIndex ? 1 : 0), 0);
  return (
    <section className="space-y-5 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Quick Quiz</h3>
        {scoreMap[quizKey] !== undefined && (
          <span className="text-sm text-slate-300">Best score: {scoreMap[quizKey]}/{questions.length}</span>
        )}
      </div>
      {questions.map((q, idx) => (
        <div key={q.id} className="space-y-2">
          <p className="font-medium text-slate-100">{idx + 1}. {q.question}</p>
          <div className="grid gap-2">
            {q.options.map((opt, optionIndex) => (
              <button
                key={opt}
                type="button"
                onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: optionIndex }))}
                className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                  answers[q.id] === optionIndex
                    ? "border-indigo-400 bg-indigo-500/20 text-white"
                    : "border-white/10 bg-slate-950/60 text-slate-300 hover:border-white/30"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {submitted && (
            <p className={`text-sm ${answers[q.id] === q.correctIndex ? "text-emerald-300" : "text-amber-300"}`}>
              {answers[q.id] === q.correctIndex ? "Correct." : "Review:"} {q.explanation}
            </p>
          )}
        </div>
      ))}
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => {
            setSubmitted(true);
            onSaveScore(quizKey, score);
          }}
          className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
        >
          Submit Quiz
        </button>
        <button
          type="button"
          onClick={() => {
            setAnswers({});
            setSubmitted(false);
          }}
          className="rounded-xl border border-white/15 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
        >
          Retry
        </button>
        {submitted && <span className="text-sm text-slate-200">Score: {score}/{questions.length}</span>}
      </div>
    </section>
  );
}

function ProjectBlock({ project }: { project: ProjectIdea }) {
  return (
    <article className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
      <h4 className="text-lg font-semibold text-white">{project.title}</h4>
      <p className="text-sm text-slate-300">{project.whatYouBuild}</p>
      <p className="text-sm text-slate-300"><span className="font-semibold text-slate-100">Concepts:</span> {project.conceptsRequired.join(", ")}</p>
      <p className="text-sm text-slate-300"><span className="font-semibold text-slate-100">Features:</span> {project.features.join(", ")}</p>
      <p className="text-sm text-slate-300"><span className="font-semibold text-slate-100">Plan:</span> {project.steps.join(" -> ")}</p>
      <CodeBlock code={project.starterCode} />
      <p className="text-sm text-slate-300"><span className="font-semibold text-slate-100">Challenges:</span> {project.challenges.join(", ")}</p>
      <p className="text-sm text-slate-300"><span className="font-semibold text-slate-100">Improvements:</span> {project.improvements.join(", ")}</p>
    </article>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => parseRoute());
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [levelFilter, setLevelFilter] = useState<"all" | Level>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [readingProgress, setReadingProgress] = useState(0);
  const noteArticleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) moveTo("#/");
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    setTheme(storage.readTheme() === "light" ? "light" : "dark");
    setCompleted(storage.readCompleted());
    setBookmarks(storage.readBookmarks());
    setRecent(storage.readRecent());
    setQuizScores(storage.readQuizScores());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    storage.writeTheme(theme);
  }, [theme]);

  const selectedNote = useMemo(() => {
    if (route.page !== "notes") return null;
    if (!route.slug) return null;
    return pythonNotes.find((note) => note.slug === route.slug) ?? null;
  }, [route.page, route.slug]);

  useEffect(() => {
    if (!selectedNote) return;
    setRecent((prev) => {
      const next = [selectedNote.slug, ...prev.filter((slug) => slug !== selectedNote.slug)].slice(0, 6);
      storage.writeRecent(next);
      return next;
    });
  }, [selectedNote]);

  useEffect(() => {
    const titleMap: Record<Page, string> = {
      home: "PyLearn | Learn Python from Zero to Pro",
      roadmap: "Python Roadmap | PyLearn",
      notes: selectedNote ? `${selectedNote.title} | PyLearn` : "Python Notes | PyLearn",
      projects: "Python Projects by Difficulty | PyLearn",
      quizzes: "Python Quizzes | PyLearn",
    };
    const descriptionMap: Record<Page, string> = {
      home: "Clear, practical, AI-crafted Python notes from beginner to advanced.",
      roadmap: "Follow a structured Python roadmap from basics to real-world projects.",
      notes: "Learn Python topics with simple explanations, code examples, mistakes, and practice.",
      projects: "Hands-on Python projects for beginner, intermediate, and advanced learners.",
      quizzes: "Practice Python with client-side quizzes and instant explanations.",
    };
    document.title = titleMap[route.page];
    const meta = document.querySelector("meta[name='description']");
    if (meta) meta.setAttribute("content", descriptionMap[route.page]);
  }, [route.page, selectedNote]);

  useEffect(() => {
    const onScroll = () => {
      const article = noteArticleRef.current;
      if (!article || route.page !== "notes" || !selectedNote) {
        setReadingProgress(0);
        return;
      }
      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = article.offsetHeight;
      const viewportProgress = ((window.scrollY - articleTop + 140) / articleHeight) * 100;
      setReadingProgress(Math.max(0, Math.min(100, viewportProgress)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [route.page, selectedNote]);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(".reveal"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.12 }
    );
    nodes.forEach((node) => obs.observe(node));
    return () => obs.disconnect();
  }, [route]);

  const allNotesByLevel = useMemo(
    () => ({
      beginner: pythonNotes.filter((n) => n.level === "beginner"),
      intermediate: pythonNotes.filter((n) => n.level === "intermediate"),
      pro: pythonNotes.filter((n) => n.level === "pro"),
    }),
    []
  );

  const filteredNotes = useMemo(() => {
    const lower = searchTerm.toLowerCase().trim();
    return pythonNotes.filter((note) => {
      if (levelFilter !== "all" && note.level !== levelFilter) return false;
      if (!lower) return true;
      const searchable = `${note.title} ${note.description} ${note.tags.join(" ")}`.toLowerCase();
      return searchable.includes(lower);
    });
  }, [levelFilter, searchTerm]);

  const nextPrev = useMemo(() => {
    if (!selectedNote) return { prev: null, next: null };
    const i = pythonNotes.findIndex((n) => n.slug === selectedNote.slug);
    return {
      prev: i > 0 ? pythonNotes[i - 1] : null,
      next: i < pythonNotes.length - 1 ? pythonNotes[i + 1] : null,
    };
  }, [selectedNote]);

  const saveScore = (key: string, score: number) => {
    setQuizScores((prev) => {
      const best = Math.max(prev[key] ?? 0, score);
      const next = { ...prev, [key]: best };
      storage.writeQuizScores(next);
      return next;
    });
  };

  const toggleCompleted = (slug: string) => {
    setCompleted((prev) => {
      const next = prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug];
      storage.writeCompleted(next);
      return next;
    });
  };

  const toggleBookmark = (slug: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(slug) ? prev.filter((x) => x !== slug) : [...prev, slug];
      storage.writeBookmarks(next);
      return next;
    });
  };

  const rootBg = theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900";
  const topPanel = theme === "dark" ? "border-white/10 bg-slate-950/85" : "border-slate-200 bg-white/85";
  const panel = theme === "dark" ? "border-white/10 bg-slate-900/60" : "border-slate-200 bg-white/90";
  const mutetext = theme === "dark" ? "text-slate-300" : "text-slate-600";

  return (
    <div className={`${rootBg} min-h-screen`}>
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-white/10">
        <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${readingProgress}%` }} />
      </div>

      <header className={`sticky top-1 z-40 border-b backdrop-blur ${topPanel}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <button type="button" onClick={() => moveTo("#/")} className="text-left">
            <p className="text-xl font-black tracking-tight">PyLearn</p>
            <p className={`text-xs ${mutetext}`}>Learn Python through clear AI-generated notes</p>
          </button>
          <nav className="hidden items-center gap-4 md:flex">
            {navItems.map((item) => (
              <button
                key={item.page}
                type="button"
                onClick={() => moveTo(item.path)}
                className={`text-sm transition ${
                  route.page === item.page ? "text-indigo-400" : `${mutetext} hover:text-indigo-300`
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              className="rounded-xl border border-white/15 px-3 py-2 text-xs hover:bg-white/10"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              className="rounded-xl border border-white/15 px-3 py-2 text-xs md:hidden"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setDrawerOpen(false)}>
          <aside
            className={`absolute right-0 top-0 h-full w-72 border-l p-4 ${panel}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => {
                    moveTo(item.path);
                    setDrawerOpen(false);
                  }}
                  className="block w-full rounded-xl border border-white/10 px-3 py-2 text-left text-sm"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
        <div key={`${route.page}-${route.slug ?? ""}`} className="animate-page-in">
          {route.page === "home" && (
            <div className="space-y-14">
              <section className="reveal relative overflow-hidden rounded-3xl border border-white/10 px-6 py-16 md:px-10">
                <div className="absolute inset-0 hero-grid opacity-45" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-700/30 via-slate-900/80 to-violet-700/20" />
                <div className="relative max-w-3xl space-y-6">
                  <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">PyLearn</p>
                  <h1 className="text-4xl font-black leading-tight md:text-6xl">Learn Python. Understand Everything. Build Anything.</h1>
                  <p className="max-w-2xl text-lg text-slate-200">
                    Clear, practical, AI-crafted Python notes from your first print() to advanced programming concepts.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => moveTo("#/notes")}
                      className="rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-400"
                    >
                      Start Learning
                    </button>
                    <button
                      type="button"
                      onClick={() => moveTo("#/roadmap")}
                      className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                    >
                      Explore Python Roadmap
                    </button>
                  </div>
                </div>
              </section>

              <section className="reveal space-y-5">
                <h2 className="text-2xl font-bold">Three Progressive Levels</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {(["beginner", "intermediate", "pro"] as Level[]).map((level) => (
                    <button
                      type="button"
                      key={level}
                      onClick={() => {
                        setLevelFilter(level);
                        moveTo("#/notes");
                      }}
                      className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-left transition hover:-translate-y-0.5 hover:border-indigo-300/40"
                    >
                      <p className={`text-sm font-semibold ${levelColors[level]}`}>{levelLabels[level]}</p>
                      <p className="mt-2 text-sm text-slate-200">
                        {level === "beginner" && "Learn Python from absolute zero."}
                        {level === "intermediate" && "Move beyond basics and build real programs."}
                        {level === "pro" && "Master advanced concepts used in professional development."}
                      </p>
                      <p className="mt-3 text-xs text-slate-400">Includes: {levelTopicCatalog[level].slice(0, 4).join(", ")}...</p>
                    </button>
                  ))}
                </div>
              </section>

              <section className="reveal space-y-4">
                <h2 className="text-2xl font-bold">How Every Topic Is Taught</h2>
                <p className={mutetext}>
                  Every note follows one consistent teaching flow: What it is, Why it matters, Syntax, Simple and real examples,
                  Output, Code explanation, Common mistakes, Important points, Practice, Challenge, and Quick revision.
                </p>
              </section>
            </div>
          )}

          {route.page === "roadmap" && (
            <section className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-black">Python Roadmap</h2>
                <p className={mutetext}>Follow this path and mark topics completed as you learn.</p>
              </div>
              <div className="space-y-4">
                {roadmap.map((step, index) => {
                  const matchingNote = pythonNotes[index] ?? null;
                  const status = matchingNote
                    ? completed.includes(matchingNote.slug)
                      ? "Completed"
                      : index === 0 || completed.includes(pythonNotes[index - 1]?.slug ?? "")
                        ? "In Progress"
                        : "Not Started"
                    : "Not Started";
                  return (
                    <div key={step} className={`reveal flex items-center justify-between rounded-2xl border p-4 ${panel}`}>
                      <div>
                        <p className="font-semibold">{step}</p>
                        {matchingNote && (
                          <button
                            type="button"
                            onClick={() => moveTo(`#/notes/${matchingNote.level}/${matchingNote.slug}`)}
                            className="text-sm text-indigo-300 hover:text-indigo-200"
                          >
                            Open note: {matchingNote.title}
                          </button>
                        )}
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          status === "Completed"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : status === "In Progress"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-slate-700/50 text-slate-300"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {route.page === "notes" && (
            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
              <aside className={`h-fit rounded-2xl border p-4 ${panel}`}>
                <h3 className="text-sm font-semibold uppercase tracking-wide">Python Notes</h3>
                <div className="mt-4 space-y-3">
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search: loops, classes, asyncio"
                    className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-indigo-400"
                  />
                  <select
                    value={levelFilter}
                    onChange={(event) => setLevelFilter(event.target.value as "all" | Level)}
                    className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm outline-none"
                  >
                    <option value="all">All levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="pro">Pro / Advanced</option>
                  </select>
                </div>
                <div className="mt-5 space-y-4">
                  {(["beginner", "intermediate", "pro"] as Level[]).map((level) => (
                    <div key={level}>
                      <p className={`mb-2 text-xs font-semibold uppercase ${levelColors[level]}`}>{levelLabels[level]}</p>
                      <div className="space-y-1">
                        {allNotesByLevel[level].map((note) => {
                          const hidden = !filteredNotes.some((n) => n.slug === note.slug);
                          if (hidden) return null;
                          return (
                            <button
                              key={note.slug}
                              type="button"
                              onClick={() => moveTo(`#/notes/${note.level}/${note.slug}`)}
                              className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm ${
                                selectedNote?.slug === note.slug
                                  ? "bg-indigo-500/20 text-indigo-200"
                                  : `${mutetext} hover:bg-white/10`
                              }`}
                            >
                              <span className={`h-2 w-2 rounded-full ${levelDot(note.level)}`} />
                              <span>{note.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                {recent.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Recently viewed</p>
                    <div className="space-y-1">
                      {recent.map((slug) => {
                        const note = pythonNotes.find((n) => n.slug === slug);
                        if (!note) return null;
                        return (
                          <button
                            key={slug}
                            type="button"
                            onClick={() => moveTo(`#/notes/${note.level}/${note.slug}`)}
                            className="block w-full rounded-lg px-2 py-1 text-left text-xs text-slate-300 hover:bg-white/10"
                          >
                            {note.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {bookmarks.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Bookmarks</p>
                    <div className="space-y-1">
                      {bookmarks.map((slug) => {
                        const note = pythonNotes.find((n) => n.slug === slug);
                        if (!note) return null;
                        return (
                          <button
                            key={slug}
                            type="button"
                            onClick={() => moveTo(`#/notes/${note.level}/${note.slug}`)}
                            className="block w-full rounded-lg px-2 py-1 text-left text-xs text-slate-300 hover:bg-white/10"
                          >
                            {note.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </aside>

              <div className="space-y-6">
                {!selectedNote && (
                  <section className={`rounded-2xl border p-6 ${panel}`}>
                    <h2 className="text-2xl font-bold">Start with a topic from the sidebar</h2>
                    <p className={`mt-2 ${mutetext}`}>Use search and level filters to quickly find the exact concept you need.</p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {filteredNotes.slice(0, 6).map((note) => (
                        <button
                          key={note.slug}
                          type="button"
                          onClick={() => moveTo(`#/notes/${note.level}/${note.slug}`)}
                          className="rounded-xl border border-white/10 bg-slate-900/60 p-3 text-left hover:border-indigo-300/40"
                        >
                          <p className="text-sm font-semibold text-white">{note.title}</p>
                          <p className="text-xs text-slate-300">{levelLabels[note.level]} - {note.description}</p>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {selectedNote && (
                  <article ref={noteArticleRef} className={`space-y-6 rounded-2xl border p-6 ${panel}`}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className={`text-xs font-semibold uppercase ${levelColors[selectedNote.level]}`}>{levelLabels[selectedNote.level]}</p>
                        <h2 className="text-3xl font-black">{selectedNote.title}</h2>
                        <p className={`mt-2 ${mutetext}`}>{selectedNote.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => toggleCompleted(selectedNote.slug)}
                          className="rounded-xl border border-white/15 px-3 py-2 text-xs hover:bg-white/10"
                        >
                          {completed.includes(selectedNote.slug) ? "Mark Incomplete" : "Mark Completed"}
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleBookmark(selectedNote.slug)}
                          className="rounded-xl border border-white/15 px-3 py-2 text-xs hover:bg-white/10"
                        >
                          {bookmarks.includes(selectedNote.slug) ? "Bookmarked" : "Bookmark"}
                        </button>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
                      <p className="mb-2 text-xs uppercase text-slate-400">Table of Contents</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedNote.sections.map((sec) => (
                          <a key={sec.title} href={`#${selectedNote.slug}-${sec.title.replace(/\s+/g, "-")}`} className="text-sm text-indigo-300 hover:text-indigo-200">
                            {sec.title}
                          </a>
                        ))}
                        <a href={`#${selectedNote.slug}-common-mistakes`} className="text-sm text-indigo-300 hover:text-indigo-200">Common Mistakes</a>
                        <a href={`#${selectedNote.slug}-practice`} className="text-sm text-indigo-300 hover:text-indigo-200">Practice</a>
                      </div>
                    </div>

                    {selectedNote.sections.map((sec) => (
                      <section key={sec.title} id={`${selectedNote.slug}-${sec.title.replace(/\s+/g, "-")}`} className="reveal space-y-2">
                        <h3 className="text-xl font-semibold">{sec.title}</h3>
                        <p className={mutetext}>{sec.content}</p>
                      </section>
                    ))}

                    <section className="reveal space-y-3">
                      <h3 className="text-xl font-semibold">Simple Syntax</h3>
                      <CodeBlock code={selectedNote.syntax} />
                    </section>

                    <section className="reveal space-y-3">
                      <h3 className="text-xl font-semibold">Simple Example</h3>
                      <CodeBlock code={selectedNote.simpleExample.code} tryItUrl={selectedNote.simpleExample.tryItUrl} />
                      <p className="text-sm font-semibold text-slate-200">Output</p>
                      <CodeBlock code={selectedNote.simpleExample.output} language="Output" />
                      <div className="space-y-1">
                        {selectedNote.simpleExample.explanation.map((line) => (
                          <p key={line} className={`text-sm ${mutetext}`}>- {line}</p>
                        ))}
                      </div>
                    </section>

                    <section className="reveal space-y-3">
                      <h3 className="text-xl font-semibold">Real-World Example</h3>
                      <CodeBlock code={selectedNote.realWorldExample.code} tryItUrl={selectedNote.realWorldExample.tryItUrl} />
                      <p className="text-sm font-semibold text-slate-200">Output</p>
                      <CodeBlock code={selectedNote.realWorldExample.output} language="Output" />
                      <div className="space-y-1">
                        {selectedNote.realWorldExample.explanation.map((line) => (
                          <p key={line} className={`text-sm ${mutetext}`}>- {line}</p>
                        ))}
                      </div>
                    </section>

                    <section id={`${selectedNote.slug}-common-mistakes`} className="reveal space-y-3">
                      <h3 className="text-xl font-semibold">Common Mistakes</h3>
                      {selectedNote.commonMistakes.map((item) => (
                        <div key={item.mistake} className="rounded-xl border border-white/10 bg-slate-950/50 p-3">
                          <p className="font-semibold text-amber-300">{item.mistake}</p>
                          <p className={`text-sm ${mutetext}`}>Why: {item.whyItHappens}</p>
                          <p className="text-sm text-emerald-300">Fix: {item.fix}</p>
                        </div>
                      ))}
                    </section>

                    <section className="reveal space-y-2">
                      <h3 className="text-xl font-semibold">Important Points</h3>
                      {selectedNote.importantPoints.map((point) => (
                        <p key={point} className={mutetext}>- {point}</p>
                      ))}
                    </section>

                    <section id={`${selectedNote.slug}-practice`} className="reveal space-y-2">
                      <h3 className="text-xl font-semibold">Practice</h3>
                      {selectedNote.practice.map((task) => (
                        <p key={task} className={mutetext}>- {task}</p>
                      ))}
                    </section>

                    <section className="reveal space-y-2">
                      <h3 className="text-xl font-semibold">Challenge</h3>
                      <p className={mutetext}>{selectedNote.challenge}</p>
                    </section>

                    <section className="reveal space-y-2">
                      <h3 className="text-xl font-semibold">Quick Revision</h3>
                      <p className={mutetext}>{selectedNote.summary}</p>
                    </section>

                    <QuizBlock
                      quizKey={`note-${selectedNote.slug}`}
                      questions={selectedNote.quiz}
                      scoreMap={quizScores}
                      onSaveScore={saveScore}
                    />

                    <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5">
                      <button
                        type="button"
                        disabled={!nextPrev.prev}
                        onClick={() => nextPrev.prev && moveTo(`#/notes/${nextPrev.prev.level}/${nextPrev.prev.slug}`)}
                        className="rounded-xl border border-white/15 px-4 py-2 text-sm disabled:opacity-40"
                      >
                        Previous Topic
                      </button>
                      <button
                        type="button"
                        disabled={!nextPrev.next}
                        onClick={() => nextPrev.next && moveTo(`#/notes/${nextPrev.next.level}/${nextPrev.next.slug}`)}
                        className="rounded-xl border border-white/15 px-4 py-2 text-sm disabled:opacity-40"
                      >
                        Next Topic
                      </button>
                    </div>
                  </article>
                )}
              </div>
            </div>
          )}

          {route.page === "projects" && (
            <section className="space-y-8">
              <div>
                <h2 className="text-3xl font-black">Python Projects</h2>
                <p className={mutetext}>Projects are grouped by difficulty and include plans, starter code, and improvements.</p>
              </div>
              {(["beginner", "intermediate", "pro"] as Level[]).map((level) => (
                <div key={level} className="space-y-4">
                  <h3 className={`text-xl font-bold ${levelColors[level]}`}>{levelLabels[level]}</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {projectIdeas.filter((project) => project.level === level).map((project) => (
                      <ProjectBlock key={project.title} project={project} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {route.page === "quizzes" && (
            <section className="space-y-8">
              <div>
                <h2 className="text-3xl font-black">Level Quizzes</h2>
                <p className={mutetext}>Take short quizzes after each major level and track your best score locally.</p>
              </div>
              {(["beginner", "intermediate", "pro"] as Level[]).map((level) => (
                <QuizBlock
                  key={level}
                  quizKey={`level-${level}`}
                  questions={levelQuizzes[level]}
                  scoreMap={quizScores}
                  onSaveScore={saveScore}
                />
              ))}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
