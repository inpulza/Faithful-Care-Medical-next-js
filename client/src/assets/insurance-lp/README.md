# Insurance-Accepted Landing Page Image Slots

This folder is reserved for images used by `/insurance-accepted`.
The page renders **labelled placeholder slots** (aspect-ratio boxes with the
required filename, dimensions, and alt text) until real assets are dropped in.

When the clinic provides real photos, save them here following these specs.
All assets must be **WebP, quality 85+, sRGB**.

| Slot ID | Filename | Width x Height | Required alt text |
| --- | --- | --- | --- |
| hero-portrait | `hero-portrait.webp` | 960 x 1200 (4:5) | "Dr. Addys Reve, MD greeting a patient in the Naples office" |
| humana-card | `humana-care.webp` | 1200 x 800 (3:2) | "Faithful Care nurse comforting a Humana palliative patient at home" |
| aetna-card | `aetna-care.webp` | 1200 x 800 (3:2) | "Dr. Reve speaking with an Aetna primary care patient in Naples" |
| trust-portrait | `dr-reve-portrait.webp` | 800 x 1000 (4:5) | "Dr. Addys Reve, MD, founder of Faithful Care Medical Services" |
| office-exterior | `office-exterior.webp` | 1200 x 800 (3:2) | "Faithful Care office at 9955 Tamiami Trail N, Naples FL" |

Once a file is dropped in, replace the matching `<ImageSlot ... />` in
`client/src/pages/insurance-accepted.tsx` with a real `<img>` import.
Keep the same width / height / alt to preserve CWV (LCP, CLS).
