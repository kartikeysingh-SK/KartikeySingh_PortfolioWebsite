# Personal Portfolio Website — Kartikey Singh

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub Pages Deployment](https://img.shields.io/badge/Deployed-GitHub%20Pages-success.svg)](https://kartikeysingh-sk.github.io/KartikeySingh_PortfolioWebsite/)
[![Subject](https://img.shields.io/badge/Subject-IT4048%20Git%20%26%20GitHub-blueviolet.svg)](#student-information)

A professional, modern, responsive personal developer portfolio website designed, implemented, and deployed as an academic mini-project for **IT4048: Version Control with Git and GitHub**.

Built with semantic **HTML5**, modern **CSS3** design tokens (with Dark and Light mode support, glassmorphism, and responsive CSS Grid/Flexbox), and vanilla **JavaScript (ES6+)** with zero bloated third-party framework dependencies.

---

## 👨‍🎓 Student & Academic Information

- **Student Name:** Kartikey Singh
- **Enrollment Number:** 202503103510392
- **Institute:** Asha M. Tarsadia Institute of Computer Science and Technology (AMTICS)
- **Department:** Computer Science and Engineering
- **Subject Code:** IT4048
- **Subject Name:** Version Control with Git and GitHub
- **Project Type:** Academic Mini-Project
- **Submission Deadline:** 24 October 2026
- **Repository Name:** `KartikeySingh_PortfolioWebsite`
- **GitHub Profile:** [https://github.com/kartikeysingh-SK](https://github.com/kartikeysingh-SK)
- **Verified Repository:** [https://github.com/kartikeysingh-SK/KartikeySingh_PortfolioWebsite](https://github.com/kartikeysingh-SK/KartikeySingh_PortfolioWebsite)
- **Live GitHub Pages URL:** [https://kartikeysingh-sk.github.io/KartikeySingh_PortfolioWebsite/](https://kartikeysingh-sk.github.io/KartikeySingh_PortfolioWebsite/)
- **Submission Upload Drive:** [Google Drive Submission Folder](https://drive.google.com/drive/folders/122W5B3tNqc7r6aJS-tIkOIpjNgjHJ_dj?usp=sharing)

---

## 🌟 Key Features

1. **Rich Aesthetics & Typography:**
   - Dark mode default with sleek electric blue (`#3b82f6`) and violet (`#8b5cf6`) accents.
   - Clean, readable Google Fonts typography (`Plus Jakarta Sans` and `JetBrains Mono`).
   - Restrained glassmorphic cards and subtle hover micro-interactions.

2. **Light / Dark Mode Switcher:**
   - One-click instant theme toggle.
   - User preference automatically persisted in `localStorage`.
   - Accessible icons and high-contrast color ratios in both modes.

3. **100% Mobile-First Responsive Design:**
   - Fluid responsive layouts across mobile (375px/390px), tablet (768px), laptop, and widescreen (1400px+).
   - Animated mobile navigation hamburger drawer with backdrop overlay.

4. **Featured Technical Projects Showcase:**
   - Interactive category filter tabs (**All**, **Full-Stack**, **Frontend & Git**, **Academic Prototype**).
   - **Real-Time Resource Allocation Engine (RTRAE)** — Full-stack PHP/MySQL/Vercel project with linked repo.
   - **Smart Grocery Shopkeeper Management System** — Node.js/Express Udhar & ledger management project.
   - **Personal Portfolio Website** — Current IT4048 semantic HTML5/CSS3/JS website.
   - **Parcel Transport Management System (PTMS)** — Logistics workflow prototype.
   - Interactive project architecture modals with key highlights and tech tags.

5. **IT4048 Version Control Spotlight:**
   - Dedicated workflow timeline highlighting Git initialization, semantic commit conventions, remote sync, and GitHub Pages static hosting.

6. **Curriculum Vitae / Résumé Download:**
   - Direct download and in-browser preview of `assets/resume/Kartikey_Singh_Resume.pdf`.

7. **Validated Contact Form with Static Hosting Fallback:**
   - Client-side validation for Name, Email, and Message.
   - Safe `mailto:` redirection fallback specifically designed for serverless static GitHub Pages hosting.
   - 1-click clipboard email copy button for `25amtics392@gmail.com`.

---

## 🛠️ Technologies Applied

- **Markup:** HTML5 (Semantic elements: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **Styles:** CSS3 (CSS Custom Properties, Flexbox, CSS Grid, Glassmorphism, Print Media)
- **Scripting:** Vanilla JavaScript (ES6+, IntersectionObserver, DOM Events, Clipboard API)
- **Version Control:** Git CLI (v2.55+)
- **Hosting & CI/CD:** GitHub & GitHub Pages

---

## 📁 Repository Directory Structure

```text
KartikeySingh_PortfolioWebsite/
├── index.html                      # Semantic single-page web document
├── README.md                       # Academic project documentation (this file)
├── .gitignore                      # Git exclusion rules for OS and build caches
├── assets/
│   ├── css/
│   │   └── style.css               # Central stylesheet (design tokens & media queries)
│   ├── js/
│   │   └── script.js               # Client controller (theming, filters, modal, validation)
│   ├── images/
│   │   ├── screenshot_hero_desktop.png # Genuine desktop screenshot
│   │   ├── screenshot_fullpage.png     # Full-page visual capture
│   │   ├── screenshot_light_mode.png   # Light mode capture
│   │   └── screenshot_mobile.png       # Mobile layout capture
│   └── resume/
│       ├── resume_template.html    # High-resolution print template
│       └── Kartikey_Singh_Resume.pdf# Downloadable vector PDF résumé
└── report/
    ├── project_report_source.html  # Academic report source document
    ├── project-report.pdf          # Academic project report PDF
    └── GitHub_202503103510392_Kartikey_Singh.pdf # Official submission report
```

---

## 🚀 Local Setup & Preview Instructions

Because this website is completely static, no heavy build tools, compilers, or server runtimes are required.

### Option 1: Open Directly in Browser
Double-click `index.html` or right-click &rarr; *Open with* &rarr; *Google Chrome* / *Microsoft Edge* / *Firefox*.

### Option 2: Run with a Local Static Server (Recommended)
Using Python or Node.js:

```bash
# Using Node.js (npx)
npx serve .

# Or using Node built-in HTTP server:
node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let f=req.url.split('?')[0];if(f==='/')f='/index.html';let p=path.join(process.cwd(),f);if(fs.existsSync(p)&&fs.statSync(p).isFile()){res.writeHead(200);fs.createReadStream(p).pipe(res);}else{res.writeHead(404);res.end('Not found');}}).listen(8080,()=>console.log('Running at http://localhost:8080'));"
```

Then open `http://localhost:8080` in your browser.

---

## 🌿 Git & GitHub Submission Workflow

To push updates or publish changes to GitHub:

```bash
# 1. Initialize Git (if starting in a new clone)
git init
git branch -M main

# 2. Add remote repository
git remote add origin https://github.com/kartikeysingh-SK/KartikeySingh_PortfolioWebsite.git

# 3. Stage all project files
git add .

# 4. Create a semantic commit
git commit -m "feat(submission): complete portfolio website, resume, and academic report"

# 5. Push to GitHub remote main branch
git push -u origin main
```

### GitHub Pages Activation
1. Navigate to the GitHub repository: `https://github.com/kartikeysingh-SK/KartikeySingh_PortfolioWebsite`
2. Click **Settings** &rarr; **Pages** (under Code and automation).
3. Under **Branch**, select `main` and set the folder to `/ (root)`.
4. Click **Save**.
5. GitHub Pages will build and publish the live site at:
   `https://kartikeysingh-sk.github.io/KartikeySingh_PortfolioWebsite/`

---

## 📄 Academic Project Report & Résumé

- **Submission Project Report:** [`report/GitHub_202503103510392_Kartikey_Singh.pdf`](report/GitHub_202503103510392_Kartikey_Singh.pdf)
- **Downloadable Résumé:** [`assets/resume/Kartikey_Singh_Resume.pdf`](assets/resume/Kartikey_Singh_Resume.pdf)

---

## ⚖️ License & Attribution

Developed by **Kartikey Singh** (Enrollment: `202503103510392`) as part of the academic curriculum for **IT4048: Version Control with Git and GitHub** at Asha M. Tarsadia Institute of Computer Science and Technology.
Released under the [MIT License](LICENSE).
