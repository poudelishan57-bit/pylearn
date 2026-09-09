export type Level = "beginner" | "intermediate" | "pro";

export type NoteSection = {
  title: string;
  content: string;
};

export type CodeExample = {
  title: string;
  code: string;
  output: string;
  explanation: string[];
  tryItUrl?: string;
};

export type CommonMistake = {
  mistake: string;
  whyItHappens: string;
  fix: string;
};

export type QuizQuestion = {
  id: string;
  type: "multiple" | "predict" | "error" | "correct-code";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type PythonNote = {
  title: string;
  level: Level;
  slug: string;
  description: string;
  prerequisites: string[];
  tags: string[];
  sections: NoteSection[];
  syntax: string;
  simpleExample: CodeExample;
  realWorldExample: CodeExample;
  commonMistakes: CommonMistake[];
  importantPoints: string[];
  practice: string[];
  challenge: string;
  summary: string;
  quiz: QuizQuestion[];
};

export type ProjectIdea = {
  title: string;
  level: Level;
  whatYouBuild: string;
  conceptsRequired: string[];
  features: string[];
  steps: string[];
  starterCode: string;
  challenges: string[];
  improvements: string[];
};