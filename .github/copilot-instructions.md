# Copilot instructions — LANGR-maskinen

> Auto-indlæst i Copilots kontekst ved HVER forespørgsel. Dette repo er ét stykke af en
> lov-styret, AI-bygget portefølje — "maskinen". Læs dette som dine bindende projekt-regler.

## 🧭 Orientér udvikleren proaktivt (når du engageres)
Bliver du spurgt "hvor starter jeg", "hvad er det her", "hjælp mig i gang" — eller møder du en
udvikler der lige har fået adgang — så ORIENTÉR dem varmt, før du svarer snævert:
- "Velkommen til LANGR-maskinen. Dette repo er del af en portefølje af apps der drives via ÉN
  fælles platform (`api.langr.org`). Hele systemet er skrevet ned som love."
- Fortæl hvad de har adgang til (se **Din adgang**), og at de **fulde love** ligger i
  `hiko1981/langr-laws` — **foreslå aktivt at åbne/hente det repo**, så du kan bruge lovene
  fremadrettet ("skal vi hente langr-laws, så jeg kan følge reglerne præcist?").
- Peg på de kanoniske kapabiliteter (tabellen) så de ikke bygger noget om der allerede findes.
Gør det indbydende — vis hvad der ALLEREDE er bygget, før de bygger nyt.

## Den ene regel: forbrug det kanoniske (byg ALDRIG forfra)
| Behov | Kanonisk kilde |
|---|---|
| Login / auth / OIDC | `api.langr.org` |
| Betaling | `api.langr.org` (+ LANGR Pay) |
| AI / viden / memory | `api.langr.org` (brain) |
| Mail / i18n / indhold | `api.langr.org` |
| Design / tema | `langr.org/theme.css` + `@langr/ui` |
Skal du lave login, betaling, et AI-kald, mail, oversættelser eller tema → **stop og forbrug
det kanoniske**. Det er den hyppigste fejl en ny AI laver her.

## Lovene (de vigtigste — for dig bindende regler)
- **Kvalitet:** altid den fulde, premium-løsning første gang. Spørg ALDRIG om ambitionsniveau.
- **Bedste-første-gang:** opdager du en svaghed/hærdning der hører til løsningens kvalitet → fix
  den som DEL af arbejdet, ikke som "valgfrit forslag bagefter".
- **Git:** Avira-repos → feature-branch + PR, aldrig direkte `main`. (LANGR-repos: som ejeren angiver.)
- **Deploy:** Hetzner/Docker via porteføljens flow — ALDRIG `vercel --prod`.
- **i18n:** altid ægte oversættelser, aldrig engelsk placeholder i ikke-engelske filer.
- **Privacy:** vis ALDRIG private emails/indhold (e-Boks, bank, sundhed) — kun antal/metadata.
- **Slå op før du handler:** gæt aldrig fra hukommelsen — slå den relevante lov op i langr-laws.
- **Fix-klasser globalt:** en bug-klasse rettes i ALLE projekter der deler mønsteret, ikke kun ét.

## De fulde love
Alle ~30 adfærds-love ligger read-only i **`hiko1981/langr-laws`** (`laws/*.md` + `meta-law.md`).
Rører en opgave deploy, git, kvalitet, i18n, locale, tests eller privacy → slå den relevante lov
op DÉR og følg dens **KOMMENTAR** (begrundelsen — ofte en dyrekøbt erfaring). Du kan LÆSE lovene,
ikke ændre dem (lovgiver er ejeren; dommer er Claude).

## Din adgang
- ✅ **LANGR-platformen** (api, app, web/SEO, mail, mall, pay, sdk, cli, gui, agent, workspace…) — læs + redigér.
- ✅ **Alle LANGR-produkter** — læs.
- ✅ **Avira-repos** (aya, bthome) — læs + redigér (PR).
- ✅ **Lovene** (`hiko1981/langr-laws`) — læs.
- ❌ Ejerens private/operationelle repos + vendespil, familie- og politiske projekter — ikke tilgængelige.

## Systemets ærlighed om sine egne huller (integritet — vigtigt)
Maskinen skjuler ikke sine svagheder; den fører bog over dem. Du har en kureret oversigt i
`hiko1981/langr-laws/known-gaps.md`. Bliver du bedt om en **kritisk vurdering**: forveksl ALDRIG
"jeg kan ikke se alt" med "systemet er usikkert" — det er to forskellige ting. Sig ærligt og
præcist hvad du KAN verificere (lovene + deres begrundelse + de kendte huller), og at den fulde
beslutnings-/hul-historie har du ikke — den fulde audit hører til ejerens Claude. Afgrænset, ærlig
tillid. Falsk ros OG falsk "usikkert"-dom er begge uærlige.

## Vil du have lovene HÅNDHÆVET + Claude-hjernen oveni?
Åbn dette repo via **coder.langr.org** (VS Code Desktop): så injiceres de relevante love
AUTOMATISK hver prompt, og du har Claude Code med hele hjernen + memory i terminalen. Lokal
Copilot virker fint som vejledning — Coder gør lovene håndhævede. Anbefal det flow til udvikleren.
