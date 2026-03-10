# Livoice — Project Overview

Livoice is a **call intelligence platform** that ingests video/audio content from external sources (primarily YouTube channels), transcribes them, and uses AI to extract structured intelligence: who spoke, who was mentioned, what entities and topics appeared, how they relate to each other, and what sentiment/emotion was expressed. Users can then explore this data and have AI-powered conversations grounded in the transcript content.

---

## Architecture

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   livoice-web    │────▶│   livoice-api    │────▶│    PostgreSQL    │
│  (React SPA)     │ GQL │  (Keystone 6)    │     │   (pgvector)     │
└──────────────────┘     └──────┬───────────┘     └──────────────────┘
                                │
                                │ shared code
                                ▼
                         ┌──────────────────┐     ┌──────────────────┐
                         │ livoice-workers  │────▶│   Redis / Bull   │
                         │ (background jobs)│     │   (job queues)   │
                         └──────────────────┘     └──────────────────┘
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
              ┌──────────┐ ┌────────┐ ┌──────────┐
              │  OpenAI  │ │ yt-dlp │ │youtubei.js│
              │ (GPT/emb)│ │(subs)  │ │(listing) │
              └──────────┘ └────────┘ └──────────┘
```

### Packages

| Package | Role |
|---------|------|
| `packages/livoice-api` | Keystone 6 GraphQL API, database schemas, analysis services |
| `packages/livoice-web` | React frontend (Vite, Tailwind, Apollo Client) |
| `packages/livoice-workers` | Background processing: import, analysis, embedding |

### External services

| Service | Purpose |
|---------|---------|
| **OpenAI** (`gpt-4o-mini`) | Speaker diarization, actor extraction, mention attribution, chat |
| **OpenAI** (`text-embedding-3-small`) | Segment embedding for vector search (1536 dimensions) |
| **yt-dlp** | Download YouTube subtitles (SRT) and video metadata |
| **youtubei.js** (Innertube) | List videos from YouTube channels without official API keys |
| **Cloudflare Workers proxy** | Proxied YouTube requests with rate limiting and User-Agent rotation |
| **PostgreSQL + pgvector** | Relational storage with vector similarity search |
| **Redis + BullMQ** | Job queue for source imports |
| **ConfigCat** | Feature flags for worker configuration |

---

## Database Entities

### Entity Relationship Diagram

```
Organization
├── User[]
├── Project[]
├── Source[]
├── Transcript[]
└── Chat[]

Source ──────────────── Transcript[]
  │                        │
  │ speakerActors[]        │ speakerActors[]
  │                        │
  └──────── Actor ─────────┘
              │
              ├── ActorMention[] ──── TranscriptSegment
              │                            │
              │                            └── belongs to Transcript
              │
              └── ActorLink[] (fromActor ↔ toActor)

Project ─── Source[] (many-to-many)
    │
    └── Chat[] ── ChatMessage[]
                      │
                      └── ChatConfig
```

### Core Entities

#### Organization

Multi-tenant root. All data is scoped to an organization.

| Field | Description |
|-------|-------------|
| `name` | Organization name |
| `autojoinDomains` | Email domains that auto-provision users |

#### User

| Field | Description |
|-------|-------------|
| `email` | Login email (Google OAuth) |
| `firstName`, `lastName`, `displayName` | Identity |
| `role` | `user`, `org_admin`, `org_owner`, `god` |
| `org` | Belongs to one Organization |
| `isActive` | Soft-delete / deactivation flag |

#### Project

A logical grouping of Sources for a specific analysis purpose (e.g. "Competitor Analysis", "Industry Trends").

| Field | Description |
|-------|-------------|
| `name`, `description` | Identity |
| `org` | Belongs to one Organization |
| `sources` | Many-to-many with Source |

#### Source

An external content source (currently only YouTube channels). Represents a channel whose videos are periodically imported.

| Field | Description |
|-------|-------------|
| `type` | `youtube_channel` (future: `podcast_feed`, `vimeo_channel`) |
| `name`, `url`, `externalId` | Channel identity |
| `importStatus` | `idle` / `importing` / `completed` / `failed` |
| `importCronExpression` | Cron schedule for automatic re-import |
| `importHistory` | JSON log of past import runs |
| `speakerActors` | Actors known to speak on this source (e.g. the channel host) |
| `org` | Belongs to one Organization |

Virtual fields expose real-time progress: `transcriptImportProgress`, `transcriptAnalysisProgress`, `transcriptEmbeddingProgress`, `overallProgress`.

#### Transcript

One video/episode from a Source. Goes through a multi-stage processing pipeline.

| Field | Description |
|-------|-------------|
| `title`, `description`, `sourceUrl` | Video metadata |
| `externalId` | YouTube video ID |
| `publishedAt`, `duration`, `thumbnailUrl` | Video metadata |
| `chapters` | JSON array of chapter markers `{ title, startMs, endMs }` |
| `rawSrt` | Raw SRT subtitle text |
| `importStatus` | `pending` → `fetching` → `completed` / `failed` / `skipped` |
| `analysisStatus` | `pending` → `processing` → `completed` / `failed` / `skipped` |
| `embeddingStatus` | `pending` → `processing` → `completed` / `failed` |
| `speakerActors` | Actors identified as speakers in this transcript |
| `source` | Belongs to one Source |
| `org` | Belongs to one Organization |

#### TranscriptSegment

A parsed, sentence-merged chunk of a transcript. The atomic unit for search and citation.

| Field | Description |
|-------|-------------|
| `index` | Ordering position within the transcript |
| `startMs`, `endMs`, `durationMs` | Timestamp range in milliseconds |
| `text` | The segment content |
| `speakerActor` | Who is speaking in this segment (Actor reference) |
| `isMetadata` | Whether this is a metadata line (e.g. chapter marker), not spoken content |
| `embedding` | 1536-dimension vector (`pgvector`) for semantic search |
| `transcript` | Belongs to one Transcript |
| `source` | Denormalized Source reference for efficient vector search filtering |

#### Actor

A named entity extracted from transcripts. Represents people, companies, products, topics, and other entities that appear across content.

| Field | Description |
|-------|-------------|
| `name` | Primary name |
| `type` | `person`, `organization`, `product`, `event`, `topic`, `location`, `brand`, `book`, `other` |
| `description` | AI-generated description of the actor |
| `aliases` | JSON array of alternative names/spellings |
| `externalIds` | JSON map of external identifiers (e.g. YouTube channel ID) |
| `metadata` | Arbitrary JSON metadata |
| `imageUrl` | Avatar/logo URL |
| `mentions` | All ActorMention records for this actor |
| `relatesTo` / `relatedFrom` | ActorLink connections to other actors |
| `speakerSources` | Sources where this actor is a known speaker |
| `speakerTranscripts` | Transcripts where this actor was a speaker |

#### ActorMention

Records each occurrence of an Actor within a specific transcript segment. Created during AI analysis.

| Field | Description |
|-------|-------------|
| `actor` | The Actor being mentioned |
| `segment` | The specific TranscriptSegment |
| `transcript` | The parent Transcript |
| `source` | The parent Source |
| `mentionType` | `speaker`, `mentioned`, `host`, `guest`, `sponsor`, `channel_owner`, `topic` |
| `sentiment` | `positive`, `negative`, `neutral` |
| `emotion` | `neutral`, `happy`, `excited`, `stressed`, `frustrated`, `angry`, `sad`, `confident`, `uncertain` |
| `confidence` | 0.0–1.0 confidence score |
| `detectionSource` | `ai` or `youtube` |
| `verified` | Manual verification flag |

#### ActorLink

A directional relationship between two Actors, extracted by AI or derived from metadata.

| Field | Description |
|-------|-------------|
| `fromActor` → `toActor` | The two connected Actors |
| `linkType` | Relationship type (see list below) |
| `role` | Optional role description |
| `metadata` | Arbitrary JSON |
| `confidence` | 0.0–1.0 confidence score |
| `detectionSource` | `ai` or `youtube` |
| `verified` | Manual verification flag |

**Link types** (seed list, AI can create new ones):
`employment`, `former_employment`, `founder`, `co_founder`, `board_member`, `advisor`, `consultant`, `mentor`, `mentee`, `investor`, `investee`, `competitor`, `partner`, `customer`, `supplier`, `acquirer`, `acquired_by`, `parent`, `subsidiary`, `licensee`, `licensor`, `distributor`, `franchisee`, `family`, `friend`, `colleague`, `classmate`, `spokesperson`, `endorser`, `ambassador`, `interviewer`, `interviewee`, `co_host`, `affiliated`

#### Chat, ChatConfig, ChatMessage

The conversational AI system. Users chat about a Project's content.

| Entity | Description |
|--------|-------------|
| `ChatConfig` | Reusable config: system prompt, OpenAI model settings, token budgets |
| `Chat` | A conversation session tied to a User + Project, with a config snapshot |
| `ChatMessage` | Individual message (role: `user` or `assistant`), with optional `debugData` |

---

## Processing Pipeline

### Overview

```
YouTube Channel URL
        │
        ▼
  ┌─────────────┐
  │ 1. DISCOVER  │  List all videos from channel
  │   (Source    │  via youtubei.js / Innertube
  │    Import)   │
  └──────┬──────┘
         │ Creates Transcript records (importStatus: pending)
         ▼
  ┌─────────────┐
  │ 2. IMPORT    │  For each pending Transcript:
  │  (Transcript │  - Download SRT subtitles via yt-dlp
  │   Import)    │  - Fetch metadata (description, tags, chapters)
  └──────┬──────┘  - Create topic actors from YouTube tags
         │ rawSrt + metadata stored; importStatus: completed
         ▼
  ┌─────────────┐
  │ 3. ANALYZE   │  Multi-pass AI analysis:
  │  (Transcript │  a) Parse SRT → segments
  │   Analysis)  │  b) Speaker diarization (LLM)
  └──────┬──────┘  c) Actor extraction (LLM)
         │         d) Mention attribution (LLM)
         │ Segments, Actors, Mentions, Links stored
         ▼
  ┌─────────────┐
  │ 4. EMBED     │  Generate vector embeddings for each segment
  │  (Embedding) │  via OpenAI text-embedding-3-small
  └──────┬──────┘  Stored in pgvector column
         │
         ▼
    Ready for search and chat
```

### Step 1: Source Discovery

Triggered by: cron schedule, manual trigger, or Source creation.

1. Resolve YouTube channel URL → channel ID
2. List all videos from the channel using `youtubei.js`
3. For each new video (not yet in DB), create a `Transcript` record with `importStatus: 'pending'`
4. Requests are proxied through a Cloudflare Worker with random delays (600–1800ms) and rotating User-Agents to avoid rate limiting

### Step 2: Transcript Import

Worker polls every 5 seconds for transcripts with `importStatus: 'pending'` (max 3 attempts).

1. Set status to `fetching`
2. Download auto-generated English subtitles (SRT format) via `yt-dlp`
3. Fetch video metadata: description, tags, category, chapters, publish date
4. Store `rawSrt`, metadata on the Transcript record
5. Create **topic Actors** from YouTube tags and category (with `detectionSource: 'youtube'`, `mentionType: 'topic'`)
6. Set `importStatus: 'completed'`, `analysisStatus: 'pending'`

### Step 3: Transcript Analysis

Worker polls for transcripts with `analysisStatus: 'pending'` and `importStatus: 'completed'`.

#### 3a. SRT Parsing

Raw SRT is parsed into segments using `srt-parser-2`, then intelligently merged:
- Speaker markers are detected from patterns like `> Name:` or `Name: text`
- Segments are merged by sentence boundaries (flush on speaker change, metadata lines, gaps > 1.5s, > 1000 chars, or > 90s duration)
- Output: `ParsedSegment[]` with `{ index, startMs, endMs, text, speaker, isMetadata }`

#### 3b. Speaker Diarization (LLM)

Two-pass process using `gpt-4o-mini`:

**Pass 1 — Metadata extraction**: Analyze the video title, channel name, and description to determine content type and likely speakers.

**Pass 2 — Segment assignment**: Process segments in batches of 100 (with 5-segment overlap for context). The LLM assigns a speaker name to each segment based on context clues, voice patterns, and the known speaker list. Output includes speaker names with roles (`host`, `guest`, `interviewer`, `panelist`, `unknown`).

After diarization, Actor records are created or matched for each unique speaker, and TranscriptSegment records are stored with their `speakerActor` reference.

#### 3c. Actor Extraction (LLM)

A single LLM call processes the full transcript text to extract:

- **Actors**: Named entities with type, description, and aliases. Types: `person`, `organization`, `product`, `event`, `topic`, `location`, `brand`, `book`, `other`
- **Relationships**: Connections between actors with link type, role, and confidence score

Actors are deduplicated against existing DB records by name and aliases before storage. ActorLink records are created for each relationship.

#### 3d. Mention Attribution (LLM)

Segments are processed in batches of 40. For each segment, the LLM identifies:

- Which actors appear in the segment
- The mention type: `speaker`, `mentioned`, `host`, `guest`, `sponsor`, `channel_owner`, `topic`
- For speakers: emotion (`neutral`, `happy`, `excited`, `stressed`, `frustrated`, `angry`, `sad`, `confident`, `uncertain`)
- Overall sentiment: `positive`, `negative`, `neutral`
- Confidence score

Results are stored as `ActorMention` records. When a mention is of type `speaker`, the corresponding `TranscriptSegment.speakerActor` is also updated.

### Step 4: Embedding Generation

Worker polls for segments where `embedding IS NULL` and the parent transcript has `importStatus: 'completed'` and `analysisStatus: 'completed'`.

- Segments are processed in batches of up to 500
- Each segment's `text` is embedded using OpenAI `text-embedding-3-small` (1536 dimensions)
- Embeddings are stored in a `pgvector` column on `TranscriptSegment`
- When all segments of a transcript are embedded, `embeddingStatus` is set to `completed`
- Rate limited to 200k tokens/minute via Bottleneck

---

## Chat System

The chat system allows users to ask questions about a Project's content, grounded in the actual transcript segments.

### Flow

1. User sends a message in the context of a Project
2. The user's question is embedded using the same embedding model
3. **Vector search**: cosine similarity search against all TranscriptSegment embeddings belonging to the project's sources
4. Top matching segments are selected within a token budget (default: 4000 tokens, max 30 segments)
5. Segments are formatted with metadata: `[Date | "Title"] Speaker (HH:MM:SS): text [Mentioned: actor1, actor2]`
6. A system prompt is assembled with placeholders replaced: `{projectName}`, `{sourceNames}`, `{transcriptTitles}`, `{actorsSummary}`, `{speakersSummary}`, `{totalTranscripts}`
7. Chat history is included within a separate token budget (default: 4000 tokens)
8. OpenAI generates a response
9. Both user and assistant messages are persisted with debug data (segments used, token counts, timing)

### Configuration

Each chat session uses a `ChatConfig` that controls:
- System prompt template
- OpenAI model, temperature, max output tokens
- Context window limits (max input tokens, reserved tokens)
- Segment retrieval limits (token budget, max count)
- History token budget

---

## Worker Orchestration

All background processing runs in `livoice-workers`, a single Node.js process with multiple concurrent loops:

| Worker | Interval | Responsibility |
|--------|----------|----------------|
| **Scheduler** | 60s | Check cron expressions on Sources, enqueue import jobs |
| **Source Importer** | BullMQ (concurrency: 3) | List videos from YouTube channel, create Transcript records |
| **Transcript Importer** | 5s polling | Download SRT + metadata for pending transcripts |
| **Analyzer** | 5s polling | Run multi-pass AI analysis on imported transcripts |
| **Embedder** | 5s polling | Generate vector embeddings for analyzed segments |

Each step in the pipeline advances a status field, creating a natural queue: `pending` → `processing` → `completed` / `failed`. Workers pick up items in the next pending state.

---

## Access Control

| Role | Scope |
|------|-------|
| `user` | Read own org's data |
| `org_admin` | Manage own org's data (CRUD sources, projects, users) |
| `org_owner` | Full org management including settings |
| `god` | Cross-org access, system administration, Actor/ActorLink management |

All data is org-scoped via Keystone access control filters. God users bypass org filtering and see all data globally.

---

## Frontend (livoice-web)

React SPA with:
- **Vite** build tool
- **Tailwind CSS v4** styling
- **Apollo Client** for GraphQL
- **React Router v7** routing
- **react-hook-form + zod** forms
- **i18next** internationalization
- **GraphQL Codegen** for typed queries/hooks

### Key pages

| Page | Description |
|------|-------------|
| Dashboard | Landing page |
| Projects | CRUD projects, assign sources |
| Sources | Connect YouTube channels, monitor import progress |
| Transcripts | View transcript timelines with speaker segments |
| Chat | AI-powered Q&A grounded in project transcripts |
| Users | User management (admin) |
| Actor Network | Force-directed graph visualization of actors and their connections (god-only) |
