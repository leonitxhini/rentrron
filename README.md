# RRON Rent A Car - Premium Car Rental Website

A luxury, next-level, conversion-focused car rental website built with Next.js 14, TypeScript, TailwindCSS, and Framer Motion.

## Features

- 🌍 **Bilingual Support**: English (EN) and Albanian (SQ)
- 🎨 **Premium Design**: Dark cinematic theme with glassmorphism effects
- 📱 **Fully Responsive**: Mobile-first design
- ⚡ **Fast Performance**: Optimized with Next.js 14 App Router
- 🎭 **Smooth Animations**: Framer Motion micro-interactions
- 📞 **WhatsApp Integration**: Direct booking via WhatsApp
- 🔍 **SEO Optimized**: Meta tags and OpenGraph support

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── fleet/             # Fleet pages
│   ├── airport/           # Airport transfers
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── CarCard.tsx
│   └── ...
├── data/                  # Mock data
│   └── cars.ts            # Car data
├── lib/                   # Utilities
│   ├── i18n.ts           # Internationalization
│   └── whatsapp.ts       # WhatsApp integration
└── public/                # Static assets
```

## Configuration

### WhatsApp Number

Update the WhatsApp number in `lib/whatsapp.ts`:

```typescript
const WHATSAPP_NUMBER = '+38349123456'; // Replace with actual number
```

### Car Data

Edit `data/cars.ts` to add or modify vehicles.

## Pages

- **Home**: Hero section, quick booking, featured fleet, reviews
- **Fleet**: Browse all cars with filters and compare feature
- **Car Details**: Individual car page with gallery and booking
- **Airport Transfers**: Information about airport pickup services
- **About**: Company story and statistics
- **Contact**: Contact information and booking form

## Language Support

The website supports English (EN) and Albanian (SQ). Language preference is saved in localStorage.

## Customization

### Colors

Edit `tailwind.config.ts` to customize the accent color (currently gold):

```typescript
accent: {
  DEFAULT: "#D4AF37", // Change to your preferred color
}
```

### Content

All text content is managed through the i18n system in `lib/i18n.ts`.

## License

Private project for RRON Rent A Car.

