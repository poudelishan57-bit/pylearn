import type { Level, PythonNote } from "../types";

export const levelLabels: Record<Level, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  pro: "Pro / Advanced",
};

export const levelColors: Record<Level, string> = {
  beginner: "text-emerald-400",
  intermediate: "text-amber-400",
  pro: "text-rose-400",
};

export const pythonNotes: PythonNote[] = [
  {
    title: "Python Variables",
    level: "beginner",
    slug: "python-variables",
    description: "Learn how variables store and reuse values.",
    prerequisites: [],
    tags: ["variables", "basics", "syntax", "data"],
    sections: [
      {
        title: "What is it?",
        content:
          "A variable is like a labeled box. You give the box a name, then place a value inside it. Later, you can use the label to read or change that value.",
      },
      {
        title: "Why do we need it?",
        content:
          "Without variables, we would repeat values everywhere. Variables keep code clean and let programs react to different users and inputs.",
      },
      {
        title: "Syntax",
        content:
          "Use name = value. Python creates the variable when you assign the value.",
      },
    ],
    syntax: 'student_name = "Alex"\nage = 18',
    simpleExample: {
      title: "Simple Example",
      code: 'name = "Alex"\nage = 18\n\nprint(name)\nprint(age)',
      output: "Alex\n18",
      explanation: [
        "name stores a text value.",
        "age stores a number.",
        "print(name) shows the value inside name.",
        "print(age) shows the value inside age.",
      ],
    },
    realWorldExample: {
      title: "Real-World Example: Student Snapshot",
      code: 'student_name = "Riya"\nstudent_grade = 9\npython_score = 92\n\nprint(f"Student: {student_name}")\nprint(f"Grade: {student_grade}")\nprint(f"Python Score: {python_score}")',
      output: "Student: Riya\nGrade: 9\nPython Score: 92",
      explanation: [
        "This stores student details in named variables.",
        "f-strings insert values directly into readable text.",
        "Same structure can scale to many students.",
      ],
      tryItUrl: "https://www.programiz.com/python-programming/online-compiler",
    },
    commonMistakes: [
      {
        mistake: "Using spaces in variable names",
        whyItHappens: "Beginners write names like student name.",
        fix: "Use underscores: student_name.",
      },
      {
        mistake: "Starting names with numbers",
        whyItHappens: "Names like 2score feel natural in English.",
        fix: "Start with a letter: score2.",
      },
    ],
    importantPoints: [
      "Variable names are case-sensitive.",
      "Choose meaningful names.",
      "Values can be updated by assigning again.",
    ],
    practice: [
      "Create variables for your name, age, and favorite language.",
      "Swap two number variables and print both before and after.",
      "Store city and country, then print one sentence using f-strings.",
    ],
    challenge:
      "Build a tiny profile printer that stores five details and prints a formatted intro card.",
    summary:
      "Variables are reusable labels for values. They make code flexible, readable, and easy to update.",
    quiz: [
      {
        id: "var-q1",
        type: "multiple",
        question: "Which variable name is valid in Python?",
        options: ["2name", "student name", "student_name", "class"],
        correctIndex: 2,
        explanation: "Use letters/underscores and avoid spaces or starting with numbers.",
      },
      {
        id: "var-q2",
        type: "predict",
        question: "Output of: x = 5\nx = 9\nprint(x)",
        options: ["5", "9", "5 9", "Error"],
        correctIndex: 1,
        explanation: "Latest assignment replaces previous value.",
      },
    ],
  },
  {
    title: "Conditions: if, elif, else",
    level: "beginner",
    slug: "python-conditions",
    description: "Make decisions in Python using conditions.",
    prerequisites: ["python-variables"],
    tags: ["if", "elif", "else", "logic"],
    sections: [
      {
        title: "What is it?",
        content:
          "Conditions help your program choose one path from many paths, based on rules.",
      },
      {
        title: "Why do we need it?",
        content:
          "Real apps decide things: pass/fail, login allowed/denied, discount/no discount.",
      },
      {
        title: "Syntax",
        content:
          "Use if for first check, elif for extra checks, and else for fallback.",
      },
    ],
    syntax: "if condition:\n    ...\nelif another_condition:\n    ...\nelse:\n    ...",
    simpleExample: {
      title: "Simple Example",
      code: "marks = 74\n\nif marks >= 90:\n    print(\"A\")\nelif marks >= 75:\n    print(\"B\")\nelse:\n    print(\"C\")",
      output: "C",
      explanation: [
        "Python checks conditions from top to bottom.",
        "74 is not >= 90 and not >= 75.",
        "So else block runs.",
      ],
    },
    realWorldExample: {
      title: "Real-World Example: Bus Ticket Rule",
      code: "age = 11\n\nif age < 5:\n    fare = 0\nelif age < 13:\n    fare = 20\nelse:\n    fare = 40\n\nprint(f\"Ticket fare: {fare}\")",
      output: "Ticket fare: 20",
      explanation: [
        "Age is checked against child, then teen, then default adult fare.",
        "fare variable stores the chosen value.",
      ],
    },
    commonMistakes: [
      {
        mistake: "Forgetting colon (:) after if",
        whyItHappens: "Python syntax is strict.",
        fix: "Always end if/elif/else lines with colon.",
      },
      {
        mistake: "Wrong indentation",
        whyItHappens: "Beginners mix tabs and spaces.",
        fix: "Use consistent indentation, usually 4 spaces.",
      },
    ],
    importantPoints: [
      "Only first true block runs.",
      "elif is optional, else is optional.",
      "Indentation defines block scope.",
    ],
    practice: [
      "Check if a number is positive, negative, or zero.",
      "Print weekend or weekday based on day name.",
      "Decide bonus based on sales amount.",
    ],
    challenge: "Build a grading tool that returns A/B/C/D/F from score input.",
    summary:
      "Conditions give decision-making power to Python programs using readable logic.",
    quiz: [
      {
        id: "cond-q1",
        type: "error",
        question: "What is wrong? if age > 18 print('Adult')",
        options: ["Nothing", "Missing colon", "age must be string", "print is invalid"],
        correctIndex: 1,
        explanation: "if statement must end with : and next line must be indented.",
      },
      {
        id: "cond-q2",
        type: "predict",
        question: "age = 18\nif age >= 18:\n  print('Yes')\nelse:\n  print('No')",
        options: ["Yes", "No", "Error", "Nothing"],
        correctIndex: 0,
        explanation: "Condition is true, so Yes is printed.",
      },
    ],
  },
  {
    title: "Loops: for and while",
    level: "beginner",
    slug: "python-loops",
    description: "Repeat actions efficiently with loops.",
    prerequisites: ["python-conditions"],
    tags: ["for", "while", "break", "continue"],
    sections: [
      { title: "What is it?", content: "Loops repeat code until a condition is met." },
      {
        title: "Why do we need it?",
        content: "Without loops, repeated tasks would require many copy-pasted lines.",
      },
      {
        title: "Syntax",
        content: "Use for when iterating over items, while when looping based on a condition.",
      },
    ],
    syntax: "for item in collection:\n    ...\n\nwhile condition:\n    ...",
    simpleExample: {
      title: "Simple Example",
      code: "for n in range(1, 4):\n    print(n)",
      output: "1\n2\n3",
      explanation: [
        "range(1, 4) produces 1, 2, 3.",
        "Loop runs once per number.",
      ],
    },
    realWorldExample: {
      title: "Real-World Example: Find Passing Students",
      code: "scores = [45, 80, 62, 91]\n\nfor score in scores:\n    if score < 50:\n        continue\n    print(f\"Pass: {score}\")",
      output: "Pass: 80\nPass: 62\nPass: 91",
      explanation: [
        "Loop checks each score.",
        "continue skips failed scores.",
        "Only passing scores are printed.",
      ],
    },
    commonMistakes: [
      {
        mistake: "Infinite while loop",
        whyItHappens: "Condition never becomes false.",
        fix: "Update loop variable and check exit condition.",
      },
      {
        mistake: "Wrong range end",
        whyItHappens: "range end is exclusive.",
        fix: "Use one number higher than desired last value.",
      },
    ],
    importantPoints: [
      "for loops are safer for fixed sequences.",
      "while loops are useful for unknown repetition count.",
      "break exits loop immediately.",
    ],
    practice: [
      "Print squares from 1 to 10.",
      "Use while loop to count down from 5 to 1.",
      "Print only even numbers from a list.",
    ],
    challenge: "Create a simple ATM PIN checker with max three attempts.",
    summary:
      "Loops automate repetition and pair well with conditions for dynamic behavior.",
    quiz: [
      {
        id: "loop-q1",
        type: "predict",
        question: "for i in range(2):\n  print(i)",
        options: ["1 2", "0 1", "2", "Error"],
        correctIndex: 1,
        explanation: "range(2) starts at 0 and stops before 2.",
      },
      {
        id: "loop-q2",
        type: "multiple",
        question: "Which keyword skips current iteration and moves to next?",
        options: ["stop", "break", "continue", "pass"],
        correctIndex: 2,
        explanation: "continue jumps to the next iteration.",
      },
    ],
  },
  {
    title: "Functions and Return Values",
    level: "beginner",
    slug: "python-functions",
    description: "Organize reusable logic with functions.",
    prerequisites: ["python-loops"],
    tags: ["functions", "parameters", "return", "scope"],
    sections: [
      {
        title: "What is it?",
        content:
          "A function is a named block of code that does one job. You can call it whenever needed.",
      },
      {
        title: "Why do we need it?",
        content: "Functions reduce repetition and make code easier to test and understand.",
      },
      {
        title: "Syntax",
        content: "Define with def, accept parameters, optionally return a result.",
      },
    ],
    syntax: "def greet(name):\n    return f\"Hello {name}\"",
    simpleExample: {
      title: "Simple Example",
      code: "def add(a, b):\n    return a + b\n\nresult = add(2, 3)\nprint(result)",
      output: "5",
      explanation: [
        "Function add receives two numbers.",
        "return sends computed value back.",
        "result stores returned value.",
      ],
    },
    realWorldExample: {
      title: "Real-World Example: Fee Calculator",
      code: "def final_fee(base_fee, discount_percent):\n    discount = base_fee * (discount_percent / 100)\n    return base_fee - discount\n\nprint(final_fee(2000, 10))",
      output: "1800.0",
      explanation: [
        "Function keeps fee logic in one place.",
        "If policy changes, edit one function only.",
      ],
    },
    commonMistakes: [
      {
        mistake: "Using print instead of return",
        whyItHappens: "Both show values, but behave differently.",
        fix: "Use return when caller needs the value.",
      },
      {
        mistake: "Calling function before defining it",
        whyItHappens: "Python runs top to bottom.",
        fix: "Define function first, then call.",
      },
    ],
    importantPoints: [
      "Good functions have one clear responsibility.",
      "Parameters are inputs; return is output.",
      "Local variables exist only inside function scope.",
    ],
    practice: [
      "Write function to check if number is even.",
      "Write function that returns full name from first and last name.",
      "Write function to convert Celsius to Fahrenheit.",
    ],
    challenge: "Build a menu-driven calculator using separate functions for each operation.",
    summary: "Functions make programs modular, reusable, and easier to maintain.",
    quiz: [
      {
        id: "fn-q1",
        type: "multiple",
        question: "Which keyword sends a value back from a function?",
        options: ["print", "back", "return", "yield"],
        correctIndex: 2,
        explanation: "return gives value to the caller.",
      },
      {
        id: "fn-q2",
        type: "correct-code",
        question: "Choose correct function definition.",
        options: ["function add(a,b)", "def add(a, b):", "def add a, b:", "add def(a,b):"],
        correctIndex: 1,
        explanation: "Python uses def name(params):",
      },
    ],
  },
  {
    title: "Object-Oriented Programming (OOP)",
    level: "intermediate",
    slug: "python-oop",
    description: "Model real-world entities using classes and objects.",
    prerequisites: ["python-functions"],
    tags: ["class", "object", "inheritance", "encapsulation"],
    sections: [
      {
        title: "What is it?",
        content:
          "OOP is a way to organize code by creating blueprints (classes) and actual items (objects).",
      },
      {
        title: "Why do we need it?",
        content:
          "Large programs become easier to manage when data and behavior stay together in objects.",
      },
      {
        title: "Syntax",
        content:
          "Use class to define a blueprint and __init__ to set starting data.",
      },
    ],
    syntax: "class Student:\n    def __init__(self, name):\n        self.name = name",
    simpleExample: {
      title: "Simple Example",
      code: "class Student:\n    def __init__(self, name):\n        self.name = name\n\n    def greet(self):\n        return f\"Hi, I am {self.name}\"\n\ns1 = Student(\"Asha\")\nprint(s1.greet())",
      output: "Hi, I am Asha",
      explanation: [
        "Student is a class blueprint.",
        "s1 is an object made from that blueprint.",
        "self.name stores object-specific data.",
      ],
    },
    realWorldExample: {
      title: "Real-World Example: Bank Account",
      code: "class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        self.balance += amount\n\n    def show_balance(self):\n        print(f\"{self.owner}: {self.balance}\")\n\naccount = BankAccount(\"Nina\", 500)\naccount.deposit(250)\naccount.show_balance()",
      output: "Nina: 750",
      explanation: [
        "Class keeps account data and actions together.",
        "Methods update and display state safely.",
      ],
    },
    commonMistakes: [
      {
        mistake: "Forgetting self in method parameters",
        whyItHappens: "Beginners treat methods like normal functions.",
        fix: "Instance methods need self as first parameter.",
      },
      {
        mistake: "Confusing class and instance attributes",
        whyItHappens: "Both are accessed with dot notation.",
        fix: "Put shared data on class, unique data on self.",
      },
    ],
    importantPoints: [
      "Classes define structure; objects hold real values.",
      "Encapsulation means keeping data + behavior together.",
      "Inheritance allows code reuse across related classes.",
    ],
    practice: [
      "Create a Book class with title and author.",
      "Add method to return full book label.",
      "Create Employee class with salary raise method.",
    ],
    challenge: "Build a Library system with Book and Member classes.",
    summary:
      "OOP helps structure medium and large codebases with reusable, maintainable components.",
    quiz: [
      {
        id: "oop-q1",
        type: "multiple",
        question: "What is an object?",
        options: [
          "A Python file",
          "An instance created from a class",
          "A built-in keyword",
          "A loop type",
        ],
        correctIndex: 1,
        explanation: "Object is a concrete instance of a class blueprint.",
      },
      {
        id: "oop-q2",
        type: "error",
        question: "Why does this fail? class A: def hi(): print('x')",
        options: ["class must be lowercase", "Missing self", "print not allowed", "A is reserved"],
        correctIndex: 1,
        explanation: "Instance method requires self parameter.",
      },
    ],
  },
  {
    title: "Comprehensions",
    level: "intermediate",
    slug: "python-comprehensions",
    description: "Write compact loops for lists, sets, and dictionaries.",
    prerequisites: ["python-loops"],
    tags: ["list comprehension", "dictionary", "set", "lambda"],
    sections: [
      { title: "What is it?", content: "Comprehensions create collections in one readable line." },
      {
        title: "Why do we need it?",
        content: "They reduce boilerplate and keep transformation logic close together.",
      },
      {
        title: "Syntax",
        content: "[expression for item in iterable if condition]",
      },
    ],
    syntax: "squares = [n * n for n in range(6)]",
    simpleExample: {
      title: "Simple Example",
      code: "nums = [1, 2, 3, 4]\nevens = [n for n in nums if n % 2 == 0]\nprint(evens)",
      output: "[2, 4]",
      explanation: ["Loop is inside the brackets.", "Only numbers passing condition are included."],
    },
    realWorldExample: {
      title: "Real-World Example: Marks Dictionary",
      code: "students = [\"Ava\", \"Liam\", \"Mia\"]\nmarks = [86, 91, 77]\nscore_map = {name: mark for name, mark in zip(students, marks)}\nprint(score_map)",
      output: "{'Ava': 86, 'Liam': 91, 'Mia': 77}",
      explanation: [
        "zip pairs each student with corresponding mark.",
        "Dictionary comprehension creates a clean mapping.",
      ],
    },
    commonMistakes: [
      {
        mistake: "Making very long one-line comprehensions",
        whyItHappens: "Trying to do too much in one expression.",
        fix: "Keep it simple; switch to normal loop when logic grows.",
      },
      {
        mistake: "Forgetting condition position",
        whyItHappens: "Condition comes after loop part.",
        fix: "Use format: expr for x in y if condition.",
      },
    ],
    importantPoints: [
      "Readable code is better than short code.",
      "Comprehensions are great for mapping and filtering.",
      "Use dict/set comprehensions similarly with {}.",
    ],
    practice: [
      "Create list of cubes from 1 to 8.",
      "Build dictionary of number to square for 1-5.",
      "Create set of first letters from a list of names.",
    ],
    challenge: "Convert list of product dictionaries into price lookup dictionary.",
    summary:
      "Comprehensions are concise tools for common transformation tasks.",
    quiz: [
      {
        id: "comp-q1",
        type: "correct-code",
        question: "Create list of doubles from nums.",
        options: [
          "[for n in nums: n*2]",
          "[n*2 for n in nums]",
          "{n*2 for n in nums]",
          "(n*2 in nums)",
        ],
        correctIndex: 1,
        explanation: "List comprehension format is expression first.",
      },
      {
        id: "comp-q2",
        type: "predict",
        question: "[n for n in [1,2,3,4] if n>2]",
        options: ["[1,2]", "[3,4]", "[2,3,4]", "Error"],
        correctIndex: 1,
        explanation: "Only values greater than 2 are included.",
      },
    ],
  },
  {
    title: "Decorators",
    level: "intermediate",
    slug: "python-decorators",
    description: "Extend function behavior without editing function body.",
    prerequisites: ["python-functions"],
    tags: ["decorators", "advanced functions", "wrappers"],
    sections: [
      {
        title: "What is it?",
        content:
          "A decorator wraps a function with extra behavior, like logging or timing, while keeping original function code clean.",
      },
      {
        title: "Why do we need it?",
        content: "Useful when many functions need the same extra step.",
      },
      {
        title: "Syntax",
        content: "@decorator_name above function definition.",
      },
    ],
    syntax: "@my_decorator\ndef my_function():\n    ...",
    simpleExample: {
      title: "Simple Example",
      code: "def shout(func):\n    def wrapper():\n        print(\"Before\")\n        func()\n        print(\"After\")\n    return wrapper\n\n@shout\ndef hello():\n    print(\"Hello\")\n\nhello()",
      output: "Before\nHello\nAfter",
      explanation: [
        "shout returns wrapper function.",
        "@shout applies wrapper to hello.",
        "Wrapper runs extra code before and after.",
      ],
    },
    realWorldExample: {
      title: "Real-World Example: Timing a Function",
      code: "import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f\"Took {time.time() - start:.4f}s\")\n        return result\n    return wrapper\n\n@timer\ndef load_data():\n    time.sleep(0.2)\n\nload_data()",
      output: "Took 0.2000s",
      explanation: ["Decorator tracks runtime without changing load_data body."],
    },
    commonMistakes: [
      {
        mistake: "Wrapper not accepting *args and **kwargs",
        whyItHappens: "Works only for no-argument functions.",
        fix: "Use flexible wrapper signature.",
      },
      {
        mistake: "Forgetting return result",
        whyItHappens: "Decorator runs but function output disappears.",
        fix: "Return the original function result.",
      },
    ],
    importantPoints: [
      "Decorators follow higher-order function pattern.",
      "Great for logging, auth checks, retries, timing.",
      "Use functools.wraps in production to preserve metadata.",
    ],
    practice: [
      "Create decorator that prints function name.",
      "Create decorator that runs function twice.",
      "Create decorator that blocks call when flag is false.",
    ],
    challenge: "Build a retry decorator for unstable network calls.",
    summary:
      "Decorators let you layer shared behavior across many functions cleanly.",
    quiz: [
      {
        id: "dec-q1",
        type: "multiple",
        question: "Decorator syntax uses which symbol?",
        options: ["#", "@", "$", "%"],
        correctIndex: 1,
        explanation: "Decorators are applied using @decorator_name.",
      },
      {
        id: "dec-q2",
        type: "error",
        question: "Decorator wrapper fails on arguments. Best fix?",
        options: [
          "Add global variables",
          "Use print statements",
          "Use *args, **kwargs in wrapper",
          "Remove decorator",
        ],
        correctIndex: 2,
        explanation: "Flexible args allow wrapper to support many functions.",
      },
    ],
  },
  {
    title: "Asyncio Fundamentals",
    level: "pro",
    slug: "python-asyncio",
    description: "Handle many waiting tasks efficiently with async/await.",
    prerequisites: ["python-loops", "python-functions"],
    tags: ["async", "await", "asyncio", "concurrency"],
    sections: [
      {
        title: "What is it?",
        content:
          "Asyncio runs tasks cooperatively. While one task waits (for network/file), another task can run.",
      },
      {
        title: "Why do we need it?",
        content: "It improves throughput for I/O-heavy apps like APIs, bots, crawlers, and chat systems.",
      },
      {
        title: "Syntax",
        content: "Define async def, pause with await, run via asyncio.run().",
      },
    ],
    syntax: "async def task():\n    await something()",
    simpleExample: {
      title: "Simple Example",
      code: "import asyncio\n\nasync def hello():\n    await asyncio.sleep(1)\n    print(\"done\")\n\nasyncio.run(hello())",
      output: "done",
      explanation: ["await yields control while waiting, so event loop can run other tasks."],
    },
    realWorldExample: {
      title: "Real-World Example: Concurrent Downloads (Mock)",
      code: "import asyncio\n\nasync def fetch(name, delay):\n    await asyncio.sleep(delay)\n    return f\"{name} finished\"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch(\"file-A\", 2),\n        fetch(\"file-B\", 1),\n    )\n    print(results)\n\nasyncio.run(main())",
      output: "['file-A finished', 'file-B finished']",
      explanation: [
        "Both tasks start together.",
        "Total wait is close to longest task, not sum of both.",
      ],
    },
    commonMistakes: [
      {
        mistake: "Calling async function without await",
        whyItHappens: "It returns coroutine object, not result.",
        fix: "Use await inside async function or asyncio.run at top level.",
      },
      {
        mistake: "Using time.sleep in async code",
        whyItHappens: "Blocks event loop.",
        fix: "Use await asyncio.sleep instead.",
      },
    ],
    importantPoints: [
      "Best for I/O-bound workloads, not CPU-heavy tasks.",
      "Use asyncio.gather for parallel waiting.",
      "Understand event loop lifecycle.",
    ],
    practice: [
      "Run three async tasks with different delays.",
      "Convert blocking sleep code to asyncio version.",
      "Build async timer that prints every second.",
    ],
    challenge: "Create async script that checks multiple API URLs concurrently.",
    summary: "Asyncio increases efficiency for apps that spend time waiting.",
    quiz: [
      {
        id: "async-q1",
        type: "multiple",
        question: "Which keyword pauses coroutine until result is ready?",
        options: ["yield", "pause", "await", "wait"],
        correctIndex: 2,
        explanation: "await is the core async keyword.",
      },
      {
        id: "async-q2",
        type: "error",
        question: "Why is time.sleep bad inside async function?",
        options: ["Too fast", "Blocks event loop", "Syntax error", "No reason"],
        correctIndex: 1,
        explanation: "Blocking calls stop other async tasks from progressing.",
      },
    ],
  },
  {
    title: "Performance Optimization",
    level: "pro",
    slug: "python-performance",
    description: "Measure and optimize Python performance systematically.",
    prerequisites: ["python-loops", "python-comprehensions"],
    tags: ["big-o", "profiling", "optimization", "memory"],
    sections: [
      {
        title: "What is it?",
        content:
          "Performance optimization means making code faster or lighter after measuring bottlenecks.",
      },
      {
        title: "Why do we need it?",
        content:
          "Efficient code lowers server cost, improves user experience, and scales better.",
      },
      {
        title: "Syntax",
        content:
          "Use timeit for small timing tests and cProfile for function-level hotspots.",
      },
    ],
    syntax: "python -m cProfile your_script.py",
    simpleExample: {
      title: "Simple Example",
      code: "import timeit\n\ncode = \"sum([n*n for n in range(1000)])\"\nprint(timeit.timeit(code, number=1000))",
      output: "0.0... (timing varies by machine)",
      explanation: ["timeit runs code many times and reports total time."],
    },
    realWorldExample: {
      title: "Real-World Example: Membership Check",
      code: "emails = [f\"user{i}@app.com\" for i in range(100000)]\nemail_set = set(emails)\n\nprint(\"user99999@app.com\" in email_set)",
      output: "True",
      explanation: [
        "Set lookup is usually much faster than list lookup for membership checks.",
        "Choosing right data structure is often biggest win.",
      ],
    },
    commonMistakes: [
      {
        mistake: "Optimizing before measuring",
        whyItHappens: "Guessing bottlenecks leads to wasted effort.",
        fix: "Profile first, optimize second.",
      },
      {
        mistake: "Ignoring algorithm complexity",
        whyItHappens: "Small test data hides O(n^2) problems.",
        fix: "Learn Big-O and test with larger input.",
      },
    ],
    importantPoints: [
      "Measure with realistic data.",
      "Algorithm and data structure choices matter most.",
      "Readable code is still important; optimize hotspots only.",
    ],
    practice: [
      "Compare list vs set membership timing.",
      "Profile nested loops and reduce unnecessary work.",
      "Use caching for repeated expensive function calls.",
    ],
    challenge: "Optimize a slow log parser handling 1 million lines.",
    summary: "Performance work is a data-driven process: profile, improve, re-measure.",
    quiz: [
      {
        id: "perf-q1",
        type: "multiple",
        question: "First step in optimization?",
        options: ["Rewrite everything", "Profile code", "Use async", "Use threads"],
        correctIndex: 1,
        explanation: "Measure bottlenecks before changing code.",
      },
      {
        id: "perf-q2",
        type: "predict",
        question: "For frequent membership checks on huge data, better choice?",
        options: ["list", "set", "tuple", "string"],
        correctIndex: 1,
        explanation: "Sets provide near O(1) average lookup.",
      },
    ],
  },
  {
    title: "Design Patterns in Python",
    level: "pro",
    slug: "python-design-patterns",
    description: "Use proven software design patterns in Python architecture.",
    prerequisites: ["python-oop"],
    tags: ["design patterns", "architecture", "singleton", "factory"],
    sections: [
      {
        title: "What is it?",
        content:
          "Design patterns are reusable ways to solve common software design problems.",
      },
      {
        title: "Why do we need it?",
        content: "They improve maintainability and help teams use shared architecture language.",
      },
      {
        title: "Syntax",
        content: "Pattern syntax varies; focus on intent and trade-offs.",
      },
    ],
    syntax: "# Example: Factory pattern returns object based on input type",
    simpleExample: {
      title: "Simple Example: Factory",
      code: "class Dog:\n    def speak(self):\n        return \"Woof\"\n\nclass Cat:\n    def speak(self):\n        return \"Meow\"\n\ndef animal_factory(kind):\n    return Dog() if kind == \"dog\" else Cat()\n\npet = animal_factory(\"dog\")\nprint(pet.speak())",
      output: "Woof",
      explanation: ["Factory hides object creation details from caller."],
    },
    realWorldExample: {
      title: "Real-World Example: Notification Strategy",
      code: "class EmailSender:\n    def send(self, msg):\n        print(f\"Email: {msg}\")\n\nclass SmsSender:\n    def send(self, msg):\n        print(f\"SMS: {msg}\")\n\ndef get_sender(channel):\n    return EmailSender() if channel == \"email\" else SmsSender()\n\nsender = get_sender(\"sms\")\nsender.send(\"Class starts at 5 PM\")",
      output: "SMS: Class starts at 5 PM",
      explanation: [
        "Factory selects matching strategy object.",
        "Caller code stays unchanged when new channels are added.",
      ],
    },
    commonMistakes: [
      {
        mistake: "Forcing patterns into simple code",
        whyItHappens: "Patterns sound advanced and impressive.",
        fix: "Use patterns only when they solve a real maintenance problem.",
      },
      {
        mistake: "Ignoring Pythonic simplicity",
        whyItHappens: "Copying Java-heavy pattern implementations.",
        fix: "Prefer clear and lightweight Python versions.",
      },
    ],
    importantPoints: [
      "Patterns are tools, not rules.",
      "Understand the problem before selecting a pattern.",
      "Document trade-offs for team clarity.",
    ],
    practice: [
      "Implement a logger singleton.",
      "Create simple observer for score updates.",
      "Build plugin loader using strategy pattern.",
    ],
    challenge: "Design extensible payment system with strategy + factory patterns.",
    summary:
      "Patterns help you scale architecture decisions with consistency and clarity.",
    quiz: [
      {
        id: "pattern-q1",
        type: "multiple",
        question: "Main purpose of design patterns?",
        options: [
          "Shorten syntax",
          "Increase CPU speed only",
          "Provide reusable design solutions",
          "Replace testing",
        ],
        correctIndex: 2,
        explanation: "Patterns are proven architecture templates.",
      },
      {
        id: "pattern-q2",
        type: "multiple",
        question: "Factory pattern mainly handles:",
        options: ["Loops", "Object creation", "File access", "Regex"],
        correctIndex: 1,
        explanation: "Factory centralizes object creation logic.",
      },
    ],
  },
];

export const levelTopicCatalog: Record<Level, string[]> = {
  beginner: [
    "What is Python?",
    "Installing Python",
    "Python syntax",
    "Variables",
    "Data types",
    "Input and output",
    "Conditions",
    "Loops",
    "Lists, Tuples, Sets, Dictionaries",
    "Functions",
    "Modules",
    "Working with files",
    "Basic debugging",
  ],
  intermediate: [
    "Advanced functions, *args, **kwargs",
    "Lambda and comprehensions",
    "Recursion",
    "Exception handling",
    "OOP fundamentals",
    "Iterators and generators",
    "Decorators",
    "Context managers",
    "JSON and CSV",
    "Regex, datetime, os, pathlib",
    "Virtual environments and pip",
    "Type hints and dataclasses",
    "Testing basics",
  ],
  pro: [
    "Advanced OOP and design patterns",
    "Closures, descriptors, metaclasses",
    "Python internals and memory",
    "Performance optimization and profiling",
    "Multithreading and multiprocessing",
    "Asyncio and concurrency",
    "Networking, APIs, REST",
    "SQL and SQLite",
    "Automation and web scraping",
    "Logging and security best practices",
    "Packaging and CLI apps",
    "Professional architecture and deployment",
  ],
};

export const roadmap = [
  "Python Basics",
  "Variables and Data Types",
  "Conditions",
  "Loops",
  "Data Structures",
  "Functions",
  "Modules",
  "OOP",
  "Advanced Python",
  "Real-World Projects",
];