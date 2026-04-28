# Bubel Beach Club Festival Theme Guide

## Brand Summary

Bubel Beach Club should feel like a backyard beach-party festival with crawfish, live music, water, and summer energy. The visual style should be colorful, vibrant, slightly cartoonish, somewhat rustic, and intentionally imperfect, like a sun-faded festival flyer brought into a modern ticketing website.

The site should feel inviting and exciting, but still trustworthy enough for ticket purchases.

## Core Vibe

- Colorful and energetic
- Rustic beach-club party
- Slightly cartoonish, not childish
- Festival flyer inspired
- Warm, sun-washed, slightly overexposed
- Semi-dark theme with bright accents
- Music, water, crawfish, food, and community

## Inspiration Keywords

- Crawfish boil
- Backyard festival
- Beach club
- Live music
- Summer water party
- Texas/Southern hospitality
- Vintage event flyer
- Sun-faded poster
- Colorful wristbands
- Festival lineup poster
- Lolla / Bonnaroo / EDC energy, scaled down to a family/local event

## Visual Direction

The design should feel like a vibrant printed flyer layered onto a polished web app.

Use:

- bold color blocks
- large display headlines
- playful badges
- rounded cards
- slightly imperfect decorative shapes
- strong call-to-action buttons
- warm shadows and borders
- subtle grain or paper texture if implemented carefully

Avoid:

- corporate SaaS look
- overly minimal black-and-white design
- luxury nightclub aesthetic
- childish cartoon art
- generic beach stock-photo feel

## Color Palette

### Backgrounds

Primary background:

- Deep Navy: `#101827`

Secondary background:

- Washed Blue: `#183A59`

Warm surface:

- Sun-Faded Cream: `#FFF1C7`

Card surface:

- Charcoal Navy: `#172033`

### Primary Colors

- Crawfish Red: `#E6392E`
- Festival Yellow: `#FFD447`
- Beach Blue: `#2EC4F3`

### Accent Colors

- Boil Orange: `#F97316`
- Lagoon Teal: `#1DD3B0`
- Hot Pink Accent: `#F72585`
- Muted Sand: `#D9A441`

### Text Colors

- Primary text on dark: `#FFF7E6`
- Secondary text on dark: `#F7DFA5`
- Primary text on light: `#172033`
- Muted text: `#A7B0C0`

## Color Usage Rules

- Use deep navy as the main page background.
- Use cream/yellow surfaces for flyer-like content blocks.
- Use crawfish red for primary calls to action.
- Use beach blue and yellow for energy, section accents, and badges.
- Do not use every bright color in every section.
- Each section should have one dominant accent color.
- Ticket purchase buttons should be visually obvious and consistent.

## Typography

### Headings

Use a bold, condensed, poster-style display font.

Suggested options:

- `Bebas Neue`
- `Anton`
- `Oswald`
- `Archivo Black`

Headings should feel like festival flyer typography:

- uppercase or near-uppercase
- bold
- high-impact
- tight line height
- slightly oversized

### Body

Use a clean, readable sans-serif.

Suggested options:

- `Inter`
- `Manrope`
- `Work Sans`
- `Nunito Sans`

Body copy should be simple, friendly, and highly readable.

## Typography Rules

- Hero headline should be large and poster-like.
- Section titles should feel like flyer headers.
- Body text should stay clean and modern.
- Avoid script fonts for core UI.
- Decorative fonts may be used sparingly for badges or labels only.

## Layout Principles

- Mobile-first
- Big hero section
- Strong vertical rhythm
- Card-based content
- Clear ticket-buying path
- Flyer-inspired sections, but not cluttered
- Use bold section breaks
- Use asymmetry lightly for energy

## UI Personality

Buttons:

- chunky
- rounded
- high contrast
- slightly playful
- never subtle for primary actions

Cards:

- rounded
- bordered
- lightly shadowed
- can feel like printed flyer panels or wristband/ticket stubs

Badges:

- colorful
- pill-shaped or sticker-like
- good for `Live Music`, `Crawfish`, `Family Friendly`, `Limited Tickets`

Forms:

- simple and trustworthy
- less playful than marketing sections
- clear errors and validation states

Admin UI:

- cleaner and more restrained
- still use the same colors, but less decorative

## Texture and Effects

Allowed:

- subtle grain
- sun-faded overlay
- paper texture
- soft glow behind hero elements
- rough sticker-like badges
- simple wave or crawfish motifs

Use carefully. Effects should support the flyer feel without making the app hard to read.

Avoid:

- heavy animations
- overwhelming gradients
- low-contrast text
- realistic water backgrounds behind important content
- excessive drop shadows

## Imagery and Motifs

Potential motifs:

- crawfish silhouettes
- waves
- sunbursts
- ticket stubs
- wristbands
- music notes
- stage lights
- picnic tables
- beach club signage
- cooler / boil pot references

Motifs should be graphic and simple, not realistic.

## Section Guidance

### Hero

The hero should feel like the top of a festival poster.

Include:

- event name
- date
- location: Bubel Beach Club
- short tagline
- primary CTA: Buy Tickets
- secondary CTA: View Lineup / Event Details

Style:

- dark navy background
- red/yellow/blue accents
- oversized headline
- badge-style metadata

### Tickets

Ticket cards should feel like modern ticket stubs.

Include:

- ticket name
- price
- what is included
- CTA button

Style:

- cream or dark card surface
- red CTA
- yellow/blue accents
- clear hierarchy

### Lineup

Should feel like a mini festival poster.

Style:

- stacked names
- bold type
- playful dividers
- optional `stage/time` labels

### Food / Crawfish

Should feel warm, social, and flavorful.

Style:

- use red/orange/yellow
- rustic card treatment
- friendly copy

### Location

Bubel Beach Club should feel like a destination.

Style:

- water/lagoon blue accents
- map/location card
- relaxed, inviting tone

### Checkout

Checkout-related pages should be more restrained.

Rules:

- prioritize trust and clarity
- avoid too many decorative elements
- keep payment flow clean
- show ticket details clearly

## Accessibility Rules

- Maintain strong contrast, especially on dark backgrounds.
- Do not place small text over busy textures.
- Primary CTAs must be obvious.
- Forms must have clear labels.
- Error states must be visible and specific.
- Do not rely on color alone to communicate status.

## Tailwind Theme Direction

Suggested semantic tokens:

```css
--background: #101827;
--foreground: #FFF7E6;

--surface: #172033;
--surface-light: #FFF1C7;

--primary: #E6392E;
--primary-foreground: #FFF7E6;

--secondary: #FFD447;
--secondary-foreground: #172033;

--accent: #2EC4F3;
--accent-foreground: #101827;

--muted: #183A59;
--muted-foreground: #A7B0C0;

--border: #2A3954;
--ring: #FFD447;
```

## Design Dos

- Use bold color confidently.
- Make the site feel like an event, not a SaaS product.
- Keep ticket-buying CTAs obvious.
- Use rustic and flyer elements as flavor, not clutter.
- Make the homepage feel fun immediately.
- Keep admin and checkout screens calmer.

## Design Don'ts

- Do not make the site look like a generic conference page.
- Do not overuse cartoon elements.
- Do not use unreadable display fonts for body text.
- Do not add random colors outside the palette.
- Do not let style interfere with buying tickets.
- Do not make every section equally loud.

## One-Sentence Creative Direction

A vibrant, sun-faded backyard festival flyer for Bubelpalooza at the Bubel Beach Club, mixing crawfish-boil warmth, beach-party color, and live-music energy inside a polished modern ticketing site.
