# Sito di LoganGameStudios

Sito statico per GitHub Pages: nessuna compilazione, basta caricare i file.

## Come pubblicarlo
1. Su GitHub, con l'account **LoganGameStudios**, crea un repository pubblico chiamato esattamente
   `LoganGameStudios.github.io`.
2. Carica **il contenuto** di questa cartella (non la cartella stessa) nella radice del repository:
   `index.html`, `.nojekyll`, `assets/`, `privacy/`.
   - Dal sito: *Add file > Upload files*, trascina tutto, poi *Commit changes*.
   - Oppure da terminale, dentro questa cartella:
     ```
     git init
     git add .
     git commit -m "Primo sito"
     git branch -M main
     git remote add origin https://github.com/LoganGameStudios/LoganGameStudios.github.io.git
     git push -u origin main
     ```
3. In *Settings > Pages* controlla che la sorgente sia *Deploy from a branch*, ramo `main`, cartella `/ (root)`.
4. Dopo un paio di minuti il sito è su **https://logangamestudios.github.io/**

## Indirizzi utili
- Informativa privacy di Robin the Hound (da mettere nella Play Console):
  `https://logangamestudios.github.io/privacy/robin-the-hound.html`
- Pagina di Robin sul Play Store, usata dal pulsante "Google Play":
  `https://play.google.com/store/apps/details?id=it.logangames.RobinTheHound`

## Cosa c'è
- `index.html`: pagina principale in italiano e inglese (pulsante IT/EN in alto; la prima volta usa la lingua del browser).
- `privacy/robin-the-hound.html`: l'informativa di `ClaudeHood/PRIVACY.md`. Se cambi quella, aggiorna anche questa.
- `privacy/sito.html`: privacy e cookie del sito (niente cookie, niente risorse di terzi: tienilo così o aggiorna la pagina).
- `assets/style.css`: colori e stile (carta chiara con i toni ruggine e ambra dell'Albero antico in autunno).
  Le immagini del logo vengono da `LoganGameStudios-kit` (variante "Ruggine più chiaro", creata con `autunno-logo.js`).
- `assets/fonts.css` e `assets/fonts/`: caratteri ospitati sul sito (licenze OFL incluse), al posto di Google Fonts.
- `assets/slider.js`: slider delle schermate (frecce, puntini, dito, tastiera).
- `assets/`: logo, avatar, anteprima per i link (`og.png`), icona del sito (`favicon.png`).
- `assets/games/`: icone e schermate dei giochi.
  - `robin/`: slider di Robin (da `ClaudeHood/Screenshots/sito`, ridotte a 1560x720 JPEG).
  - `jusy/it/` e `jusy/en/`: slider di Jusy, una serie per lingua (da
    `JusiThornWoodAdventure/ArtSource/screenshots_sito` e `.../en`, ridotte a 1600x900 JPEG).
    Il sito mostra la serie della lingua scelta.

**Cache:** GitHub Pages fa tenere i file in cache per 10 minuti. Quando cambi CSS o script, alza il numero `?v=` nei
collegamenti di tutte le pagine (es. `style.css?v=2` → `?v=3`), così i visitatori scaricano subito la versione nuova.

## Da aggiungere più avanti
- Quando Jusy Thornwood's Adventure esce: nella sua scheda cambia "In arrivo" in "Disponibile", aggiungi il pulsante
  Google Play (`it.logangames.JusyThornWoodAdventure`) e la sua pagina in `privacy/`.
