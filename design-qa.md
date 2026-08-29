# Faithful Care condition-page design QA

## Comparison target

- Source visual truth: `C:\Users\jorda\AppData\Local\Temp\codex-clipboard-fcb094ca-bce1-4d3c-b977-e71de70fc0a4.png`
- Rendered implementation: `C:\Users\jorda\dev-sandboxes\fc-condition-visual-review\production-v12\kidney-1440x900.png`
- Combined full-view evidence: `C:\Users\jorda\dev-sandboxes\fc-condition-visual-review\production-v12\kidney-source-vs-production-1440x900.png`
- Focused copy evidence: `C:\Users\jorda\dev-sandboxes\fc-condition-visual-review\production-v12\kidney-source-vs-production-focus-copy.png`
- Route: `/palliative-care/for-advanced-kidney-disease`
- State: initial above-the-fold view, production build, no modal open
- CSS viewport: 1440 x 900
- Source pixels: 1440 x 900
- Implementation pixels: 1440 x 900
- Device scale factor: 1
- Density normalization: none required; source and implementation use identical pixel and CSS dimensions

## Full-view comparison

The source problem reference placed the headline, support copy, and calls to action inside a large opaque rounded panel. It also pulled the contact form into the hero boundary and let the fixed navigation sit directly over the photograph. The production implementation keeps the same brand typography, source photograph, content, and conversion actions, but removes the opaque headline panel, gives the navigation a real 72 px safe band, keeps the photograph below that band, and places the form in normal flow after the hero.

The revised composition preserves a clear left-to-right reading path. The headline remains the primary focal point, the clinician and patient remain fully recognizable, and the form no longer competes with or clips the hero.

## Focused-region comparison

The focused comparison covers the logo, trust proof, H1, subtitle, and the beginning of the clinical photograph. DM Serif Display remains the display face and Inter remains the support face. The current implementation uses the expected optical hierarchy, line height, weight, and dark navy color without relying on a card surface. The trust proof is now stable and readable, including the five visible stars.

## Required fidelity surfaces

- Fonts and typography: passed. DM Serif Display and Inter render with the intended hierarchy, weight, line height, and wrapping. H1 clipping is absent across the tested viewport matrix.
- Spacing and layout rhythm: passed. Header clearance, hero copy spacing, CTA spacing, hero bottom safety, and the 40 px desktop form separation were measured. No overlap or horizontal overflow remains.
- Colors and visual tokens: passed. The pale aqua photographic treatment, deep navy copy, primary blue actions, and trust colors remain on brand. Measured text contrast is above WCAG AA thresholds.
- Image quality and asset fidelity: passed. Existing source photography is used at natural hero proportions, with route-specific focal positions. No stretched image, synthetic patch, visible seam, or subject-header collision remains.
- Copy and content: passed. Route-specific patient education, safety language, and calls to action remain coherent and do not introduce unsupported clinical claims.
- Icons and controls: passed. Existing Phosphor icons remain aligned and accessible. The modal close target is 44 x 44 px and custom focus rings exceed 3:1 contrast.
- States and interactions: passed. Contact modal focus trap, Escape, focus return, loading, success, error, reduced motion, and tablet booking action were exercised in browser E2E.

## Comparison history

1. Initial source finding: the opaque hero card dominated the layout, the photo could sit under navigation controls, and the form visually collided with the hero.
   Fix: removed the hero copy card, made the image treatment continuous, and moved the form into normal document flow.
2. Intermediate finding: subtitle and trust-line contrast varied over the photograph; form outcomes were not announced to assistive technology.
   Fix: added a continuous photographic contrast veil, `aria-busy`, polite success status, assertive error alert, visible 2 px focus rings, and a 44 px close target.
3. Intermediate finding: at 1024 and 1440 px, two subject crops could still touch Explore or Call Now.
   Fix: introduced a real 72 px navigation band and began the photographic area below it at tablet and desktop widths.
4. Intermediate finding: the blood-pressure subject lost part of the chin at 3440 px.
   Fix: changed that route's vertical focal point from top alignment to 12 percent. Matrix-v12 shows the full face with the natural crop limited to torso and shoulders.
5. Post-fix evidence: three independent judges returned zero P0, P1, and P2 findings. The production suite passed 87 of 87 tests, including 16 routes across eight hero breakpoints.

## Findings

No actionable P0, P1, or P2 visual differences remain.

## Follow-up polish

- P3: several semantically related condition pages reuse an existing clinical-photo family. The images remain relevant and correctly cropped, so this does not block release. Future photography can increase route differentiation when equally suitable 16:9 source assets are approved.

## Implementation checklist

- [x] Remove the opaque H1 panel.
- [x] Keep hero photography clear of fixed navigation controls.
- [x] Preserve full subject faces at mobile, tablet, desktop, and ultrawide widths.
- [x] Keep the contact form after the hero in normal flow.
- [x] Guarantee text and focus-indicator contrast.
- [x] Verify keyboard, reduced-motion, success, and error states.
- [x] Verify the optimized production build and full route matrix.

final result: passed
