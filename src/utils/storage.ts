const keys = {
  theme: "pylearn-theme",
  completed: "pylearn-completed",
  bookmarks: "pylearn-bookmarks",
  recent: "pylearn-recent",
  quizScores: "pylearn-quiz-scores",
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  keys,
  readTheme: () => localStorage.getItem(keys.theme) ?? "dark",
  writeTheme: (theme: "dark" | "light") => localStorage.setItem(keys.theme, theme),
  readCompleted: () => read<string[]>(keys.completed, []),
  writeCompleted: (slugs: string[]) => write(keys.completed, slugs),
  readBookmarks: () => read<string[]>(keys.bookmarks, []),
  writeBookmarks: (slugs: string[]) => write(keys.bookmarks, slugs),
  readRecent: () => read<string[]>(keys.recent, []),
  writeRecent: (slugs: string[]) => write(keys.recent, slugs),
  readQuizScores: () => read<Record<string, number>>(keys.quizScores, {}),
  writeQuizScores: (scores: Record<string, number>) => write(keys.quizScores, scores),
};