# 🎵 Vinyl Gallery

A lightweight, static website that showcases a personal vinyl, cassette, and CD collection using modular JSON files and predictably named images.

## 🚀 Features

- **📁 Modular JSON** - Organize albums by format (vinyl, CD, cassette) and decade
- **🖼️ Predictable naming** - Images follow `{title}_{artist}-{format}.jpg` pattern
- **⚡ Lazy loading** - Fast performance with 2,000+ items
- **🔄 Live reload** - Hot reloading during development
- **🌐 GitHub Pages** - Free hosting from `docs/` folder

## 🛠️ Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Getting Started

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd vinyl-gallery
   npm install
   ```

2. **Start development server with live reload:**
   ```bash
   npm run dev
   # Opens http://localhost:3000 with live reload
   ```

3. **Make changes in the `src/` folder:**
   - Edit `src/index.html`
   - Add albums to `src/data/{format}/{decade}.json`
   - Add images to `src/images/{format}/`

## 📁 Project Structure

```
vinyl-gallery/
├── src/                    # Source files (edit these)
│   ├── index.html
│   ├── data/
│   │   ├── vinyl/
│   │   │   ├── 1980s.json
│   │   │   └── 1990s.json
│   │   ├── cd/
│   │   └── cassette/
│   └── images/
│       ├── vinyl/
│       ├── cd/
│       └── cassette/
├── docs/                   # Built files (auto-generated)
└── package.json
```

## 🖼️ Image Naming Convention

Images must follow this exact pattern:
```
{slug(title)}_{slug(artist)}-{format}.jpg
```

**Examples:**
- `thriller_michael-jackson-vinyl.jpg`
- `like-a-virgin_madonna-vinyl.jpg`
- `the-marshall-mathers-lp_eminem-cd.jpg`

The `slug()` function converts text to lowercase and replaces non-alphanumeric characters with hyphens.

## 📝 Adding New Albums

1. **Add to JSON file:**
   ```json
   {
     "title": "Album Name",
     "artist": "Artist Name",
     "year": "1985",
     "genre": "Rock" // optional
   }
   ```

2. **Add corresponding image:**
   - Name: `album-name_artist-name-vinyl.jpg`
   - Location: `src/images/vinyl/`

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## 🚀 Deployment

### GitHub Pages Setup

1. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: "Deploy from a branch"
   - Branch: `main` or `master`
   - Folder: `/docs`

2. **Deploy changes:**
   ```bash
   npm run deploy  # Builds src/ → docs/
   git add .
   git commit -m "Update gallery"
   git push
   ```

### Available Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Copy src/ to docs/
- `npm run deploy` - Clean and build for production
- `npm start` - Alias for `npm run dev`

## 🎨 Customization

The gallery supports enhanced JSON with optional fields:

```json
{
  "title": "Album Name",
  "artist": "Artist Name",
  "year": "1985",
  "genre": "Rock",
  "label": "Record Label",
  "image": "custom-filename.jpg"  // Override default naming
}
```

## 📱 Live Demo

Visit your GitHub Pages URL: `https://yourusername.github.io/vinyl-gallery`

---

**Tech Stack:** Vanilla HTML/CSS/JS • GitHub Pages • Live Server
