# Product motion previews

These clips record actual OPERRA application interactions using isolated demonstration data. They are not generated mockups.

| Clip | Recorded action |
| --- | --- |
| `office.webm` | A participant walks through the pixel office using its keyboard controls. |
| `docs.webm` | A project brief is typed into the actual OperraDocs editor. |
| `avatar.webm` | Hair, color, jacket, and direction are changed in the actual avatar editor. |

Each WebM has a PNG poster captured from the recording. Clips are muted, loop inline while visible, pause offscreen or in a hidden browser tab, and respect reduced-motion preferences. Their combined video size is approximately 1.2 MB.

A gentle zoom follows each clip's duration. The entire rounded preview frame, video, and shadow scale together inside the card's media area. The footage is not independently zoomed or cropped. Zoom pauses with playback and is disabled for reduced-motion preferences.

To recapture after interface changes, build the frontend and debug server, then run `pnpm.cmd assets:landing`. The capture script uses the existing Playwright helper and its FFmpeg binary. Set `OPERRA_FFMPEG` to use another compatible FFmpeg executable. The capture server uses a temporary port and isolated data in `.local/landing-captures/`; the running development instance is not changed.

The interaction records and source frames are produced by `scripts/capture-landing-previews.mjs`; dimensions and durations are in `capture.json`.
