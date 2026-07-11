# Personal Portfolio Website

A highly interactive personal portfolio website designed to showcase professional work experience and project history.

## Tech Stack
- **Framework & Runtime**: React 19 (TypeScript) + Vite 8
- **Styling**: Modern Vanilla CSS (Google Fonts, custom HSL color systems, floating ambient gradients, and glassmorphic designs)
- **Testing**: Vitest + React Testing Library + jsdom
- **Hosting**: Configured for GitHub Pages via GitHub Actions

---

## Key Features

1. **Ambient Dark Theme Layout**: Beautifully designed responsive interface using custom HSL slate tones, background blur, and smooth fade-in-up animations.
2. **Interactive Experience Timeline**: Vertical timeline showcasing professional roles. Individual cards expand dynamically when clicked to display key achievements and tech badges.
3. **Public & Private Project Showcase**: Dynamic project grid filterable by category (All, Public, Private).
   - **Public Projects**: Render action links directly redirecting to repositories (GitHub) and live demos.
   - **Private Projects**: Mark confidential internal codebases with a custom lock icon and badge, omitting outbound links.
4. **Validated Contact Form**: Full client-side input validations (name, email format, and minimum message length checks) with interactive success feedbacks.
5. **GitHub Pages Ready**: Out-of-the-box support for hosting sub-paths, automated via push-driven CI/CD scripts.

---

## Commands & Scripts

### 1. Installation
Install project dependencies:
```bash
npm install
```

### 2. Run Locally
Start the local development server:
```bash
npm run dev
```

### 3. Run Automated Tests
Execute the unit testing suite (validating projects filtering and collapsible experience toggles):
```bash
npm run test
```

### 4. Build Production Bundle
Compile and bundle optimal assets inside `/dist` for deployment:
```bash
npm run build
```

---

## CI/CD & GitHub Pages Deployment

Every push to the `main` branch triggers the workflow defined in `.github/workflows/deploy.yml`:
1. Checkouts the codebase.
2. Performs clean install and runs the Vitest testing suite.
3. Compiles production assets with target subdirectory configuration (`/portfolio/`).
4. Deploys the bundle directly to GitHub Pages.
