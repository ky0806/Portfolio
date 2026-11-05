# Design System Master File — Kaan Yücel Portfolio

> **LOGIC:** Check `design-system/kaan-yucel-portfolio/pages/[page-name].md` first.
> If it exists, its rules **override** this Master file. Otherwise follow this file.

**Project:** Portfolio van Kaan Yücel (AI engineer in opleiding)
**Generated:** 2026-11-05 with `ui-ux-pro-max` (`--design-system --persist`, query "AI developer portfolio technical minimal bold typography", dials Variance 5 · Motion 7 · Density 2)
**Inspiration (alleen sfeer en bewegingen, geen teksten/logo's/beelden):** inspace.io/nl-nl

**Afwijkingen van de gegenereerde uitkomst (bewust, door Kaan/project):**
- Lettertype Inter vervangen door Space Grotesk + DM Sans (CLAUDE.md: geen Inter).
- Paginapatroon "Product Demo + Features" vervangen door "Portfolio Grid" (uit `--domain landing`).
- GSAP-motion vervangen door Motion (spring physics); geen andere animatie-libraries.
- Achtergrond `#FAF5FF` (te roze-lavendel) vervangen door neutraal `#FAFAFC`; lavendel alleen voor vormen.
- Cyaan als tekstkleur op wit faalt op contrast; cyaan alleen voor stipjes/lijnen, tekst gebruikt `--color-live-text`.

---

## Sfeer

Modern, technisch, licht en lucht. Grote, zware koppen met één gekleurd woord of zinsdeel, veel witruimte, één accentkleur (violet), zachte zwevende vormen, kaarten met echte cijfers. Persoonlijkheid via de cursieve naam en verende bewegingen. Geen overbodige elementen.

**Stijl:** AI-Native UI + Minimalism & Swiss (rooster, essentie, één accent).
**Niet doen:** iconen als emoji, nep-statistieken, parallax op tekst, zware schaduwen, meer dan één accentkleur voor knoppen.

---

## Kleuren

| Rol | Hex | CSS-variabele | Gebruik |
|---|---|---|---|
| Achtergrond | `#FAFAFC` | `--color-background` | Pagina |
| Kaart | `#FFFFFF` | `--color-card` | Kaarten, formulier |
| Voorgrond | `#0F0D1F` | `--color-foreground` | Koppen, tekst (≈17:1) |
| Gedempt | `#5B5F70` | `--color-muted-foreground` | Bijtekst (≈6:1) |
| Rand | `#E7E5F0` | `--color-border` | Hairlines |
| Primair (accent) | `#7C3AED` | `--color-primary` | Knoppen, gekleurd kopwoord, links |
| Op primair | `#FFFFFF` | `--color-on-primary` | Tekst op knoppen (≈5.7:1) |
| Violet zacht | `#EDE9FE` | `--color-primary-soft` | Hover-vlakken, vormen |
| Violet licht | `#A78BFA` | `--color-secondary` | Zwevende vormen |
| Live (cyaan) | `#0891B2` | `--color-live` | Alleen stipjes en lijnen |
| Live-tekst | `#0E7490` | `--color-live-text` | Tekst bij live-cijfers (≈5.4:1) |
| Fout | `#DC2626` | `--color-destructive` | Formulierfouten |
| Focus-ring | `#7C3AED` | `--color-ring` | Zichtbare focus |

Eén donker vlak (bijv. contactkaart of tools-band) mag `#0F0D1F` met witte tekst zijn voor contrast.

---

## Lettertypes

| Rol | Font | Gewichten | Gebruik |
|---|---|---|---|
| Koppen, cijfers, labels | **Space Grotesk** | 500, 700 | Strak, technisch, groot en zwaar |
| Lopende tekst | **DM Sans** | 400, 500, 700 | Goed leesbaar |
| Naam (signatuur, optioneel) | **Cormorant Garamond** | cursief 500 | Alleen "Kaan Yücel" |

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=DM+Sans:wght@400;500;700&family=Cormorant+Garamond:ital,wght@1,500&display=swap" rel="stylesheet">
```

**Schaal**

| Niveau | Grootte | Gewicht | Tracking | Regelhoogte |
|---|---|---|---|---|
| Display (hero-kop) | `clamp(2.75rem, 8vw, 6.5rem)` | 700 | -0.035em | 1.02 |
| H2 (sectiekop) | `clamp(2rem, 5vw, 3.5rem)` | 700 | -0.025em | 1.08 |
| H3 (kaarttitel) | `1.375rem` | 700 | -0.01em | 1.25 |
| Body | `1.0625rem` (17px) | 400 | 0 | 1.65 |
| Label | `.75rem` HOOFDLETTERS | 500 | .14em | 1.4 |
| Cijfers (stats) | Space Grotesk, `tabular-nums` | 700 | -0.02em | 1 |

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

**Primaire knop:** pil, `--color-primary` met witte tekst, padding 14px 28px, 600. **Secundair:** pil, 1px rand `--color-border`, tekst voorgrond; hover rand violet.
**Kaart:** wit, 1px rand, radius 20px, `--shadow-sm`; hover: veert 6px omhoog en `--shadow-lg`. Ruimte bovenin voor afbeelding (16:10); tot er een screenshot is een violet-zachte placeholder met projectnummer.
**Statistiekkaart:** label (hoofdletters, gedempt), groot cijfer (Space Grotesk), kleine live-stip + bijtekst. Alleen echte data.
**Tags:** pil, `--color-primary-soft` achtergrond, violet tekst.
**Inputs:** wit, rand `--color-border`, radius 12px; focus: violette rand + ring 3px `rgba(124,58,237,.2)`. Labels altijd zichtbaar.
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
