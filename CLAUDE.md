# Portfolio van Kaan Yücel

Persoonlijke portfoliosite. Live op https://kaanyucel.nl (ook kaanyucel.vercel.app).

## Opzet
- Eén statisch bestand: `index.html` (HTML + CSS inline, geen build-stap).
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
- De mailto-link naar kaan2008nl@hotmail.com staat boven het formulier als alternatief.
- Lokaal testen kan met `vercel dev` (de `/api`-route werkt niet via een gewone statische server).

## Stijl
- Luxe uitstraling: warm zwart (#0e0c0a) met champagne-goud (#c9a96e / #e2c99a) en ivoor tekst.
- Fonts (Google Fonts): Cormorant Garamond voor de naam (h1, goud cursief), Playfair Display voor koppen, Jost voor lopende tekst. Geen Inter of Times New Roman.
- Moet goed werken op mobiel.

## Inhoud
- Email: kaan2008nl@hotmail.com
- GitHub: https://github.com/ky0806
- LinkedIn: https://www.linkedin.com/in/kaan-y%C3%BCcel-961430445/
- Projectkaarten zijn nog placeholders.

## Werkwijze
- Kaan werkt op een Mac; geef terminalcommando's voor macOS.
- Na een wijziging: commit met een duidelijke boodschap en push naar main.
