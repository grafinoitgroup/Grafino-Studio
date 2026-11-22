# Deploying Grafino Studio to Hostinger

This project is pre-configured for static hosting on **Hostinger** (both hPanel Shared Hosting `public_html` and Hostinger Git / Web App deployments).

All 11 client-side routes (`/`, `/services`, `/pricing`, `/subscription-package`, `/our-ai-tools`, `/help-desk`, `/appointments`, `/events`, `/jobs`, `/about-us`, `/contact`), Dark/Light theming, 3D orbital graphics, forms, and images work out of the box with zero backend required.

---

## Option 1: Upload via Hostinger hPanel File Manager (Shared Hosting)

1. **Build the production folder locally**:
   ```bash
   npm install
   npm run build
   ```
   This generates the `dist/` folder containing:
   - `index.html`
   - `.htaccess` (handles SPA routing so direct URLs and refreshes on `/services`, `/pricing`, etc. never return 404)
   - `favicon.svg` & `robots.txt`
   - `assets/` (optimized JavaScript & CSS bundles)
   - `src/assets/images/` (all studio photography)

2. **Upload to Hostinger `public_html`**:
   - Open **Hostinger hPanel** -> **Websites** -> **Manage** -> **File Manager**.
   - Open the `public_html` folder (clear out any default Hostinger `default.php` placeholder file).
   - Upload **all files and folders inside `dist/`** directly into `public_html/`.
   - **Important**: Verify that the hidden `.htaccess` file is present inside `public_html/` (enable "Show hidden files" in File Manager settings if you do not see it).

3. **Optional HTTPS Redirect**:
   - Once SSL is enabled on your domain in Hostinger hPanel, you can uncomment the two HTTPS redirect lines inside `public_html/.htaccess` if you want Apache/LiteSpeed to enforce `https://`.

---

## Option 2: Automatic Deployment via Hostinger Git / Static Site Hosting

1. Push this project to a GitHub repository.
2. In Hostinger hPanel, connect your repository under **Git** or **Node.js / Static Web Apps**:
   - **Framework**: Vite / React
   - **Build Command**: `npm run build`
   - **Publish / Output Directory**: `dist`
   - **Node Version**: `20` or `22`

---

## Optional Brand Customizations Before Building

- **Custom Logo File**: Place your `logo.webp` inside `public/logo.webp`, then set `logoSrc: '/logo.webp'` in `src/data/studioData.ts` before running `npm run build`.
- **Social Profile Links**: Replace `'#'` in `STUDIO_INFO.socials` inside `src/data/studioData.ts` with your exact Instagram, LinkedIn, and Twitter/X URLs.
