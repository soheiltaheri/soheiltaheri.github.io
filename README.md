# Soheil Taheri — Data Analyst

A self-contained personal portfolio in HTML, CSS, and vanilla JavaScript. Business analytics comes first; applied AI supports the analytics work. The existing `../portfolio-website/` Next.js project is preserved as a reference.

## Preview

Double-click `index.html`, or use your browser's Open File command. No Node.js, npm, server, internet connection, or build step is needed to display the portfolio. External GitHub/LinkedIn links need an internet connection; email links use your mail application.

## Structure

```text
index.html          All content, semantic sections, metadata, inline workflow SVG
css/styles.css      Design tokens, layouts, responsive and accessibility styles
js/main.js          Mobile navigation, one-time data reveals, current year
assets/projects/    Four real project PNGs copied from the existing portfolio
assets/icons/       Local SVG favicon
assets/resume/      Real resume PDF and replacement instructions
```

## Editing

Edit the text and links directly in `index.html`. Featured projects are inside `#projects .featured-grid`; additional work is inside `.more-grid`. Each project is one `article`. Keep descriptive alt text when replacing images. Images link to their full local files for inspection; `object-fit: contain` preserves the complete charts. Content is present in HTML and stays available with JavaScript disabled. No fetch calls, modules, remote fonts, or CDN resources are used.

The first migration reused `portfolio-website/data/portfolio.ts` and existing About copy, adding the supplied missing project findings. Future HTML edits do not require that TypeScript file or a generator. Color tokens are at the top of `css/styles.css`. System fonts avoid font downloads. Breakpoints cover narrow phones, tablets, and desktops. Reduced-motion preferences disable smooth scrolling and entrance animation. Without JavaScript, the mobile navigation stays expanded.

## Resume

The Download Resume link is active at `assets/resume/Soheil-Taheri-Resume.pdf`. Replace that file with your updated PDF, keeping the filename unchanged. The HTML download attribute is set; browser handling can vary.

## Static hosting

Publish the contents of this folder on GitHub Pages, Netlify, or Vercel static hosting, with no build command. Ensure `index.html` is at the published root. Relative asset paths also support a project subdirectory. No hosting setup or deployment has been performed. Add final site URL metadata once a public URL is chosen.

## Review checklist

- Open the file at desktop, tablet, and phone widths; inspect long titles and contact wrapping.
- Check menu toggle, Escape, anchor navigation, visible keyboard focus, and skip link.
- Disable JavaScript and confirm navigation/content remain available.
- Inspect real charts at full size and verify outbound repository links.
- Review reduced-motion behavior and check the real resume download.

The workflow curve is explicitly conceptual, not a measured KPI. No project screenshots or proficiency scores were invented.

## Interaction enhancements

The workflow line draws once when visible, real impact numbers reveal once, and featured project cards emphasize their result on hover or keyboard focus. No content is hidden behind these effects. Reduced-motion preferences skip animation, including when changed during a reveal. Without JavaScript, final numbers and the full workflow remain visible. Project links retain native keyboard behavior.

An empty `.nojekyll` is included for GitHub Pages. All local URLs are relative to this directory and work under a repository subdirectory.

## Signature analytical experience

The hero has 12 fixed conceptual marks. Four native buttons inspect Collect, Clean, Analyze, and Communicate stages; these also work with keyboard and touch. On a fine pointer above 900px, nearby supporting marks shift by at most three SVG units and a local mask reveals the existing hero grid. No measured data is implied. Pointer work is frame-batched, geometry is cached, and no animation loop runs while idle. Reduced motion disables the pointer field and background response; stage selection remains immediate.

Featured projects keep their real Problem, Approach, and Result content visible in a connected Data Lens treatment. Hover and keyboard focus emphasize the result. Wide screens (1400px+) show a small reading-path indicator; narrower screens omit it. Axis details are decorative and encode no additional statistics.

Validation covered 390px, 768px, and 1440px with no horizontal overflow, stage selection, mobile navigation, project keyboard focus, relative local references, and unchanged resume bytes. Reduced-motion mode was checked in Chrome. Review the pointer feel manually: headless virtual-time execution did not reliably advance pointer animation frames.
