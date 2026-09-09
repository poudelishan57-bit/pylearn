import type { Level, QuizQuestion } from "../types";

export const levelQuizzes: Record<Level, QuizQuestion[]> = {
  beginner: [
    {
      id: "b-1",
      type: "multiple",
      question: "What does print() do?",
      options: ["Deletes data", "Shows output", "Creates a loop", "Imports module"],
      correctIndex: 1,
      explanation: "print() displays values to the console.",
    },
    {
      id: "b-2",
      type: "predict",
      question: "x = 3\nif x > 5:\n  print('A')\nelse:\n  print('B')",
      options: ["A", "B", "A and B", "Error"],
      correctIndex: 1,
      explanation: "x is not greater than 5, so else runs.",
    },
  ],
  intermediate: [
    {
      id: "i-1",
      type: "multiple",
      question: "Which feature lets one class reuse another class behavior?",
      options: ["Inheritance", "Indexing", "Casting", "Slicing"],
      correctIndex: 0,
      explanation: "Inheritance supports reuse and extension.",
    },
    {
      id: "i-2",
      type: "error",
      question: "Most likely issue in decorator wrapper without *args, **kwargs?",
      options: ["Runs too fast", "Cannot wrap parameterized functions", "Syntax warning", "Memory leak"],
      correctIndex: 1,
      explanation: "Wrapper signature must support incoming arguments.",
    },
  ],
  pro: [
    {
      id: "p-1",
      type: "multiple",
      question: "Best fit for asyncio?",
      options: ["CPU-heavy matrix multiplication", "Many HTTP requests", "Image rendering", "Sorting tiny arrays"],
      correctIndex: 1,
      explanation: "Asyncio shines in I/O-bound concurrency.",
    },
    {
      id: "p-2",
      type: "multiple",
      question: "Before optimizing code, you should:",
      options: ["Switch language", "Profile bottlenecks", "Use metaclasses", "Add threads everywhere"],
      correctIndex: 1,
      explanation: "Measurement guides useful optimization.",
    },
  ],
};