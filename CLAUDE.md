# Portfolio van Kaan Yücel

Persoonlijke portfoliosite. Live op https://kaanyucel.nl (ook kaanyucel.vercel.app).

## Opzet
- `index.html` (HTML + CSS + JS inline, geen build-stap), plus `api/contact.js`, `vendor/motion.js` (de animatiebibliotheek Motion 12.23.12, vastgezet en lokaal geserveerd, geen CDN) en eventueel afbeeldingen in `images/`. Geen Node/npm, geen framework.
- Design system: `design-system/kaan-yucel-portfolio/MASTER.md` (gemaakt met de ui-ux-pro-max skill). Lees dat vóór je de stijl aanpast.
- Hosting: Vercel (account ky0806), gekoppeld aan GitHub-repo ky0806/Portfolio, branch `main`.
- Elke `git push` naar `main` zet de site automatisch live.
- Domein kaanyucel.nl via TransIP (DNS: A-record @ → Vercel, CNAME www → Vercel; www redirect 308 naar kaanyucel.nl).

## Contactformulier
- Formulier staat in `index.html` (sectie `#contact`) en doet een `fetch` POST (JSON: name, email, message, website) naar `/api/contact`.
- `api/contact.js` is een Vercel serverless functie (geen npm-pakketten): valideert de invoer (alle velden verplicht, geldig e-mailadres, max. 100/200/5000 tekens), stuurt via een directe fetch naar de Resend API (https://api.resend.com/emails) en geeft JSON terug (200, 400, 405, 500). Foutdetails gaan alleen naar de serverlogs.
- Spambeveiliging: verborgen honeypot-veld `website`. Is het ingevuld, dan antwoordt de functie 200 maar wordt er niets verstuurd.
- Afzender is voorlopig `Portfolio <onboarding@resend.dev>`; `reply_to` is het e-mailadres van de bezoeker. Onderwerp: "Nieuw bericht via kaanyucel.nl van [naam]".
- Environment variables (Vercel → Settings → Environment Variables, daarna opnieuw deployen):
  - `RESEND_API_KEY`: API-sleutel uit het Resend-account.
  - `CONTACT_TO`: ontvanger van de berichten (kaanspam@outlook.com).
- Met de testafzender `onboarding@resend.dev` mailt Resend alleen naar het adres van het Resend-account zelf. Voor andere ontvangers eerst het domein kaanyucel.nl verifiëren in Resend en de afzender aanpassen.
- In het contactblok staat bewust geen e-mailadres; bezoekers gebruiken daar alleen het formulier. Wel staat kaan@finsera.nl als `mailto:`-link in het midden van de navigatiebalk (`.nav-mail`, verborgen onder 960 px breed).
- Meldingen aan bezoekers staan in `translations` (zie "Taal"). De API geeft bij fouten een `code` (`missing_fields`, `too_long`, `invalid_email`, `send_failed`, ...) en de pagina vertaalt die; de Engelse `error`-tekst uit de API wordt niet getoond. Het onderwerp van de mail aan Kaan is altijd Nederlands.
- Lokaal testen kan met `vercel dev` (de `/api`-route werkt niet via een gewone statische server).

## Taal (NL | EN)
- De site is tweetalig; Nederlands is de standaard, ook als de browser Engels is. De HTML zelf is Nederlands (`<html lang="nl">`, Nederlandse title en meta description), zodat zoekmachines en bezoekers zonder JavaScript Nederlands zien.
- Alle teksten staan in het object `translations` (`nl` en `en`) bovenaan het script onderaan `index.html`. Elementen koppelen met `data-i18n="sleutel"` (tekst) of `data-i18n-placeholder="sleutel"` (placeholder). Nieuwe tekst: sleutel in beide talen toevoegen, attribuut op het element zetten en dezelfde Nederlandse tekst als fallback in de HTML laten staan.
- De switch rechtsboven in de nav bestaat uit twee `<button>`s met `aria-pressed`. Bij wisselen veranderen ook `<html lang>`, `<title>` en de meta description.
- Alleen een klik op EN wordt bewaard in `localStorage` (sleutel `lang`, met try/catch). Een klein script in de `<head>` verbergt de pagina kort (`i18n-pending`) voor wie eerder EN koos, zodat er geen flits van Nederlands is.
- Namen, GitHub, LinkedIn en tech-tags (HTML, Python, ...) worden niet vertaald.

## Projecten toevoegen
- Alle projecten staan in de lijst `projects` bovenaan het script onderaan `index.html`. De kaarten worden daaruit gebouwd; een project toevoegen of aanpassen = alleen die lijst wijzigen.
- Velden per project: `title` en `description` (gewone tekst, of `{ nl: '...', en: '...' }` voor beide talen), `tags` (technieken als labels), `demo` (link live demo), `code` (link GitHub), `image` (pad naar screenshot).
- Een leeg `demo` of `code` laat die knop weg. Een leeg `image` toont een placeholder met het projectnummer. Elk project heeft ook `details` (langere tekst voor het uitgeklapte paneel).
- Screenshot: bijvoorbeeld `images/project-1.jpg`, verhouding 16:10, ca. 1200×750 px, liefst onder 200 KB. Zet de bestanden in de map `images/` en zet het pad in `image`.
- De labels "Live demo" en "Code" staan in `translations` (`projects.demo`, `projects.code`).
- De drie huidige projecten zijn placeholders (de links van project 1 en 2 zijn voorbeeldwaarden en moeten nog vervangen worden).

## Navigatie, klokje en animaties
- Navigatie is sticky (`.site-nav`): links het klokje, in het midden het e-mailadres (mailto) (Weert, NL, tijd in Europe/Amsterdam, elke minuut bijgewerkt), rechts Projecten (verborgen onder 520 px), de Contact-knop en de taalswitch. Geen logo of profielfoto.
- Tagline `hero.tag` ("Student · AI Engineer · Builder") en openingszin `hero.statement` staan in `translations`. In de zin scheidt `|` het gewone deel van het gekleurde deel; het onzichtbare "word joiner"-teken in "AI-⁠toepassing" voorkomt een regelafbreking na het streepje.
- Animaties: alleen **Motion** (`vendor/motion.js`, globale `Motion`), met spring physics. Alle spring-instellingen staan in het object `spring` bovenaan het script (`default` 120/20/1, `hover` 300/25). Geen andere animatiebibliotheek, en alleen `transform` en `opacity` worden geanimeerd.
- Bewegingen: hero-kop vliegt woord voor woord in, statistiekkaart telt op en kantelt max ±8° met de muis, zwevende vormen met parallax (`.shape`, `data-speed`), projectkaarten vliegen in (inView), veren bij hover en klappen verend uit tot een paneel (FLIP), tools-band loopt door en vertraagt verend bij hover (de tool onder de cursor wordt bovendien groter en kleurt in de accentkleur), tijdlijnlijn groeit mee met scrollen.
- `prefers-reduced-motion`: alleen fade-ins, geen parallax/tilt/marquee. Op touchschermen werken hover en tilt niet (Motion `hover()` en de `(hover: hover)`-check).
- Statistiekkaart: echte GitHub-gegevens van `ky0806` (publieke API, geen sleutel): aantal repo's, aantal commits van de nieuwste repo en dagen sinds de laatste push. Lukt het ophalen niet, dan blijven er streepjes staan. Geen verzonnen cijfers.
- Tools-band: lijst `tools`. Tijdlijn: lijst `timeline` (tekst of `{ nl, en }`). Beide staan naast `projects` bovenaan het script.

## Stijl
- Fris, modern, technisch en persoonlijk, licht met veel witruimte (zie het design system). Hoofdkleur is diep pruim/wijnrood #58143B (kleur uit een afbeelding van Kaan). Kleuren staan als CSS-variabelen bovenaan `index.html`: achtergrond #FBF8FA, tekst #1A0F17, gedempt #6A5F68, rand #EBDFE7, accent #58143B, hover #70205B, zacht #F5E8F0, vormen #C27AA6, cyaan (#0891B2) alleen voor live-stipjes. Het gekleurde deel van de hoofdkop (`.statement .accent`) heeft een gradient van #58143B naar #C0397E (`--color-gradient-from/to`); `paintGradient()` laat die over alle woorden doorlopen.
- Fonts (Google Fonts), strak en licht, niet robotisch (voorbeeld van Kaan: Space Grotesk): **Space Grotesk** (300/400/500) voor bijna alles: koppen (gewicht 300, strakke letterafstand), kleine UI-tekst, knoppen, cijfers en alinea's. Cormorant Garamond cursief alleen voor de naam. Variabelen: `--font-display`, `--font-ui`, `--font-body` (alle drie Space Grotesk) en `--font-name`. Geen Inter, DM Sans, Oxanium, Share Tech Mono of Times New Roman. De "1" van Space Grotesk heeft een haakje; houd cijfers dun (300) met normale letterafstand, anders botst hij tegen het volgende cijfer.
- Moet goed werken op mobiel (getest op 320, 375 en desktop).

## Inhoud
- Email (zichtbaar op de site): kaan@finsera.nl
- Email (oud, privé): kaan2008nl@hotmail.com
- GitHub: https://github.com/ky0806
- LinkedIn: https://www.linkedin.com/in/kaan-y%C3%BCcel-961430445/
- Projectkaarten zijn nog placeholders (zie "Projecten toevoegen").

## Werkwijze
- Kaan werkt op een Mac; geef terminalcommando's voor macOS.
- Na een wijziging: commit met een duidelijke boodschap en push naar main.
