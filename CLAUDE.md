# Portfolio van Kaan Yücel

Persoonlijke portfoliosite. Live op https://kaanyucel.nl (ook kaanyucel.vercel.app).

## Opzet
- Eén statisch bestand: `index.html` (HTML + CSS + JS inline, geen build-stap, geen bibliotheken), plus `api/contact.js` en eventueel afbeeldingen in `images/`.
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
- Het e-mailadres staat bewust niet zichtbaar in het contactblok; bezoekers gebruiken alleen het formulier.
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
- Een leeg `demo` of `code` laat die knop weg. Een leeg `image` toont een placeholder in zwart/goud met het projectnummer.
- Screenshot: bijvoorbeeld `images/project-1.jpg`, verhouding 16:10, ca. 1200×750 px, liefst onder 200 KB. Zet de bestanden in de map `images/` en zet het pad in `image`.
- De labels "Live demo" en "Code" staan in `translations` (`projects.demo`, `projects.code`).
- De drie huidige projecten zijn placeholders (de links van project 1 en 2 zijn voorbeeldwaarden en moeten nog vervangen worden).

## Profielfoto en klokje
- Profielfoto: zet je foto op `images/profile.jpg`. Vierkant, 400×400 px, gezicht in het midden (wordt rond bijgesneden en getoond op ca. 38 px), liefst onder 100 KB. Tot er een foto staat toont de site een gouden silhouet.
- Klokje in de hero: toont "Weert, NL" met de tijd in Europe/Amsterdam en werkt elke minuut bij (script onderaan, `tick`). De plaatsnaam staat in de HTML (`.clock`).
- Navigatie is sticky (`.site-nav`): foto + K.Y. links, rechts Projecten (verborgen onder 520 px), de Contact-knop en de taalswitch.
- Openingszin onder de naam: `hero.statement` in `translations`. Let op het onzichtbare "word joiner"-teken in "AI-⁠toepassing", dat voorkomt een regelafbreking na het streepje.

## Stijl
- Luxe uitstraling: warm zwart (#0e0c0a) met champagne-goud (#c9a96e / #e2c99a) en ivoor tekst.
- Fonts (Google Fonts): Cormorant Garamond voor de naam (h1, goud cursief), Playfair Display voor koppen, Jost voor lopende tekst. Geen Inter of Times New Roman.
- Moet goed werken op mobiel.

## Inhoud
- Email: kaan2008nl@hotmail.com
- GitHub: https://github.com/ky0806
- LinkedIn: https://www.linkedin.com/in/kaan-y%C3%BCcel-961430445/
- Projectkaarten zijn nog placeholders (zie "Projecten toevoegen").

## Werkwijze
- Kaan werkt op een Mac; geef terminalcommando's voor macOS.
- Na een wijziging: commit met een duidelijke boodschap en push naar main.
