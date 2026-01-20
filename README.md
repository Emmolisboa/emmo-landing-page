# Emmo Landing Page

A modern, responsive landing page for a musician built with Next.js 13+ and TypeScript.

## Features

- **Hero Section** - Eye-catching introduction with call-to-action buttons
- **About Section** - Artist biography and information
- **Gallery** - Photo gallery with lightbox functionality
- **Videos** - Support for both YouTube embeds and locally hosted videos
- **Social Links** - Connect section with links to all social media platforms
- **Responsive Design** - Fully responsive and mobile-friendly
- **Smooth Scrolling** - Navigation with smooth scroll to sections

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (icons)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app              - Next.js App Router pages and layouts
/src/components   - React components
  - Navigation.tsx
  - Hero.tsx
  - About.tsx
  - Gallery.tsx
  - Videos.tsx
  - SocialLinks.tsx
```

## Customization

### Update Content

- **About Section**: Edit `src/components/About.tsx`
- **Gallery Images**: Update the `galleryImages` array in `src/components/Gallery.tsx`
- **Videos**: Update the `videos` array in `src/components/Videos.tsx`
- **Social Links**: Update the `socialLinks` array in `src/components/SocialLinks.tsx`

### Add Local Videos

1. Place video files in `/public/videos/`
2. Update the `videos` array in `src/components/Videos.tsx` with the correct paths

### Add Local Images

1. Place images in `/public/images/`
2. Update the `galleryImages` array in `src/components/Gallery.tsx` to use `/images/your-image.jpg`

## Deployment

This project can be deployed on Vercel:

```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## License

MIT
