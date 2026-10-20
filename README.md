# Avalanche Ranch Cabins & Hot Springs — Blueprint WebStudio Concept

Independent, non-official redesign concept for https://avalancheranch.com/ (Redstone, CO).
Preview: https://ar.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

Custom build, not the shared concept layout. Content and layout are in `src/App.jsx`, styles in `src/styles.css`, and the Blueprint WebStudio concept widget in `src/concept.jsx`.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `avalanche-ranch` (framework: Vite, team mrwerner-s-projects). Pushes to `main` deploy automatically.
Domain `ar.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional): `VITE_CONCEPT_END_DATE` (countdown end, 2026-11-24). The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site.

## Design

- Motif: the three tiered hot springs pools drawn as an SVG cascade with rising steam, plus the valley ridgeline (from the mountain in their logo) as section edges.
- Marcellus (echoing the classic capitals in their logo) with Figtree; their own logo green (#587c42), charcoal header and cream background from the current site, plus a spring-water teal and cedar accent.
- Split hero on charcoal with an arched pool photo, the winter pools inset and a 93–104°F badge; a "hot springs at a glance" board right under it (guest hours, day-pass slots, Wednesday closure, gift certificates).
- Day-pass card with the rules, cabin types with nightly "from" rates, ranch snapshots (1913 homestead, Cowboy Steve, barnyard, lodge, antiques), a summer/winter activity toggle, massage and yoga rates, private events capacity, and a "know before you go" grid drawn from the FAQ.
- All booking goes to their existing Flybook engine (account 1521): cabins (roomfinder), day passes (config 36329) and gift certificates (config 36351).

## What changed from the current site

- Replaces the fixed-width 2013 WordPress theme and its "© 2013" footer.
- On phones the current homepage shows one photo and the footer; the cabins, pools, activities and massage text don't appear at all. This concept is checked at 390px with no sideways scrolling.
- Day-pass price, time slots and the Wednesday closure are on the homepage instead of buried on the hot springs page.
- One closure time everywhere (the current site says 9–5 on the hot springs page and FAQ, 9–4 on the activities pages).

## Owner should confirm

- Flybook deep links for day passes (`Config/36329/0`) and gift certificates (`Config/36351/0`) are built from the IDs on their header buttons; confirm they open the right products.
- Rates ($34 day pass, $142–$332 nightly, massage $150/$216/$295, yoga $200/$275) are copied from the current site and may have changed; Ranch House rate wasn't listed.
- Pool temperature range: the FAQ says 93–104°F, the activities pages say 92–104°F. The concept uses 93–104°F.
- Wednesday pool closure 9am–5pm (vs 9am–4pm on the activities pages).
- "Four miles north of Redstone" comes from the FAQ ("two restaurants in Redstone, about four miles south of Avalanche Ranch").
- Cowboy Steve's campfire nights (Wed and Sat, 8pm, summer) and whether winter yoga classes still run.
- No awards or badges appear on the current site, and no reviews are quoted on it, so the concept shows none. Add a Google rating link once confirmed.
- Photos and the logo are hotlinked from avalancheranch.com and must be replaced with licensed originals before launch.
