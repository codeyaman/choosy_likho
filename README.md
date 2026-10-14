# Social Atelier · AI Content Strategist Studio

> **"Written for humans. Art-directed by an engine."**  
> An elite, production-grade social media content strategist and publishing studio engineered for high-touch verticals: Real Estate, Jewellery, Luxury Fragrance, and FMCG/Food.

---

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2.6-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45-C5F74F?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)
[![Neon Database](https://img.shields.io/badge/Neon-Serverless_Postgres-00E599?style=for-the-badge&logo=postgresql)](https://neon.tech/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini_2.5-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-AI_SDK-6366F1?style=for-the-badge)](https://openrouter.ai/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth_Admin_SDK-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)

---

## 📑 Table of Contents

1. [Executive Summary](#-executive-summary)
2. [Key Capabilities & Innovations](#-key-capabilities--innovations)
3. [Industry Dialects & Content Pillars](#-industry-dialects--content-pillars)
4. [Architecture & Workflow](#-architecture--workflow)
5. [Database Schema & Data Models](#-database-schema--data-models)
6. [Tech Stack](#-tech-stack)
7. [Repository Structure](#-repository-structure)
8. [Getting Started & Local Development](#-getting-started--local-development)
9. [Environment Configuration](#-environment-configuration)
10. [Database Setup & Migrations](#-database-setup--migrations)
11. [API Reference](#-api-reference)
12. [Calendar & GenAI Integrations](#-calendar--genai-integrations)
13. [Deployment to Vercel](#-deployment-to-vercel)
14. [Contributing & License](#-contributing--license)

---

## 🎯 Executive Summary

Generic AI prompts produce generic social copy. **Social Atelier** replaces bland corporate filler with tailored, industry-native content strategies designed to convert discerning audiences.

Instead of outputting disconnected posts, Social Atelier acts as a boutique creative agency:
- It **ingests raw brand assets** (PDF pitch decks, Word docs, Excel product sheets, brand photos).
- It applies **mathematical PRNG rotation** to ensure balanced content pillars so the same angle never appears twice consecutively.
- It validates the brief against **Industry DNA** to prevent cross-industry hallucinations.
- It supplies **art-direction directives** that designers or text-to-image models (ChatGPT / Gemini / Midjourney) can execute immediately.
- It streamlines scheduling with **1-click Google Calendar sync** and universal **Apple/Outlook `.ics` calendar export**.

---

## 🚀 Key Capabilities & Innovations

### 1. Multi-Format Brand Asset Ingestion
Clients provide facts in inconsistent formats. Social Atelier includes a resilient parser pipeline:
- **PDF Documents** (`pdf-parse`): Extracts spec sheets, property brochures, and brand books.
- **Word Documents** (`mammoth`): Parses creative copy, founding stories, and PR releases.
- **Spreadsheets** (`xlsx`): Reads inventory catalogs, price sheets, and product specs.
- **Plain Text / CSV**: Ingests notes, bullets, and tables.
- **Brand Imagery**: Uploaded visual references pass to multimodal vision models to extract color palettes, textures, and moods.

### 2. Dual-Engine LLM Core with Strict JSON Schemas
- **Vercel AI SDK (`ai`)**: Drives structured generation using `generateObject` with Zod schema validation.
- **Google Gemini (`@ai-sdk/google`)**: Powers high-capacity document reasoning and vision analysis (Gemini 2.5 Flash / 1.5 Pro).
- **OpenRouter (`@ai-sdk/openai`)**: Fallback and alternative LLM routing (GPT-4o, Claude 3.5 Sonnet, Llama 3) for pure text generation.

### 3. Industry Alignment & Hallucination Guardrails
Before generating a single caption, the AI runs an industry validation check:
- If a user chooses *Real Estate* but supplies notes for *Fine Jewellery*, the engine flags the mismatch with an actionable error message prompting them to pick the correct vertical.

### 4. Non-Repeating Strategic Rotation Engine
- Uses deterministic seed-based RNG (`mulberry32`) to shuffle post angles.
- Dynamically allocates schedules across durations:
  - **1 Week Sprint** (3 posts): Core focus, drop, or blitz.
  - **2 Weeks Cadence** (6 posts): Balanced algorithmic pacing.
  - **1 Month Growth** (12 posts): Complete multichannel narrative.
- Enforces strict pillar rotation (`rotationFor`) so consecutive posts never repeat the same emotional or commercial trigger.

### 5. Instant Publishing & Calendar Sync
- **1-Click Google Calendar**: Adds post drafts, captions, visual notes, and hashtags as time-blocked calendar events.
- **Universal `.ics` Export**: Generates compliant RFC 5545 iCalendar files compatible with Apple Calendar, Outlook, and Notion.
- **Markdown Export**: Complete markdown export formatted with headers, metadata, and copy blocks.

### 6. Creative GenAI Image Prompt Bridge
- Every post includes dedicated **Visual Direction** crafted for art directors.
- Integrated **GenAI Button** translates the visual brief into an optimized image prompt, copies it to the clipboard, and opens the user's preferred tool (ChatGPT, Gemini, Midjourney, or custom endpoints).

### 7. Full Plan Lifecycle & Recycle Bin
- Authenticated users manage active briefs in a responsive dashboard.
- Soft-delete feature moves unwanted plans into a dedicated **Recycle Bin**.
- Restore or permanently purge briefs on demand.
- Anonymous preview visitors can claim generated briefs upon sign-in.

---

## 🏛️ Industry Dialects & Content Pillars

Social Atelier provides four purpose-built industry engines:

```
┌─────────────────┬───────────────────────────────────┬──────────────────────────────────────────────┐
│ Industry        │ Voice & Dialect                   │ Primary Strategic Pillars                    │
├─────────────────┼───────────────────────────────────┼──────────────────────────────────────────────┤
│ 🏢 Real Estate  │ Consultative Authority            │ • Location DNA & Neighborhood Heritage       │
│                 │ Architectural Prestige            │ • Architectural Spotlight                    │
│                 │ Capital Appreciation              │ • Capital Value & ROI Proof                  │
│                 │                                   │ • Lifestyle & Spatial Flow                   │
├─────────────────┼───────────────────────────────────┼──────────────────────────────────────────────┤
│ 💎 Jewellery    │ Poetic Storytelling               │ • Craft & Karat Pedigree                     │
│                 │ Intimate Heirloom                 │ • Romantic Milestones & Gifting              │
│                 │ Material Provenance               │ • Occasion & Silhouette Styling              │
│                 │                                   │ • Generational Emotional Value               │
├─────────────────┼───────────────────────────────────┼──────────────────────────────────────────────┤
│ 🌿 Perfume      │ Sensory Evocation                 │ • Note Pyramids (Top, Heart, Base)           │
│                 │ Invisible Sillage                 │ • Mood Projection & Atmosphere               │
│                 │ Identity & Memory                 │ • Private Fragrance Rituals                  │
│                 │                                   │ • Olfactory Signatures                       │
├─────────────────┼───────────────────────────────────┼──────────────────────────────────────────────┤
│ 🍲 Food / FMCG  │ Household Warmth                  │ • Sensory Cravings & Appetite Induction      │
│                 │ Appetite Induction                │ • Ingredient Integrity & Origin              │
│                 │ Table Traditions                  │ • Shared Table Rituals                       │
│                 │                                   │ • Quick-Serve Utility & Recipes              │
└─────────────────┴───────────────────────────────────┴──────────────────────────────────────────────┘
```

---

## 📐 Architecture & Workflow

```mermaid
flowchart TD
    User([User / Content Strategist]) -->|Uploads PDF, DOCX, XLSX, Notes| WebApp[Next.js 16 Web App]
    
    subgraph Client Experience
        WebApp --> Configurator[Interactive Brief Configurator]
        WebApp --> Dashboard[Briefs Dashboard & Recycle Bin]
        WebApp --> PlanView[Plan View & Art Direction Studio]
    end

    subgraph Auth Layer
        WebApp --> FirebaseAuth[Firebase Client Auth]
        FirebaseAuth -->|Session Cookie / ID Token| AuthSessionAPI["/api/auth/session"]
        AuthSessionAPI --> FirebaseAdmin[Firebase Admin SDK]
    end

    subgraph Core AI & Heuristics Engine
        Configurator -->|POST /api/plans| PlanAPI["API Route: /api/plans"]
        PlanAPI --> Parser[Document Parser Pipeline]
        Parser -->|Extracts raw text| GenEngine[Content Generation Engine]
        GenEngine --> PRNG[Deterministic Mulberry32 PRNG]
        GenEngine --> Rotator[Non-Repeating Pillar Rotator]
        GenEngine --> AISDK[Vercel AI SDK]
        AISDK -->|Schema Validated Prompts| Gemini[Google Gemini 2.5]
        AISDK -->|Fallback / Text Prompts| OpenRouter[OpenRouter / OpenAI]
    end

    subgraph Storage Layer
        PlanAPI -->|Persist Plans & Posts| Drizzle[Drizzle ORM]
        Drizzle --> NeonDB[(Neon Serverless PostgreSQL)]
    end

    subgraph Distribution & Production
        PlanView --> GCal[1-Click Google Calendar]
        PlanView --> ICS[RFC 5545 iCalendar .ics]
        PlanView --> GenAI[GenAI Image Bridge]
        PlanView --> MDExport[Markdown Export]
    end
```

---

## 🗄️ Database Schema & Data Models

Managed via **Drizzle ORM** with **PostgreSQL** on **Neon Serverless**:

### `plans` Table
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | Primary Key, `defaultRandom()` | Unique plan identifier |
| `industry` | `text` | NOT NULL | `real-estate`, `jewellery`, `perfume`, or `food` |
| `duration` | `text` | NOT NULL | `1w` (7 days), `2w` (14 days), `1m` (30 days) |
| `post_count` | `integer` | NOT NULL | Number of posts (`3`, `6`, `12`) |
| `brand_name` | `text` | Nullable | Client or brand title |
| `reference` | `text` | Nullable | Uploaded notes or extracted document corpus |
| `seed` | `integer` | NOT NULL | PRNG random seed for deterministic regeneration |
| `user_id` | `text` | Nullable | Associated Firebase UID (supports anonymous claiming) |
| `deleted_at` | `timestamp with tz` | Nullable | Soft-delete timestamp for the Recycle Bin |
| `created_at` | `timestamp with tz` | NOT NULL, `defaultNow()` | Plan creation timestamp |

### `posts` Table
| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `uuid` | Primary Key, `defaultRandom()` | Unique post identifier |
| `plan_id` | `uuid` | Foreign Key → `plans.id` (`CASCADE`) | Associated plan ID |
| `position` | `integer` | NOT NULL | Sequence order in calendar (`1` to `N`) |
| `iso_date` | `text` | NOT NULL | Scheduled calendar date (`YYYY-MM-DD`) |
| `day_label` | `text` | NOT NULL | Human-readable day label (`Mon, 18 Nov`) |
| `time_label` | `text` | NOT NULL | Optimized posting time (`10:30 AM`, `7:00 PM`) |
| `pillar` | `text` | NOT NULL | Pillar key (`spotlight`, `craft`, etc.) |
| `category` | `text` | NOT NULL | Editorial category display label |
| `caption` | `text` | NOT NULL | Hook-first copy, body narrative, and CTA |
| `visual_direction` | `text` | NOT NULL | Art direction prompt for photography or text-to-image AI |
| `hashtags` | `text[]` | NOT NULL | Array of 5–15 curated industry hashtags |

---

## 💻 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components, Route Handlers)
- **UI & State**: [React 19](https://react.dev/), [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with native PostCSS and scoped theme variables
- **Icons & Polish**: [Lucide React](https://lucide.dev/), [next-themes](https://github.com/pacocoursey/next-themes)
- **Database & ORM**: [Neon Serverless PostgreSQL](https://neon.tech/), [Drizzle ORM](https://orm.drizzle.team/), `pg`
- **AI Infrastructure**: [Vercel AI SDK](https://sdk.vercel.ai/), [Google Generative AI](https://ai.google.dev/), [OpenRouter](https://openrouter.ai/)
- **Document Extractors**: [pdf-parse](https://www.npmjs.com/package/pdf-parse), [mammoth](https://www.npmjs.com/package/mammoth) (DOCX), [xlsx](https://sheetjs.com/) (Excel)
- **Authentication**: [Firebase](https://firebase.google.com/) Client SDK & Firebase Admin SDK

---

## 📁 Repository Structure

```
├── .agents/                      # Agent & workspace customization skills
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/session/     # Firebase cookie-based session verification
│   │   │   ├── health/           # Healthcheck endpoint
│   │   │   └── plans/            # POST create plan, GET list plans
│   │   │       └── [id]/         # GET plan details, PATCH soft-delete/restore, DELETE purge
│   │   ├── dashboard/            # Authenticated user dashboard & brief management
│   │   ├── login/                # Firebase Authentication sign-in portal
│   │   ├── plan/[id]/            # Individual plan detail view, calendar & copy export
│   │   ├── globals.css           # Tailwind v4 theme scopes & custom CSS variables
│   │   ├── layout.tsx            # Root layout with theme provider
│   │   └── page.tsx              # Landing page & quick brief configurator
│   ├── components/
│   │   ├── chrome.tsx            # Global navigation header & footer
│   │   ├── configurator.tsx      # Interactive brief creation form with file upload
│   │   ├── copy-button.tsx       # Micro-animated copy to clipboard button
│   │   ├── dashboard/
│   │   │   ├── create-brief-studio.tsx # Advanced studio for drafting briefs in-dashboard
│   │   │   └── dashboard-client.tsx    # Interactive dashboard with tabs, filters, & recycle bin
│   │   ├── gen-ai-button.tsx     # 1-click bridge to ChatGPT / Gemini / Midjourney
│   │   ├── plan-actions.tsx      # Copy all, download markdown, regenerate actions
│   │   ├── reveal.tsx            # Viewport scroll animation observer
│   │   ├── theme-provider.tsx    # next-themes provider wrapper
│   │   └── theme-toggle.tsx      # Light/dark mode switcher
│   ├── db/
│   │   ├── index.ts              # Neon PostgreSQL client initialization
│   │   └── schema.ts             # Drizzle ORM table schemas & TypeScript types
│   └── lib/
│       ├── auth.ts               # Server-side user session resolver
│       ├── calendar.ts           # Google Calendar URL builder & RFC 5545 .ics generator
│       ├── parsers.ts            # Multiformat document text extraction (PDF, DOCX, XLSX, TXT)
│       ├── engine/
│       │   ├── generate.ts       # AI orchestration with Zod schema & industry validation
│       │   ├── index.ts          # PRNG algorithms, date math, pillar rotation, markdown builder
│       │   ├── types.ts          # Core domain TypeScript interfaces
│       │   └── industries/       # Curated pillars, vocabulary, and tones
│       │       ├── food.ts
│       │       ├── jewellery.ts
│       │       ├── perfume.ts
│       │       └── real-estate.ts
│       └── firebase/
│           ├── client.ts         # Firebase Web SDK client initialization
│           └── server.ts         # Firebase Admin SDK server initialization
├── drizzle.config.ts             # Drizzle Kit migration configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Scripts and dependencies
└── tsconfig.json                 # TypeScript compiler options
```

---

## 🛠️ Getting Started & Local Development

### Prerequisites
- **Node.js**: `v20.x` or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **PostgreSQL Database**: Neon serverless database recommended
- **API Keys**: Google Gemini API key or OpenRouter API key, and a Firebase project

### 1. Clone & Install
```bash
git clone https://github.com/your-username/social-media-content-strategist.git
cd social-media-content-strategist
npm install
```

### 2. Configure Environment Variables
Copy `.env.local.example` or create a `.env.local` file:
```bash
cp .env.test .env.local
```
*(Review the [Environment Configuration](#-environment-configuration) section below for required keys).*

### 3. Push Database Schema
Push the Drizzle schema to your PostgreSQL database:
```bash
npm run db:push
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Configuration

Create a `.env.local` file in the project root:

```env
# Database (Neon Serverless PostgreSQL)
DATABASE_URL="postgresql://<user>:<password>@<host>/<dbname>?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://<user>:<password>@<direct-host>/<dbname>?sslmode=require"

# AI Model Providers
GEMINI_API_KEY="AIzaSy..."
GEMINI_MODEL="gemini-2.5-flash"

OPENROUTER_API_KEY="sk-or-v1-..."
OPENROUTER_MODEL="openai/gpt-4o"

# Firebase Client SDK (Authentication)
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-app-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-app.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef"

# Firebase Admin SDK (Server Session Verification)
FIREBASE_CLIENT_EMAIL="firebase-adminsdk@your-app.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD..."
```

---

## 🔄 Database Setup & Migrations

Drizzle Kit is configured in `drizzle.config.ts`.

- **Push Schema Changes directly**:
  ```bash
  npm run db:push
  ```
- **Launch Drizzle Studio GUI**:
  ```bash
  npm run db:studio
  ```
  Opens Drizzle Studio at [https://local.drizzle.studio](https://local.drizzle.studio) to visually inspect and edit records.

---

## 🌐 API Reference

### `POST /api/plans`
Generates a new social media plan and persists it with its associated posts.

**Content-Type**: `application/json` or `multipart/form-data` (when uploading reference files).

**Request Body**:
```json
{
  "industry": "real-estate",
  "duration": "2w",
  "postCount": 6,
  "brandName": "Mayfair Heritage Residences",
  "reference": "Penthouse collection featuring private terraces and panoramic skyline views."
}
```

**Success Response (200)**:
```json
{
  "id": "c1f7a28b-9e45-42f8-b3d9-6c3f3e27a901"
}
```

---

### `GET /api/plans/[id]`
Retrieves full details for a generated plan, including its ordered array of posts. Automatically claims the plan for the authenticated user if created anonymously.

**Success Response (200)**:
```json
{
  "plan": {
    "id": "c1f7a28b-9e45-42f8-b3d9-6c3f3e27a901",
    "industry": "jewellery",
    "duration": "1w",
    "postCount": 3,
    "brandName": "Aura Fine Gems",
    "createdAt": "2026-10-14T10:00:00.000Z"
  },
  "posts": [
    {
      "position": 1,
      "isoDate": "2026-10-15",
      "dayLabel": "Thu, 15 Oct",
      "timeLabel": "10:30 AM",
      "pillar": "spotlight",
      "category": "Craft & Karat",
      "caption": "Hand-set pavé diamonds reflecting morning light...",
      "visualDirection": "Macro cinematic focus on an 18k yellow gold signet ring resting on raw slate...",
      "hashtags": ["#FineJewellery", "#ArtisanGems", "#SolidGold", "#HeirloomRing"]
    }
  ]
}
```

---

### `PATCH /api/plans/[id]`
Soft-deletes a plan to the Recycle Bin or restores it.

**Request Body**:
```json
{ "action": "trash" }   // or { "action": "restore" }
```

---

### `DELETE /api/plans/[id]`
Permanently purges a brief and its cascaded posts from the database.

---

## 📅 Calendar & GenAI Integrations

### 1. Google Calendar Quick-Add
Social Atelier generates a dynamic URL using the Google Calendar event creation schema:
- Title format: `[Social Post] <Brand Name> - <Day Label>`
- Description contains the full post caption, art direction notes, hashtags, and a backlink to the atelier brief.
- Automatically computes timezone-adjusted 30-minute time slots based on the pillar's recommended posting hour.

### 2. Apple / Outlook `.ics` Sync
The studio generates RFC 5545-compliant iCalendar files in the browser:
- Encodes UID, UTC timestamps, summaries, multiline formatted captions, and visual briefs.
- Downloadable with one click and imports into Apple Calendar, Microsoft Outlook, and Google Calendar.

### 3. Visual Prompt Generation for Text-to-Image AI
Each generated post features a `GenAI` action dropdown:
- Automatically formats an optimized image prompt: `Create image <visualDirection>`
- Copies the prompt to the clipboard.
- Opens your generator of choice in a new tab:
  - **ChatGPT / DALL-E 3**
  - **Google Gemini**
  - **Custom Endpoints** (users can add Midjourney Web, Freepik, Ideogram, or local Stable Diffusion web UIs directly in localStorage).

---

## 🚀 Deployment to Vercel

Social Atelier is optimized for zero-config deployment on [Vercel](https://vercel.com):

1. **Push to GitHub**:
   ```bash
   git push origin main
   ```
2. **Import Project into Vercel**:
   - Framework preset: `Next.js`
   - Root directory: `./`
3. **Configure Environment Variables in Vercel Project Settings**:
   - Add `DATABASE_URL`, `DATABASE_URL_UNPOOLED`
   - Add `GEMINI_API_KEY`, `GEMINI_MODEL`
   - Add `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`
   - Add `NEXT_PUBLIC_FIREBASE_*` and `FIREBASE_*` credentials
4. **Deploy**:
   - Vercel automatically builds and optimizes the App Router routes and static assets.

---

## 📜 Available Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `next dev` | Starts local Next.js development server |
| `build` | `next build` | Compiles production bundle |
| `start` | `next start` | Starts production server |
| `lint` | `eslint .` | Runs ESLint checks |
| `typecheck` | `tsc --noEmit` | Validates TypeScript types across the project |
| `db:push` | `drizzle-kit push` | Synchronizes database schema with Neon PostgreSQL |
| `db:studio` | `drizzle-kit studio` | Opens Drizzle Studio database browser |

---

## 📄 License & Credits

Built with precision for content strategists, agencies, and luxury brands.  
Designed and maintained by **Social Atelier**.