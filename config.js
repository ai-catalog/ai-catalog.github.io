/**
 * ============================================
 * AI CATALOG — Configuration
 * ============================================
 */

var TOOLS = [

  // ─── TOP PICKS ───────────────────────────────────────────────
  {
    name:        "Claude",
    description: "Anthropic’s flagship model known for reasoning, safety, and long-context performance.",
    link:        "https://claude.ai",
    price:       "$0-100",
    tags:        ["freemium"],
    categories:  ["top_picks", "coding"]
  },
  {
    name:        "ChatGPT",
    description: "OpenAI’s conversational AI for writing, coding, analysis, and creativity.",
    link:        "https://chat.openai.com",
    price:       "$0-200",
    tags:        ["freemium"],
    categories:  ["top_picks", "chatbots"]
  },
  {
    name:        "Gemini",
    description: "Google’s multimodal AI for chat, reasoning, and creative tasks.",
    link:        "https://gemini.google.com",
    price:       "$0-20",
    tags:        ["freemium"],
    categories:  ["top_picks", "chatbots"]
  },
  {
    name:        "Microsoft Copilot",
    description: "AI assistant integrated across Windows, Office, and the web.",
    link:        "https://copilot.microsoft.com",
    price:       "$0-30",
    tags:        ["freemium"],
    categories:  ["top_picks", "chatbots"]
  },

  // ─── GRAPHICS ────────────────────────────────────────────────
  {
    name:        "Midjourney",
    description: "High‑quality artistic image generation with advanced style control.",
    link:        "https://midjourney.com",
    price:       "$10-$120",
    tags:        ["subscription"],
    categories:  ["art"]
  },
  {
    name:        "Runway",
    description: "AI video and image generation for creators and filmmakers.",
    link:        "https://runwayml.com",
    price:       "$10-29",
    tags:        ["trial"],
    categories:  ["art"]
  },
  {
    name:        "Leonardo AI",
    description: "Fast, high-quality image generation for design and concept art.",
    link:        "https://leonardo.ai",
    price:       "$0-76",
    tags:        ["freemium"],
    categories:  ["art"]
  },

  // ─── CODING ──────────────────────────────────────────────────
  {
    name:        "GitHub Copilot",
    description: "AI coding assistant trained on billions of lines of code.",
    link:        "https://github.com/features/copilot",
    price:       "$10-39",
    tags:        ["subscription"],
    categories:  ["coding"]
  },
  {
    name:        "Cursor",
    description: "AI-powered code editor with refactoring and agentic workflows.",
    link:        "https://cursor.sh",
    price:       "$0-200",
    tags:        ["freemium"],
    categories:  ["coding"]
  },
  {
    name:        "Lovable",
    description: "AI-powered code editor that builds full apps from natural language.",
    link:        "https://lovable.dev",
    price:       "$0-50",
    tags:        ["freemium"],
    categories:  ["coding"]
  },

  // ─── CHATBOTS ────────────────────────────────────────────────
  {
    name:        "Grok",
    description: "xAI’s chatbot with real-time access to X platform data.",
    link:        "https://x.com/i/grok",
    price:       "$0-30",
    tags:        ["freemium"],
    categories:  ["chatbots"]
  },
  {
    name:        "Perplexity",
    description: "AI search and conversational assistant with real-time citations.",
    link:        "https://perplexity.ai",
    price:       "$0-200",
    tags:        ["freemium"],
    categories:  ["chatbots"]
  },

  // ─── AGENTS ──────────────────────────────────────────────────
  {
    name:        "Moltbot",
    description: "Lightweight open-source agent system for multi-step tasks.",
    link:        "https://github.com/moltbot/moltbot",
    price:       "$0",
    tags:        ["free", "open-source"],
    categories:  ["agents"]
  },
  {
    name:        "AgentGPT",
    description: "Create autonomous AI agents directly in the browser.",
    link:        "https://agentgpt.reworkd.ai",
    price:       "$0-40",
    tags:        ["freemium"],
    categories:  ["agents"]
  }
];

/**
 * Display order for category sections.
 */
var CATEGORY_ORDER = [
  "chatbots",
  "coding",
  "art",
  "agents"
];

/**
 * Contact email — shown in footer.
 */
var SITE_EMAIL = "ai-catalog@proton.me";
