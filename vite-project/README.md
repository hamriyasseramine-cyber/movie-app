# 🎬 Movie App

> A sleek movie discovery app built with React + Vite, powered by the TMDB API.

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)
![TMDB](https://img.shields.io/badge/TMDB-API-01b4e4?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## ✨ Features

- 🔍 **Real-time search** with 500ms debounce
- ♾️ **Infinite scroll** — automatically loads more movies as you scroll
- 🎬 **Movie detail page** — synopsis, cast, trailer (YouTube embed), similar movies
- ⭐ **Favorites** — saved to localStorage via React Context
- 🏆 **Classement** — filter by genre, year, language, sort by rating/popularity/votes
- 🌙 **Dark mode** — toggle persisted across sessions
- 📱 **Fully responsive** — mobile-first with burger menu
- 💀 **Skeleton loaders** — smooth loading states for every card
- 🎞️ **Page transitions** — powered by Framer Motion

---

## 🛠️ Tech Stack

| Tool            | Purpose                                      |
| --------------- | -------------------------------------------- |
| React 18        | UI framework                                 |
| Vite            | Build tool & dev server                      |
| React Router v6 | Client-side routing                          |
| Framer Motion   | Page transitions & animations                |
| Context API     | Global state (favorites, theme)              |
| TMDB API        | Movie data (titles, posters, cast, trailers) |
| EmailJS         | Contact form in Support page                 |
| CSS3            | Custom design system with CSS variables      |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- A free [TMDB API key](https://developer.themoviedb.org/docs/getting-started)

### Installation

```bash
# Clone the repo
git clone https://github.com/hamriyasseramine-cyber/movie-app.git
cd movie-app

# Install dependencies
npm install

# Create your env file
cp .env.example .env
# Then add your TMDB API key to .env
```

### Environment Variables

Create a `.env` file at the root:

```env
VITE_API_KEY=your_tmdb_api_key_here
```

### Run locally

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Build for production

```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── MovieCard.jsx        # Clickable card with favorite button + score badge
│   ├── MovieCardSkeleton.jsx # Shimmer placeholder during loading
│   ├── NavBar.jsx           # Sticky nav with dark mode toggle + mobile menu
│   └── PageTransition.jsx   # Framer Motion wrapper
├── pages/
│   ├── Home.jsx             # Search + infinite scroll grid
│   ├── MovieDetail.jsx      # Full movie page (cast, trailer, similar)
│   ├── Classement.jsx       # Ranked movies with filters
│   ├── Favorites.jsx        # Saved movies
│   ├── Support.jsx          # Contact form via EmailJS
│   └── About.jsx            # Developer info + tech stack
├── contexts/
│   └── MovieContext.jsx     # Favorites state management
├── services/
│   └── api.js               # TMDB API calls
└── css/                     # One CSS file per component
```

---

## 🌐 Live Demo

> [movie-app-demo.vercel.app](https://movie-app-demo.vercel.app) _(replace with your Vercel link)_

---

## 📸 Screenshots

| Home                          | Movie Detail                  | Classement                       |
| ----------------------------- | ----------------------------- | -------------------------------- |
| Search + infinite scroll grid | Full page with trailer & cast | Filters by genre, year, language |

---

## 🤝 Contact

**Hamri Yasser Amine**

- GitHub: [@hamriyasseramine-cyber](https://github.com/hamriyasseramine-cyber)
- LinkedIn: [yasser-amine-hamri](https://www.linkedin.com/in/yasser-amine-hamri/)
- Email: hamriyasseramine@gmail.com

---

## 📄 License

MIT © 2025 Hamri Yasser Amine
