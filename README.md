# Barikoi Location Finder

A Location Finder web application built with Next.js as part of the Barikoi Frontend Engineer assignment.

### Live: [https://barikoi-interview-task.vercel.app/](https://barikoi-interview-task.vercel.app/)

---

## Features

- Search locations using Barikoi API
- View selected location on interactive map
- Smooth map fly-to animation on selection
- Debounced search for better performance
- State management using Redux Toolkit

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Redux Toolkit + React Redux
- Tailwind CSS
- react-bkoi-gl (Map)
- barikoiapis (Search API)

---

## Setup Instructions

```bash
git clone https://github.com/shahinsamiur/barikoi_interview_task.git
cd barikoi_interview_task
npm install
npm run dev
```

Open: http://localhost:3000

---

## Environment Variables

Create a `.env.local` file:

```env
# Server-side key (secure)
BARIKOI_API_KEY=your_server_key

# Public key for map (must be domain restricted)
NEXT_PUBLIC_BARIKOI_API_KEY=your_public_key
```

---

## API Key Security

- The **search API key (`BARIKOI_API_KEY`) is used only on the server**
- The client never directly exposes or calls APIs with the private key
- The map requires a **public key (`NEXT_PUBLIC_BARIKOI_API_KEY`)**, which is:
  - restricted by domain
  - safe for frontend usage

### Important Note

A proxy-based approach was initially considered to fully hide the API key, but:

- `react-bkoi-gl` expects direct access to Barikoi map services
- Proxying tiles caused parsing issues (`Unimplemented type: 3`)
- It introduced unnecessary complexity

Therefore, a **restricted public key approach** was chosen (industry standard)

---

## Project Structure

```
src/
├─ app/
│  ├─ api/
│  │  └─ search/        # Server-side API for secure search
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/          # UI components (Map, Search, Cards)
├─ hooks/               # Custom hooks (debounce, search logic)
├─ state/               # Redux store & slices
├─ styles/              # Global styles
├─ types/               # TypeScript types
├─ utils/               # Utility components/functions
```

---

# Q1 — What trade-offs did you consciously make?

### 1. Avoided proxy-based map solution

Initially, I tried implementing a backend proxy to fully hide API keys.

However:

- It caused vector tile parsing errors (`Unimplemented type: 3`)
- It conflicted with `react-bkoi-gl` expectations
- It increased complexity significantly

I chose a simpler and stable approach using a restricted public key.

---

### 2. Focused on core features over advanced map functionality

I prioritized:

- search → select → map flow

Instead of:

- clustering
- route drawing
- advanced overlays

This ensured a stable and complete user experience within time constraints.

---

### 3. Minimal UI complexity with responsive design

I avoided over-designing UI and focused on:

- clean layout
- responsiveness (mobile/tablet/desktop)

This improves usability without adding unnecessary complexity.

---

### 4. Limited test coverage

Due to time constraints:

- I focused on working functionality and clean code
- Did not implement automated tests

Testing would be added in a production scenario.

---

# Q2 — If this app needed to scale, what would you refactor?

### 1. Introduce data-fetching layer (React Query / SWR)

Currently:

- manual API calls via hooks

Future:

- caching
- request deduplication
- background revalidation

Improves performance and scalability.

---

### 2. Normalize Redux state

Current:

- simple array-based state

Future:

- use `createEntityAdapter`
- normalized structure (id-based)

Better performance for large datasets.

---

### 3. Feature-based architecture

Refactor into:

```
features/
├─ search/
├─ map/
├─ location/
```

Each feature would include:

- components
- hooks
- slice
- API logic

Improves maintainability and scalability.

---

### 4. Add proper testing

- Integration tests (API + Redux flow)
- Component tests (search, map interaction)

Prevents regressions in larger applications.

---

### 5. Performance optimization

- Debounce + throttle improvements
- Virtualized list for large results
- Lazy loading components

---

## Final Thoughts

This project focuses on:

- clean architecture
- practical decision-making
- balancing complexity vs stability

The goal was to build a **reliable, maintainable, and user-friendly application** rather than over-engineering solutions.

---
