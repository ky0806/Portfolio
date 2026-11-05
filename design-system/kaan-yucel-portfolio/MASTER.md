# Design System Master File — Kaan Yücel Portfolio

> **LOGIC:** Check `design-system/kaan-yucel-portfolio/pages/[page-name].md` first.
> If it exists, its rules **override** this Master file. Otherwise follow this file.

**Project:** Portfolio van Kaan Yücel (AI engineer in opleiding)
**Generated:** 2026-11-05 with `ui-ux-pro-max` (`--design-system --persist`, query "AI developer portfolio technical minimal bold typography", dials Variance 5 · Motion 7 · Density 2)
**Inspiration (alleen sfeer en bewegingen, geen teksten/logo's/beelden):** inspace.io/nl-nl

**Afwijkingen van de gegenereerde uitkomst (bewust, door Kaan/project):**
- Lettertype Inter vervangen door Oxanium + Share Tech Mono + DM Sans (CLAUDE.md: geen Inter).
- Paginapatroon "Product Demo + Features" vervangen door "Portfolio Grid" (uit `--domain landing`).
- GSAP-motion vervangen door Motion (spring physics); geen andere animatie-libraries.
- Achtergrond `#FAF5FF` (te roze-lavendel) vervangen door neutraal `#FAFAFC`; lavendel alleen voor vormen.
- Cyaan als tekstkleur op wit faalt op contrast; cyaan alleen voor stipjes/lijnen, tekst gebruikt `--color-live-text`.

---

## Sfeer

Modern, technisch, licht en lucht. Grote, zware koppen met één gekleurd woord of zinsdeel, veel witruimte, één accentkleur (pruim), zachte zwevende vormen, kaarten met echte cijfers. Persoonlijkheid via de cursieve naam en verende bewegingen. Geen overbodige elementen.

**Stijl:** AI-Native UI + Minimalism & Swiss (rooster, essentie, één accent).
**Niet doen:** iconen als emoji, nep-statistieken, parallax op tekst, zware schaduwen, meer dan één accentkleur voor knoppen.

---

## Kleuren

Hoofdkleur: diep pruim/wijnrood **#58143B** (afgeleid van een afbeelding van Kaan, vervangt het eerdere violet).

| Rol | Hex | CSS-variabele | Gebruik |
|---|---|---|---|
| Achtergrond | `#FBF8FA` | `--color-background` | Pagina (licht warm) |
| Kaart | `#FFFFFF` | `--color-card` | Kaarten, formulier |
| Voorgrond | `#1A0F17` | `--color-foreground` | Koppen, tekst |
| Gedempt | `#6A5F68` | `--color-muted-foreground` | Bijtekst (≈6:1) |
| Rand | `#EBDFE7` | `--color-border` | Hairlines |
| Primair (accent) | `#58143B` | `--color-primary` | Knoppen, links, labels |
| Primair hover | `#70205B` | `--color-primary-hover` | Hover op knoppen |
| Op primair | `#FFFFFF` | `--color-on-primary` | Tekst op knoppen (≈14:1) |
| Pruim zacht | `#F5E8F0` | `--color-primary-soft` | Tags, vlakken, grote vorm |
| Pruim licht | `#C27AA6` | `--color-secondary` | Zwevende vormen |
| Gradient | `#58143B` → `#C0397E` | `--color-gradient-from/to` | Gekleurd deel van de hoofdkop |
| Live (cyaan) | `#0891B2` | `--color-live` | Alleen stipjes en lijnen |
| Live-tekst | `#0E7490` | `--color-live-text` | Tekst bij live-cijfers (≈5.4:1) |
| Fout | `#DC2626` | `--color-destructive` | Formulierfouten |

Eén donker vlak (bijv. contactkaart of tools-band) mag `#1A0F17` met witte tekst zijn voor contrast.

---

## Lettertypes

Robotisch, dun en strak (gekozen door Kaan na vergelijking met Sora + JetBrains Mono en Chakra Petch).

| Rol | Font | Gewichten | Gebruik |
|---|---|---|---|
| Koppen | **Oxanium** | 300, 500 | Hoofdkop, sectiekoppen, kaarttitels |
| Kleine UI-tekst en cijfers | **Share Tech Mono** | 400 | Klok, labels, knoppen, nav, tags, statistiekkaart, tijdlijnjaar |
| Lopende tekst | **DM Sans** | 400, 500 | Alinea's, formuliertekst |
| Naam (signatuur) | **Cormorant Garamond** | cursief 500 | Alleen "Kaan Yücel" |

```html
<link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500&family=Share+Tech+Mono&family=DM+Sans:wght@400;500&family=Cormorant+Garamond:ital,wght@1,500&display=swap" rel="stylesheet">
```

**Schaal**

| Niveau | Grootte | Gewicht | Tracking |
|---|---|---|---|
| Display (hero-kop) | `clamp(2.6rem, 7.4vw, 5.5rem)` | Oxanium 300 | -0.02em |
| H2 (sectiekop) | `clamp(2rem, 5vw, 3.5rem)` | Oxanium 300 | -0.02em |
| H3 (kaarttitel) | `1.45rem` | Oxanium 500 | 0 |
| Body | `1.0625rem` | DM Sans 400 | 0 |
| Label / knop / nav | `.74–.92rem` | Share Tech Mono 400 | .02–.14em (labels hoofdletters) |
| Cijfers (stats) | `2.5rem` | Share Tech Mono 400, `tabular-nums` | 0 |

---

## Spacing, vorm, schaduw

Dichtheid 2/10 (ruim). Basis 8px.

| Token | Waarde |
|---|---|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 24px |
| `--space-lg` | 32px |
| `--space-xl` | 48px |
| `--space-2xl` | 64px |
| `--space-3xl` | 96px |
| `--section-y` | `clamp(96px, 14vw, 160px)` (ruimte tussen secties) |

Container max 1100px, zijmarge 24px (16px onder 380px).

| Vorm | Waarde |
|---|---|
| `--radius-card` | 20px |
| `--radius-input` | 12px |
| `--radius-pill` | 999px (knoppen, tags) |

| Schaduw | Waarde |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(15,13,31,.06)` |
| `--shadow-md` | `0 8px 24px rgba(15,13,31,.08)` |
| `--shadow-lg` | `0 24px 48px rgba(124,58,237,.14)` |

---

## Componenten

**Primaire knop:** pil, `--color-primary` met witte tekst, padding 14px 28px, 600. **Secundair:** pil, 1px rand `--color-border`, tekst voorgrond; hover rand pruim.
**Kaart:** wit, 1px rand, radius 20px, `--shadow-sm`; hover: veert 6px omhoog en `--shadow-lg`. Ruimte bovenin voor afbeelding (16:10); tot er een screenshot is een pruim-zachte placeholder met projectnummer.
**Statistiekkaart:** label (hoofdletters, gedempt), groot cijfer (Share Tech Mono), kleine live-stip + bijtekst. Alleen echte data.
**Tags:** pil, `--color-primary-soft` achtergrond, pruim tekst.
**Inputs:** wit, rand `--color-border`, radius 12px; focus: pruimkleurige rand + ring 3px `rgba(88,20,59,.2)`. Labels altijd zichtbaar.
**Nav:** sticky, wit/doorzichtig met blur, hairline onder bij scrollen.
**Zwevende vormen:** maximaal 3 (cirkel, ring, blob) in `--color-secondary`/`--color-primary-soft`, achter de hero, `pointer-events: none`, `aria-hidden`.

---

## Paginapatroon: Portfolio Grid

Hero (label · kop · naam · knoppen · statistiekkaart) → Projecten → Contact.
Later in fase 4 (alleen als Kaan echte inhoud aanlevert): Tools-band en Tijdlijn.

---

## Motion (alleen `motion`, spring physics)

Eén bibliotheek: **Motion** (vanilla, via ESM, geen build-stap). Spring-instellingen staan op één plek in het script:

```js
const spring = {
  default: { type: "spring", stiffness: 120, damping: 20, mass: 1 },
  hover:   { type: "spring", stiffness: 300, damping: 25 },
};
```

Regels:
- Alleen `transform` en `opacity` animeren (nooit width/height/top/left).
- Geen lineaire of ease-in-out animaties; altijd een spring.
- `prefers-reduced-motion`: alleen simpele fade-ins, geen parallax, tilt, marquee of zwevende vormen.
- Touchschermen (`(hover: none)`): geen hover- en tilt-effecten.
- Stagger ≈ 0.06–0.1s per woord/kaart.
- Elementen die al in beeld zijn bij laden niet verbergen (geen flits).

Bewegingen: hero-kop woord voor woord · statistiekkaart telt op en kantelt max ±8° met de muis · zwevende vormen parallax bij scrollen · projectkaarten vliegen in, veren bij hover, klappen uit bij klik · tools-band loopt door en vertraagt verend bij hover · tijdlijnlijn groeit mee met scrollen.

---

## Anti-patronen

- Emoji als icoon (SVG gebruiken)
- Verzonnen cijfers of logo's van bedrijven
- Inter, Times New Roman
- Lage contrasten (< 4.5:1 voor tekst)
- Onzichtbare focusstijlen
- Layout-verschuivende hovers (alleen transform)
- Animaties die tekst onleesbaar maken

## Checklist vóór oplevering

- [ ] Geen emoji als iconen
- [ ] `cursor: pointer` op klikbare elementen
- [ ] Hover 150–300ms of spring; focus zichtbaar
- [ ] Tekstcontrast ≥ 4.5:1
- [ ] `prefers-reduced-motion` en touch (`hover: none`) gerespecteerd
- [ ] Alleen transform/opacity geanimeerd
- [ ] Getest op 320, 375, 768, 1024, 1440px; geen horizontale scroll
- [ ] Niets verborgen achter de sticky nav (`scroll-margin-top`)
- [ ] NL en EN werken (`translations`)
