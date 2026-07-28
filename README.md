# Museum of Jaxsen

3D art gallery with print e-commerce. Artworks render as planes in a persistent Three.js/WebGL scene; page routing changes what's visible in the scene rather than replacing DOM content.

## Stack

- [Vike](https://vike.dev) (Vite meta-framework) — filesystem-based routing, prerendering
- [React](https://react.dev) + [react-three-fiber](https://r3f.docs.pmnd.rs) / [drei](https://github.com/pmndrs/drei) for the 3D scene
- [Zustand](https://github.com/pmndrs/zustand) for gallery interaction state
- [Contentful](https://www.contentful.com) for artwork content
- [Stripe](https://stripe.com) Checkout for print purchases
- [Resend](https://resend.com) for order emails
- Deployed on [Vercel](https://vercel.com) (via [Photon](https://photonjs.dev))

## Setup

```bash
cp .env.example .env
```

Fill in Contentful, Stripe, and Resend credentials — see `.env.example`. For the Contentful content type schema, see `CONTENTFUL_SETUP.md`.

## Commands

```bash
pnpm dev        # Vike dev server + Express API server (ports 3000 + 3001)
pnpm build      # Build with Vike
pnpm preview    # Build then preview production locally
```

No test or lint scripts are configured.

## Structure

- `pages/` — Vike routes (`+Page.tsx`, `+data.ts`, `+Layout.tsx`, `+config.ts`, `+Head.tsx` per route)
  - `index/` — gallery front room
  - `artwork/@slug/` — artwork detail view
  - `purchase/` — Stripe checkout success/cancel
  - `admin/` — admin views
- `components/` — the 3D scene (`Structure.tsx` is the root scene, `Artwork.tsx` renders each piece, `Wall.tsx`/`Floor.tsx`/`BackRoom.tsx` build the space, `CameraAnimator.tsx` handles view transitions)
- `lib/` — `contentful.ts` (data fetching/transform), `store.ts` (Zustand gallery state), `stripe.ts` (checkout), `analytics.ts` (Umami wrapper), `artworks.ts`
- `api/` — Vercel serverless functions (`create-checkout.ts`, `ship-order.ts`, `sitemap.ts`), wrapped locally by `server.js` for dev

See `CLAUDE.md` for a fuller architecture writeup and data flow.
