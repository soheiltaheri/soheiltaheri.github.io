# Soheil Taheri — Data Analyst

A self-contained personal portfolio in HTML, CSS, and vanilla JavaScript. Business analytics comes first; applied AI supports the analytics work. The existing `../portfolio-website/` Next.js project is preserved as a reference.

## Preview

Double-click `index.html`, or use your browser's Open File command. No Node.js, npm, server, internet connection, or build step is needed to display the portfolio. External GitHub/LinkedIn links need an internet connection; email links use your mail application.

## Structure

```text
index.html          All content, semantic sections, metadata, inline workflow SVG
css/styles.css      Design tokens, layouts, responsive and accessibility styles
js/main.js          Optional mobile navigation and current footer year
assets/projects/    Four real project PNGs copied from the existing portfolio
assets/icons/       Local SVG favicon
assets/resume/      Resume instructions; no fabricated PDF
```

## Editing

Edit the text and links directly in `index.html`. Featured projects are inside `#projects .featured-grid`; additional work is inside `.more-grid`. Each project is one `article`. Keep descriptive alt text when replacing images. Images link to their full local files for inspection; `object-fit: contain` preserves the complete charts. Content is present in HTML and stays available with JavaScript disabled. No fetch calls, modules, remote fonts, or CDN resources are used.

The first migration reused `portfolio-website/data/portfolio.ts` and existing About copy, adding the supplied missing project findings. Future HTML edits do not require that TypeScript file or a generator. Color tokens are at the top of `css/styles.css`. System fonts avoid font downloads. Breakpoints cover narrow phones, tablets, and desktops. Reduced-motion preferences disable smooth scrolling and entrance animation. Without JavaScript, the mobile navigation stays expanded.

## Resume

Place the real PDF at `assets/resume/Soheil-Taheri-Resume.pdf`. Replace the disabled resume button with a link to that relative path and a `download` attribute, then remove `#resume-note`. Full instructions are also in the resume directory.

## Static hosting

Publish the contents of this folder on GitHub Pages, Netlify, or Vercel static hosting, with no build command. Ensure `index.html` is at the published root. Relative asset paths also support a project subdirectory. No hosting setup or deployment has been performed. Add final site URL metadata once a public URL is chosen.

## Review checklist

- Open the file at desktop, tablet, and phone widths; inspect long titles and contact wrapping.
- Check menu toggle, Escape, anchor navigation, visible keyboard focus, and skip link.
- Disable JavaScript and confirm navigation/content remain available.
- Inspect real charts at full size and verify outbound repository links.
- Review reduced-motion behavior and replace the resume placeholder when ready.

The workflow curve is explicitly conceptual, not a measured KPI. No project screenshots or proficiency scores were invented.
