# OPERRA landing page

Standalone Next.js App Router project for the OPERRA landing page previously served from `operra-versi-pixel/apps/web`.

## Development

```bash
pnpm install
pnpm dev
```

Set these variables for production. `NEXT_PUBLIC_SITE_URL` should be the real public domain, otherwise canonical and sitemap URLs use localhost:

```bash
NEXT_PUBLIC_SITE_URL=https://your-landing-domain.example
NEXT_PUBLIC_APP_URL=https://your-app-domain.example
```

## Verification

```bash
pnpm typecheck
pnpm build
```

The landing page keeps its original responsive navigation, audience switcher, video previews, QR shortcut, and section anchors. Planned capabilities remain explicitly labelled as planned. Next.js generates `/sitemap.xml` and `/robots.txt`, while the root layout provides canonical, Open Graph, Twitter, and JSON-LD metadata.

The standalone landing defaults to OPERRA's dark product theme and loads the bundled SF Pro Rounded font used by the application.
