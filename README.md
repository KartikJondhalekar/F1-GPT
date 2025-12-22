# F1 GPT - AI Racing Intelligence

A modern, full-stack **Formula 1 chatbot** powered by **GPT-4o-mini** and **Retrieval Augmented Generation (RAG)** built with Next.js and Astra DB. Users can ask anything about Formula 1 racing and receive intelligent, context-aware responses enhanced by a vector database of F1 knowledge—all through a sleek, animated interface.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![React](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o--mini-412991?logo=openai) ![Astra DB](https://img.shields.io/badge/Astra%20DB-Vector-5A67D8) ![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?logo=css3) ![Tailwind](https://img.shields.io/badge/Tailwind-Utilities-06B6D4?logo=tailwindcss) ![UI](https://img.shields.io/badge/UI-Glassmorphism%20%7C%20Animated-purple)

---

## 📸 Preview

<div align="center">
  <img src="./UI.png" alt="F1 GPT Chat Interface" width="800"/>
  <p><em>F1 GPT in action - Real-time streaming responses with glassmorphism UI</em></p>
</div>

### 🎬 Key Features Demo

| Feature | Preview |
|---------|---------|
| **Chat Interface** | ![Chat Demo](./Demo.mp4) 

---

## ✨ Features

### 🏎️ Intelligent Chat
- Real-time streaming responses with GPT-5-nano
- Context-aware answers powered by RAG architecture
- Smooth typing animations and loading states
- Message history with user/assistant distinction

### 🎨 Modern UI/UX
- **Glassmorphism design** with backdrop blur effects
- **Animated gradient background** shifting between F1 racing colors
- **Floating particles** and glowing effects
- **Smooth transitions** and hover interactions
- Custom animated logo with F1 official styling and checkered flag pattern
- Responsive design optimized for all devices

### 🧠 RAG Architecture
- Vector similarity search with Astra DB
- Embedding generation with OpenAI text-embedding-3-small
- Context-aware responses combining live queries with knowledge base
- Optimized for speed (2-4 second responses)

### 💬 Chat Features
- Suggested prompts for quick queries
- Custom scrollbar with F1 red gradient
- Message bubbles with glassmorphism effects
- Auto-scroll to latest messages
- Mobile-responsive layout

---

## 🗺️ Architecture

```
┌──────────────────┐
│   Next.js App    │  React 19 + TypeScript
│   (App Router)   │
└────────┬─────────┘
         │
    ┌────▼─────┐
    │  Client  │  useChat hook + UI components
    └────┬─────┘
         │ HTTP Streaming
         ↓
┌───────────────────────┐
│   API Route           │  /api/chat
│   (Edge Runtime)      │
└─────┬─────────┬───────┘
      │         │
  ┌───▼────┐ ┌──▼──────────┐
  │ GPT-4o-│ │  Astra DB   │
  │  mini  │ │  (Vector)   │
  └────────┘ └─────────────┘
     │            │
     └────┬───────┘
          │
    ┌─────▼─────┐
    │ OpenAI    │  text-embedding-3-small
    │ Embedding │
    └───────────┘
```

**Design Principles:**
- **AI-first** – GPT-5-nano for fast, intelligent responses
- **RAG-powered** – Vector search for accurate, context-rich answers
- **Edge-optimized** – Node.js runtime for Astra DB compatibility
- **Streaming responses** – Real-time UI updates as AI generates text
- **Type-safe** – Full TypeScript implementation

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** – React framework with App Router
- **React 19** – Latest React features and hooks
- **TypeScript 5** – Type-safe development
- **Tailwind CSS** – Utility-first styling (minimal usage)
- **Custom CSS** – Glassmorphism, animations, gradients

### AI & Backend
- **AI SDK 5** (Vercel) – Unified AI integration
- **OpenAI GPT-4o-mini** – Fast, efficient model
- **OpenAI Embeddings** – text-embedding-3-small (1536 dimensions)
- **Astra DB** – DataStax vector database
- **Next.js API Routes** – Serverless backend

### Key Libraries
- **@ai-sdk/openai** – OpenAI provider for AI SDK
- **@ai-sdk/react** – React hooks (useChat)
- **@datastax/astra-db-ts** – Astra DB TypeScript client
- **ai** – Vercel AI SDK core

---

## 📂 Project Structure

```
f1-gpt/
├── src/
│   └── app/
│       ├── page.tsx              # Main chat interface
│       ├── layout.tsx            # Root layout
│       ├── global.css            # Custom animations & glassmorphism
│       │
│       ├── api/
│       │   └── chat/
│       │       └── route.ts      # RAG + GPT streaming endpoint
│       │
│       ├── components/
│       │   ├── bubble.tsx                    # Message bubble
│       │   ├── loadingBubble.tsx             # Loading animation
│       │   ├── promptSuggestionButton.tsx    # Suggestion button
│       │   └── promptSuggestionRow.tsx       # Suggestions container
│       │
│       └── assets/
│           └── F1GPTLogo.svg     # Animated F1 + checkered flag logo
│
├── .env.local                    # Environment variables (API keys)
├── package.json                  # Dependencies
├── tsconfig.json                 # TypeScript config
└── next.config.ts                # Next.js config
```

---

## 🔐 AI & Data Architecture

### RAG Pipeline
1. **User Query** → Extract latest message text
2. **Embedding Generation** → OpenAI text-embedding-3-small (1536D)
3. **Vector Search** → Astra DB cosine similarity (top 5 results)
4. **Context Assembly** → Combine retrieved knowledge with system prompt
5. **AI Generation** → GPT-5-nano streams response with context
6. **UI Streaming** → Real-time display via useChat hook

### Optimization Techniques
- **Parallel execution** removed (live API calls eliminated for speed)
- **Limited context** to 2000 characters for faster processing
- **Reduced vector results** from 10 to 5 documents
- **Concise system prompts** for minimal token usage
- **Edge runtime** for low-latency responses

### Database Schema (Astra DB)
```javascript
{
  content: "F1 fact or information",
  $vector: [1536-dimensional embedding array]
}
```

---

## 💡 Key Learnings

### AI Integration
- Implemented production-ready RAG architecture with vector search
- Integrated GPT-4o-mini with streaming responses for real-time UX
- Optimized embedding generation and vector similarity matching
- Designed context management for token-efficient AI queries
- Built type-safe AI SDK implementation with TypeScript

### Full-Stack Development
- Created Next.js 16 App Router application with server-side streaming
- Implemented React 19 hooks (useChat) for real-time chat functionality
- Designed glassmorphism UI with custom CSS animations
- Built responsive, mobile-first chat interface
- Managed authentication state with environment variables

### Performance Optimization
- Reduced response time from 15+ seconds to 2-4 seconds
- Eliminated slow live API calls in favor of vector database
- Optimized context retrieval and token usage
- Implemented smooth UI streaming without blocking
- Configured edge runtime for optimal latency

### Design Excellence
- Created modern F1-themed UI with animated gradients
- Implemented smooth floating animations and glow effects
- Designed custom SVG logo matching official F1 aesthetic
- Built accessible, intuitive chat interface
- Achieved seamless dark mode with glassmorphism

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- OpenAI API key (GPT-5 access)
- Astra DB account (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/KartikJondhalekar/F1-GPT
cd f1-gpt

# Install dependencies
npm install
```

### Environment Setup

Create `.env.local` in project root:

```bash
# OpenAI API Key
OPENAI_API_KEY=sk-proj-your-actual-key-here

# Astra DB Configuration
ASTRA_DB_API_ENDPOINT=https://your-database-id-region.apps.astra.datastax.com
ASTRA_DB_APPLICATION_TOKEN=AstraCS:your-token-here
ASTRA_DB_NAMESPACE=default_keyspace
ASTRA_DB_COLLECTION=f1_documents
```

### Database Setup

1. **Create Astra DB Database:**
   - Go to [astra.datastax.com](https://astra.datastax.com/)
   - Create free database with vector support

2. **Create Collection:**
   ```
   Collection Name: f1_documents
   Vector Enabled: YES
   Vector Dimension: 1536
   Similarity Metric: cosine
   ```

3. **Populate Database** (optional):
   ```bash
   # Create and run population script
   npx tsx scripts/populate-db.ts
   ```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

---

## 📊 API Architecture

### Chat Endpoint: `POST /api/chat`

**Request:**
```json
{
  "messages": [
    {
      "id": "uuid",
      "role": "user",
      "parts": [
        {
          "type": "text",
          "text": "Who won the 2021 F1 championship?"
        }
      ]
    }
  ]
}
```

**Response:** Server-Sent Events (SSE) stream
```
0:"text"
1:"Max"
2:" Verstappen"
...
```

**Process Flow:**
1. Extract latest user message
2. Generate embedding (OpenAI)
3. Vector search (Astra DB)
4. Construct system prompt with context
5. Stream GPT-5-nano response
6. Return UIMessage stream

---

## 🎯 Project Highlights

- **Production-ready RAG** – Full vector search implementation with Astra DB
- **Latest AI models** – GPT-4o-mini for fast, efficient responses
- **Type-safe architecture** – Complete TypeScript coverage
- **Modern UI/UX** – Glassmorphism, animations, smooth transitions
- **Optimized performance** – 2-4 second response times
- **Streaming responses** – Real-time UI updates as AI generates
- **Scalable design** – Serverless architecture ready for production

---

## 🎨 UI Features

### Animations
- Gradient background shifting (15s loop)
- Floating logo with hover effects
- Message bubbles appearing with scale animation
- Loading dots with bounce effect
- Speed lines on logo
- Pulsing glow effects
- Smooth scrolling

### Color Palette
- **Primary:** F1 Red (#e10600)
- **Accent:** Racing Red (#ff3333)
- **Background:** Dark gradient (#0a0a0a → #e10600)
- **Text:** White with transparency
- **Surfaces:** Glassmorphism (rgba with backdrop-blur)

---

## 🔮 Future Enhancements

- [ ] Voice input for hands-free queries
- [ ] Image generation for race visualizations
- [ ] Historical race data integration
- [ ] Multi-language support
- [ ] Driver and team statistics dashboard
- [ ] Race calendar integration
- [ ] Live race updates during events
- [ ] User authentication and chat history
- [ ] Personalized recommendations
- [ ] Export chat transcripts

---

## 📈 Performance Metrics

- **Response Time:** 2-4 seconds (optimized from 15+ seconds)
- **Vector Search:** <300ms for top 5 results
- **Embedding Generation:** 200-500ms
- **UI Streaming:** Real-time, no blocking
- **Bundle Size:** Optimized with Next.js
- **Lighthouse Score:** 90+ across all metrics

---

## 🏁 Testing

### Test Queries
```
✅ "Who is the current F1 World Champion?"
✅ "Tell me about Monaco Grand Prix"
✅ "What is DRS in Formula 1?"
✅ "Explain F1 tire compounds"
✅ "Who holds the most pole positions?"
```

### Expected Behavior
- Instant response streaming
- Context-aware answers from knowledge base
- Smooth UI animations
- Proper message formatting
- Error handling for API failures

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**[Kartik Jayram Jondhalekar]**

[![GitHub](https://img.shields.io/badge/GitHub-YourUsername-black?logo=github)](https://github.com/KartikJondhalekar)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://linkedin.com/in/kartik-jondhalekar)

---

## 🙏 Acknowledgments

Built with cutting-edge AI technologies and modern web frameworks to demonstrate production-ready AI chatbot development with RAG architecture, vector databases, and real-time streaming.

**Technologies Used:**
- Vercel AI SDK for unified AI integration
- OpenAI GPT-4o-mini for intelligent, fast responses
- DataStax Astra DB for vector similarity search
- Next.js 16 for modern React development
- TypeScript for type-safe code

**⭐ If you find this project useful, please consider giving it a star!**

---

**Built with 🏎️ using AI and Modern Web Technologies**