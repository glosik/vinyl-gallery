# 🚀 Deployment Guide - Vinyl Gallery

## 📋 Overview

Your vinyl gallery has **two deployment options**:

1. **Manual Deployment** (Simple) - Deploy from `docs/` folder
2. **Automated Deployment** (Advanced) - GitHub Actions workflow

## 🎯 Option 1: Manual Deployment (Recommended)

This is the **simplest approach** using the `docs/` folder.

### Step 1: Configure GitHub Pages

1. **Go to your repository on GitHub**
2. **Click Settings** (top menu)
3. **Scroll down to "Pages"** (left sidebar)
4. **Configure Source:**
   - Source: **"Deploy from a branch"**
   - Branch: **`main`** (or `master`)
   - Folder: **`/docs`**
5. **Click Save**

### Step 2: Deploy Your Changes

**Option A: Use the deployment script (Recommended)**
```bash
# One command does everything!
npm run deploy-manual
# or
./deploy.sh
```

**Option B: Manual commands**
```bash
# 1. Build your project (copies src/ to docs/)
npm run build

# 2. Add all changes
git add .

# 3. Commit with a descriptive message
git commit -m "Add 90 test albums with value-based filtering"

# 4. Push to GitHub
git push origin main
```

### Step 3: Access Your Site

- **URL:** `https://yourusername.github.io/vinyl-gallery`
- **Deploy time:** 1-5 minutes after push
- **Status:** Check in Settings → Pages

---

## 🤖 Option 2: Automated Deployment (GitHub Actions)

This uses the workflow file you already have (`.github/workflows/deploy.yml`).

### How It Works

1. **Triggers:** Automatically on every push to `main`
2. **Process:** 
   - Installs dependencies
   - Runs `npm run build`
   - Deploys to `gh-pages` branch
3. **Result:** Site updates automatically

### Setup for GitHub Actions

1. **Configure GitHub Pages:**
   - Source: **"GitHub Actions"**
   - The workflow will handle the rest

2. **Deploy:**
   ```bash
   # Just commit and push - GitHub Actions does the rest!
   git add .
   git commit -m "Update gallery"
   git push origin main
   ```

3. **Monitor:**
   - Go to **Actions** tab in your repo
   - Watch the deployment progress
   - Check for any errors

---

## 📁 Current Project Structure

```
vinyl-gallery/
├── src/                    # 📝 Your source files (edit these)
│   ├── index.html
│   ├── album.html
│   ├── data/
│   │   ├── vinyl/
│   │   │   ├── 1980s.json (10 albums)
│   │   │   ├── 1990s.json (10 albums)
│   │   │   └── 2000s.json (10 albums)
│   │   ├── cd/
│   │   │   ├── 1980s.json (10 albums)
│   │   │   ├── 1990s.json (10 albums)
│   │   │   └── 2000s.json (10 albums)
│   │   └── cassette/
│   │       ├── 1980s.json (10 albums)
│   │       ├── 1990s.json (10 albums)
│   │       └── 2000s.json (10 albums)
│   └── images/
│       ├── vinyl/ (10 images)
│       ├── cd/ (10 images)
│       └── cassette/ (10 images)
├── docs/                   # 🚀 Built files (auto-generated)
├── .github/workflows/      # 🤖 GitHub Actions
└── package.json           # 📦 Dependencies & scripts
```

---

## 🔄 Development → Deployment Workflow

### Daily Development

```bash
# 1. Start development server
npm run dev

# 2. Edit files in src/
# 3. See changes live at http://localhost:3000
# 4. When ready to deploy:

npm run build    # Build src/ → docs/
git add .
git commit -m "Your changes"
git push
```

### Adding New Albums

```bash
# 1. Add album data to src/data/{format}/{decade}.json
# 2. Add corresponding image to src/images/{format}/
# 3. Build and deploy:

npm run build
git add .
git commit -m "Add new albums"
git push
```

---

## ⚡ Quick Commands Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with live reload |
| `npm run build` | Build src/ → docs/ for production |
| `npm run deploy` | Alias for build |
| `npm run deploy-manual` | **🚀 One-click deployment script** |
| `npm start` | Alias for dev |
| `./deploy.sh` | Direct deployment script execution |

---

## 🎯 Recommended Deployment Method

**For your use case, I recommend Option 1 (Manual Deployment):**

✅ **Pros:**
- Simple and reliable
- You control when deployments happen
- Easy to troubleshoot
- No GitHub Actions complexity

❌ **Cons:**
- Must remember to run `npm run build`
- Manual step before each deployment

---

## 🚨 Important Notes

### Before First Deployment

1. **Update package.json** with your repository URL:
   ```json
   {
     "homepage": "https://yourusername.github.io/vinyl-gallery"
   }
   ```

2. **Test locally first:**
   ```bash
   npm run build
   cd docs
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

### Image Naming

Your images **must** follow this pattern:
```
{slug(title)}_{slug(artist)}-{format}.jpg
```

Examples:
- `thriller_michael-jackson-vinyl.jpg`
- `nevermind_nirvana-cd.jpg`
- `purple-rain_prince-cassette.jpg`

### GitHub Pages Limitations

- **File size:** Max 100MB per file
- **Repository size:** Max 1GB
- **Bandwidth:** 100GB/month
- **Builds:** 10 per hour

---

## 🔧 Troubleshooting

### Site Not Loading
1. Check GitHub Pages settings
2. Verify `docs/` folder exists and has content
3. Check repository is public
4. Wait 5-10 minutes for propagation

### Images Not Showing
1. Verify image names match JSON data
2. Check file extensions (.jpg)
3. Ensure images are in correct folders

### Build Errors
```bash
# Clean and rebuild
rm -rf docs
npm run build
```

### GitHub Actions Failing
1. Check Actions tab for error logs
2. Verify package.json scripts work locally
3. Check node version compatibility

---

## 🎉 You're Ready!

Your vinyl gallery is now ready for deployment with:
- ✅ 90 test albums across all formats
- ✅ Value-based filtering (0-500)
- ✅ Responsive design
- ✅ Live reload development
- ✅ Professional build system

**Next step:** Choose your deployment method and push to GitHub! 🚀 