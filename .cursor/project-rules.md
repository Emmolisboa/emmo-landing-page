# Project Rules

## Project Structure

This project follows a hybrid Next.js 13+ structure:

- Uses App Router for pages (`/app` directory)
- Uses `src` directory for core application code
- File structure follows:
  - `/app` — For pages and layouts using App Router
  - `/src` — For components, hooks, utils, and business logic
    - `/src/components` — Reusable React components
    - `/src/hooks` — Custom hooks
    - `/src/lib` — Utilities and configurations
    - `/src/contexts` — Context providers
    - `/src/types` — TypeScript type definitions

## Guidelines

1. Use App Router patterns for pages (`/app` directory)
2. Use `@/` alias for imports from `src` directory
3. Keep client/server component separation in mind (Next.js best practices)
4. Ensure suggestions align with Next.js 13+ best practices
5. Consider the hybrid structure when suggesting file locations or imports
6. Use the ShadCN CLI to add UI components; do not manually copy ShadCN or Radix files
7. Avoid duplicate files, components, or business logic
8. All code should be written in TypeScript
9. Place tests in `/tests` and mirror the structure of `/src/components`
10. Regularly audit for unused or unnecessary files and dependencies
11. Update documentation in `/docs` and keep rules in sync with `.cursor/project-rules.md`
12. Cursor and AI should always reference `.cursor/project-rules.md` for project context and structure

## Landing Page Components

- **Navigation**: Fixed header with smooth scroll navigation
- **Hero**: Full-screen hero section with call-to-action buttons
- **About**: Biography and artist information section
- **Gallery**: Photo gallery with lightbox modal functionality
- **Videos**: Supports both YouTube embeds and locally hosted videos
- **SocialLinks**: Social media connection section

## Asset Management

- Place images in `/public/images/`
- Place videos in `/public/videos/`
- Update component arrays to reference these assets
