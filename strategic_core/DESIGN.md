# Design System Document: Tech-Premium Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Architectural Conduit"**

This design system is built to position "Ayuda Estratégica" as a dominant, high-intelligence force in the HR and Headhunting sector. We are moving away from the "generic corporate portal" and toward a "Tech-Premium Editorial" experience. The system balances the cold, sharp precision of modern technology with the fluid, human-centric nature of strategic consulting.

To break the "template" look, this system utilizes **intentional asymmetry** and **expansive white space**. Layouts should feel like a high-end architectural portfolio: large, high-contrast typography, overlapping glass layers, and a complete absence of traditional "boxes" and "lines." We don't just organize data; we curate talent through a lens of digital prestige.

---

## 2. Colors: Tonal Depth & Soul
Our palette transitions from the deep authority of Navy Blue to the high-energy pulse of Cyan.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders for sectioning or containment. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section should sit directly against a `surface` background. The transition of color is the boundary.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of frosted glass and fine paper.
*   **Base:** `surface` (#f7fafc)
*   **Depth Level 1:** `surface-container-low` (#f1f4f6) for large structural background shifts.
*   **Depth Level 2:** `surface-container` (#ebeef0) for interactive zones.
*   **Depth Level 3:** `surface-container-highest` (#e0e3e5) for highlighted content or "pop-out" cards.

### The "Glass & Gradient" Rule
To achieve "Tech-Premium" status, use Glassmorphism for floating navigation and temporary overlays.
*   **Glass Specs:** Use `surface-container-lowest` (#ffffff) at 70% opacity with a `backdrop-blur` of 20px.
*   **Signature Textures:** For Hero sections and primary CTAs, use a subtle linear gradient from `primary-container` (#001f3f) to `primary` (#000613). This creates a "void-like" depth that solid colors cannot replicate.

---

## 3. Typography: Authoritative Clarity
We utilize **Inter** for its mathematical precision and neutral character, allowing the content to lead.

*   **Display (Display-LG/MD):** Used for "Executive Statements." High-contrast, bold, and strictly for primary hero messaging.
*   **Headline (Headline-LG/MD):** The "Editorial" voice. Used for section headers to provide immediate authority.
*   **Body (Body-LG/MD):** Optimized for readability in long-form candidate profiles or service descriptions.
*   **Labels:** Specifically for metadata. Small, uppercase, and often paired with `secondary` (#115cb9) or `tertiary-fixed-dim` (#00daf3) for a "high-tech" look.

---

## 4. Elevation & Depth: The Layering Principle
We convey hierarchy through **Tonal Layering** rather than structural lines.

*   **Natural Lift:** Place a `surface-container-lowest` card on a `surface-container-low` background. The slight shift in brightness creates a soft, natural lift.
*   **Ambient Shadows:** For floating elements (like a "Apply Now" persistent button), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 31, 63, 0.06)`. Note the tint: we use a low-opacity version of our Navy Blue (`primary-container`), never pure black.
*   **The "Ghost Border" Fallback:** If accessibility requires a container definition, use the `outline-variant` token at 15% opacity. Never use 100% opaque borders.
*   **Motion Depth:** When elements hover, do not just change the shadow; shift the background from `surface-container` to `surface-container-highest` to simulate the element moving toward the light source.

---

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary-container` to `primary`. 24px (`md`) border radius. Text in `on-primary`.
*   **Secondary:** Solid `secondary` (#115cb9). High-energy for "Action Required" states.
*   **Tertiary:** No background, `on-surface` text with a `tertiary-fixed-dim` (Cyan) underline on hover.

### Chips (Skill/Tagging)
*   Used for candidate skills. Use `secondary-container` with `on-secondary-container` text. Roundedness: `full` (9999px) to contrast with the 24px UI.

### Input Fields
*   **Field:** `surface-container-low` background, no border. On focus, transition background to `surface-container-lowest` and add a 2px `secondary` bottom-only accent.
*   **Error State:** Use `error` (#ba1a1a) for helper text and a subtle `error-container` glow.

### Cards (The "Talent Profile")
*   **Structure:** No dividers. Use `Spacing-8` (2.75rem) to separate internal content blocks.
*   **Interaction:** On hover, the card should use a Glassmorphism overlay to reveal "Quick Action" buttons (e.g., Download CV).

### Global Navigation
*   **Style:** Fixed at the top, `surface-container-lowest` at 80% opacity, `backdrop-blur: 16px`.
*   **Accent:** A single 2px line of `tertiary-fixed-dim` (Cyan) at the very top of the nav bar to signify "Tech-Active" status.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins (e.g., 10% left margin, 5% right margin) to create a dynamic, editorial feel.
*   **Do** lean into the "Cyan" accent (`tertiary-fixed-dim`) for data points, numbers, or small icons to inject energy.
*   **Do** use the `lg` (2rem) and `xl` (3rem) border radius for large imagery to maintain the "Modern Tech" softness.

### Don't
*   **Don't** use 1px dividers to separate list items. Use vertical spacing (`Spacing-5` or higher) to let the content breathe.
*   **Don't** use pure black for text. Always use `on-surface` (#181c1e) to keep the "Premium" softness.
*   **Don't** use standard "drop shadows." If it doesn't look like ambient light, it's too heavy.
*   **Don't** crowd the interface. If you are in doubt, add more spacing from the scale (e.g., jump from `12` to `16`). High-end design is defined by what you leave out.