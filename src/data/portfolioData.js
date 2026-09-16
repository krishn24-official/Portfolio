// ────────────────────────────────────────────────────────────────
// EDIT THIS FILE with your real information. Everything on the site
// is rendered from this object, dispatched through Redux Thunk as if
// it were an API response (see store/portfolioActions.js). Swap the
// fake delay/fetch below for a real API or CMS call whenever you have one.
// ────────────────────────────────────────────────────────────────

export const portfolioData = {
  name: 'Krishna Rajeshbhai Tandel',
  role: 'Python Backend & AI Developer',
  tagline: 'I build scalable REST APIs, Agentic AI pipelines, and real-time systems.',
  location: 'Bilimora, Gujarat',
  email: 'krishtandel24@gmail.com',
  socials: {
    github: 'https://github.com/krishn24-official',
    linkedin: 'https://www.linkedin.com/in/krisn24',
    resume: '/resume.pdf',
  },
  about: `I'm a Python & FastAPI backend developer with 6 months of industry experience building production-grade REST APIs, JWT authentication systems, and Agentic AI pipelines using Gemini function-calling. I have designed and deployed scalable backend services with PostgreSQL, MongoDB, and WebSocket integrations, and I am actively seeking a Python Backend or AI Engineer role to deliver reliable, intelligent systems.`,
  skills: [
    { category: 'Programming Languages', items: ['C', 'Python', 'JavaScript'] },
    { category: 'Frontend', items: ['HTML5', 'CSS', 'React'] },
    { category: 'Backend & Databases', items: ['FastAPI', 'MongoDB', 'PostgreSQL', 'SQL', 'WebSockets'] },
    { category: 'AI & ML', items: ['Machine Learning', 'Agentic AI', 'Prompt Engineering', 'NLP', 'LLM Function Calling'] },
    { category: 'Tools & Deployment', items: ['Git', 'Render', 'Vercel', 'Postman', 'Swagger UI'] },
  ],
  projects: [
    {
      id: 'proj-01',
      title: 'Entertainment Platform (Full Stack + Agentic AI)',
      summary:
        'A full-stack application integrating Agentic AI with an automated news pipeline and layered architecture.',
      problem: 'Needed a scalable way to fetch, categorize, and serve entertainment data while integrating intelligent AI agents.',
      decisions: 'Implemented Agentic AI using Gemini function-calling for multi-step reasoning, and an automated news pipeline fetching from 8 sources every 10 minutes.',
      learned: 'Gained hands-on experience in building JWT auth with token rotation, TTL auto-expiry indexes, and chaining LLM tools autonomously.',
      stack: ['Python', 'FastAPI', 'React', 'MongoDB', 'Gemini AI'],
      liveUrl: 'https://anime-ai-fe.vercel.app/',
      repoUrl: 'https://github.com/krishn24-official',
      images: [],
    },
    {
      id: 'proj-02',
      title: 'Inventory Management & Ticketing System',
      summary: 'A robust system developed during an internship at IT Idol Technologies for managing inventory and tickets with real-time updates.',
      problem: 'Managing inventory accurately while providing real-time ticketing notifications to users.',
      decisions: 'Integrated WebSockets for real-time notifications and live data updates, backed by scalable PostgreSQL databases.',
      learned: 'Learned to design and manage PostgreSQL databases and implement secure JWT-based authentication in a production setting.',
      stack: ['Python', 'FastAPI', 'PostgreSQL', 'WebSockets'],
      liveUrl: '',
      repoUrl: '',
      images: [],
    },
    {
      id: 'proj-03',
      title: 'AI Agent Prototype',
      summary: 'A capstone deliverable featuring a working AI agent built using NLP pipelines and prompt engineering during an IBM SkillsBuild internship.',
      problem: 'Applying prompt engineering techniques and AI agent workflows to practical reasoning tasks.',
      decisions: 'Utilized industry tools to develop NLP pipelines and LLM-based reasoning for the prototype.',
      learned: 'Gained practical exposure to LLM-based reasoning and ML model evaluation.',
      stack: ['Python', 'NLP', 'Prompt Engineering', 'Machine Learning'],
      liveUrl: '',
      repoUrl: '',
      images: [],
    },
    {
      id: 'proj-04',
      title: 'Buddy — Cross-Platform Voice Assistant',
      summary:
        'A hands-free, wake-word-activated voice assistant for Windows and Android that opens apps, drafts and sends WhatsApp/Gmail messages, answers questions, screens phone calls, and plays media — with no cloud vendor lock-in.',
      problem:
        'Most AI-assistant portfolio projects are a thin prompt wrapped around a chat API. This one needed to solve real systems problems: cross-process audio synchronization, a from-scratch ML pipeline port to a new platform, OS-level permission models, and safety-critical confirmation flows for irreversible actions like sending real emails or answering real calls.',
      decisions:
        "Built a Windows client (wake word via openWakeWord, local speech-to-text with faster-whisper, isolated-process text-to-speech) and a standalone Android client with the wake-word model ported by hand from Python to Kotlin/ONNX Runtime. Both talk to a shared FastAPI 'brain' with multi-provider LLM tool-calling (Groq → Gemini → Mistral → Anthropic, with automatic fallback), real Gmail OAuth integration, and a confirm-before-send safety check on every outbound action.",
      learned:
        "Reverse-engineered and numerically verified a 3-stage ONNX wake-word pipeline with no existing Android library to lean on. Root-caused a pyttsx3/SAPI5 threading deadlock to a fundamental library limitation and fixed it by isolating text-to-speech in its own process. Designed the multi-provider LLM fallback specifically to survive a live mid-project Groq model-lineup deprecation, and worked through Android's CallScreeningService permission model and a Bluetooth SCO connection race condition for reliable call screening.",
      stack: [
        'Python',
        'FastAPI',
        'Kotlin',
        'Android SDK',
        'ONNX Runtime',
        'Groq',
        'Gemini',
        'Mistral',
        'Anthropic API',
        'Gmail API (OAuth2)',
        'YouTube Data API',
        'SQLite',
        'openWakeWord',
      ],
      liveUrl: '',
      repoUrl: 'https://github.com/krishn24-official/Assistant',
      images: [],
    },
  ],
}

// Simulates a network request. Swap this implementation for a real
// fetch('/api/portfolio') call whenever this is backed by a real API.
export function fetchPortfolioFromServer() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(portfolioData)
      } catch (err) {
        reject(err)
      }
    }, 600)
  })
}
