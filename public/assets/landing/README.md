# OPERRA landing assets

The three original photographs below were generated using the built-in imagegen tool. PNG originals and optimized WebP versions are bundled in this directory. Community portraits are concept artwork, not customer testimonials or a record of OPERRA users.

| Asset | Original | Web version |
| --- | --- | --- |
| Studio hero | `operra-hero.png` | `operra-hero.webp` |
| Collaboration photo | `operra-collaboration.png` | `operra-collaboration.webp` |
| Community collage | `operra-community.png` | `operra-community.webp` |

`office-preview.webp` and `docs-preview.webp` are captures of the actual pixel office and OperraDocs interfaces. They were not generated. The collaboration photo is retained for future use. The current hero uses the owner-supplied `../hero-video.mp4`, with the generated hero photograph as its loading poster; the community section uses the collage.

The three feature cards now use [real application recordings with camera zoom](motion/README.md). The older static office/Docs captures are retained as source assets.

## Final generation prompts

### Hero

Use case: photorealistic-natural. Asset type: wide 16:9 website hero photograph for OPERRA, a shared office for human and AI-agent teamwork. Create an original cinematic editorial photograph of two young adult software collaborators working at a warm modern studio desk near a large window. One person is seated on the RIGHT HALF using a laptop and a second monitor, another teammate stands beside them reviewing notes. Authentic candid interaction, believable hands, textured wooden desk, paper notebook, plants in soft focus, warm afternoon sunlight, charcoal clothing and a subtle blue accent. Laptop screen shows an abstract work interface without readable words or brand marks. LEFT 40 percent of frame is calm, shadowed studio space suitable for white headline overlay, with no faces there. Natural photographic grain, tactile materials, premium magazine photography, eye-level medium-wide composition. No robots, no holograms, no floating UI, no text, no logos, no watermark. Opaque background.

### Collaboration

Use case: photorealistic-natural. Asset type: landscape 4:3 editorial website photograph for OPERRA. Original close candid photograph of a small team of two adult developers collaborating at a real wooden table in a warm studio: a woman's hands pointing at a paper task brief beside a laptop while a man listens and types, faces partially visible in the upper half, notebook, simple glass of water, afternoon window light. Show the shared action and hands clearly, understated charcoal and blue clothing, authentic diverse people, natural skin texture and believable anatomy, premium editorial photography. Laptop interface is abstract with no readable text. No logos, no text, no robots, no sci-fi effects, no watermark. Opaque background.

### Community collage

Use case: ads-marketing. Asset type: wide 16:9 photographic collage for the black community section of the OPERRA website. Create a single polished editorial composition on a perfectly pure BLACK background, no text anywhere. Roughly fifty small overlapping rectangular candid photographs form a large semicircular dome / arch-shaped mound rising at the center and lower at the outer edges. Varied sizes, slight depth of field, convincingly different individual photos: diverse adult software developers and creatives at laptops, portraits of young and middle-aged adults in warm natural light, hands writing notebooks, video-call portraits, studios and desks, closeups of people collaborating. Every photo belongs to a different scene. Central upper photos are crisp and the foreground bottom edge fades naturally into pure black. Occupy most of the frame horizontally, leave only a slim black margin above the central crown. Natural colors, premium lifestyle photography, varied candid poses. No recognizable celebrities, no brand marks, no words, no numbers, no UI, no logos, no watermark. This is a conceptual community montage, not actual customer portraits.

## Other visuals

- OPERRA logo: supplied by the project owner at `/assets/operra-logo.svg`.
- NEAR logo: official symbol and wordmark; see `../near/README.md`.
- Avatar previews: rendered by the existing pixel avatar component.
- QR codes: generated locally in the browser with `qrcode`, encoding this instance's `/app` URL. No QR service is contacted. A localhost instance remains accessible only where that localhost address resolves; deploy on a reachable origin for cross-device scanning.

The QR implementation follows the package's [official browser API documentation](https://github.com/soldair/node-qrcode#browser).
