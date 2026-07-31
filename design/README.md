# Design assets

Reference material, not shipped code. Nothing in `apps/` imports from here.

| Path                | Contents                                                                       |
| ------------------- | ------------------------------------------------------------------------------ |
| `reference-screens/` | Static HTML mockups of 15 screens plus the captured stylesheet                 |
| `exports/`           | Design-tool exports (`*.dc.html`, `support.js`, `.thumbnail`) — generated      |
| `brand/`             | Logo source files                                                              |

`exports/support.js` is generated output — do not edit it by hand.

The living design system is `apps/web/src/app/globals.css` (tokens, glass
surfaces, keyframes) plus the primitives in `packages/ui`. It is specified in
[../docs/03-design-system.md](../docs/03-design-system.md).
