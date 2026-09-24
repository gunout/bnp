# 🇪🇺 BNP CYBERDECK

<div align="center">

![Version](https://img.shields.io/badge/version-6.0.0-003399?style=for-the-badge&logo=semantic-release&logoColor=FFCC00)
![License](https://img.shields.io/badge/license-MIT-FFCC00?style=for-the-badge&logo=opensourceinitiative&logoColor=003399)
![Status](https://img.shields.io/badge/status-production-00ff9d?style=for-the-badge&logo=statuspage&logoColor=white)
![Made with](https://img.shields.io/badge/made%20with-HTML%20%2B%20JS-003399?style=for-the-badge&logo=javascript&logoColor=FFCC00)
![Euronext](https://img.shields.io/badge/Euronext-Paris-003399?style=for-the-badge&logo=euronext&logoColor=FFCC00)
![BNP Paribas](https://img.shields.io/badge/BNP-Paribas-00965e?style=for-the-badge&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Yahoo Finance](https://img.shields.io/badge/Yahoo-Finance-6001D2?style=for-the-badge&logo=yahoo&logoColor=white)

**Dashboard boursier cyberpunk pour Euronext Paris — données live, indicateurs techniques, comparaison multi-titres et Volume Profile.**

[Fonctionnalités](#-fonctionnalités) · [Installation](#-installation) · [Utilisation](#-utilisation) · [Architecture](#-architecture) · [Worker Cloudflare](#-worker-cloudflare) · [Roadmap](#-roadmap)

</div>

---

## 📖 Sommaire

- [À propos](#-à-propos)
- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Architecture](#-architecture)
- [Worker Cloudflare](#-worker-cloudflare)
- [Indicateurs techniques](#-indicateurs-techniques)
- [Raccourcis & interactions](#-raccourcis--interactions)
- [Roadmap](#-roadmap)
- [Stack technique](#-stack-technique)
- [Contribution](#-contribution)
- [Licence](#-licence)
- [Auteur](#-auteur)

---

## 🎯 À propos

**BNP CYBERDECK** est un dashboard boursier mono-fichier HTML/CSS/JS qui affiche en **temps réel** les données des principales valeurs d'**Euronext Paris** (CAC 40 et au-delà), avec une interface **cyberpunk** aux couleurs du drapeau européen 🇪🇺 (bleu `#003399` et or `#FFCC00`).

Conçu à l'origine pour suivre **BNP Paribas (BNP.PA)**, il couvre l'ensemble des grandes capitalisations françaises : LVMH, L'Oréal, TotalEnergies, Sanofi, Airbus, AXA, Schneider Electric, etc.

**Aucune dépendance, aucun build, aucune clé API** : un seul fichier `.html` à ouvrir dans un navigateur, propulsé par un **Cloudflare Worker** proxy CORS.

---

## 📸 Aperçu

![BNP Cyberdeck Screenshot](./screenshot.png)

### 🖥️ Layout 3 colonnes

| Zone | Contenu |
|------|---------|
| **Gauche** | Watchlist CAC 40 · Recherche · Alertes prix |
| **Centre** | Graphique bougies · Indicateurs · Timeframes · Comparaison |
| **Droite** | Carnet d'ordres · Flux Euronext · Horloge Paris |
| **Bas** | Barre de statut · Dernière MAJ |

### 🎨 Palette de couleurs

| Élément | Couleur | Hex |
|---------|---------|-----|
| Fond profond | ⬛ | `#0a0a14` |
| Bleu européen | 🔵 | `#003399` |
| Or européen | 🟡 | `#FFCC00` |
| Cyan néon | 🩵 | `#00d4ff` |
| Vert haussier | 🟢 | `#00ff9d` |
| Rouge baissier | 🔴 | `#ff0055` |
| Magenta | 🟣 | `#ff00ff` |

---

## ✨ Fonctionnalités

### 📊 Données de marché

- ✅ **Quotes live** via Yahoo Finance (différé 15 min)
- ✅ **Bougies OHLCV** sur 7 timeframes (1J → MAX)
- ✅ **Indice Euronext Paris** avec variation
- ✅ **Watchlist CAC 40** (15 valeurs) avec recherche instantanée
- ✅ **Carnet d'ordres** simulé avec spread et profondeur
- ✅ **Export CSV** des bougies affichées

### 📈 Indicateurs techniques

- ✅ **MA20 / MA50 / MA200** — Moyennes mobiles simples
- ✅ **Bollinger Bands** (MA20 ± 2σ) — Volatilité
- ✅ **MAD20** — Mean Absolute Deviation
- ✅ **RSI(14)** — Relative Strength Index
- ✅ **MACD(12,26,9)** — Convergence/Divergence
- ✅ **Volume Profile** — Distribution des volumes par prix + **POC**
- ✅ Toggles individuels activables à la volée

### ⚡ Comparaison & analyse

- ✅ **Comparaison multi-titres** (jusqu'à 3 simultanés)
- ✅ **Normalisation base 100** pour comparer les performances
- ✅ **Couleurs distinctes** par titre
- ✅ **Chips interactives** pour gérer les titres comparés

### 🔔 Alertes & notifications

- ✅ **Alertes de prix** configurables (≥ / ≤)
- ✅ **Notifications navigateur** natives
- ✅ **Toast + son** quand un seuil est franchi
- ✅ **Persistance** dans `localStorage`

### 🎨 Interface

- ✅ **Design cyberpunk** aux couleurs européennes
- ✅ **Mode sombre / clair** (persistant)
- ✅ **Responsive** (desktop / tablette / mobile)
- ✅ **Thème : grille néon, scanlines, glassmorphism**
- ✅ **Horloge Paris** en temps réel
- ✅ **Auto-refresh** toutes les 10 secondes

---

## 🚀 Installation

### Option 1 — Utilisation directe (recommandé)

1. **Télécharger** le fichier `BNP-CYBERDECK-v6.html`
2. **Ouvrir** dans un navigateur moderne (Chrome, Firefox, Edge, Safari)
3. C'est tout ✨

> Le worker Cloudflare `euronext.gunout.workers.dev` est déjà configuré et prêt à l'emploi. Aucune clé API n'est requise.

### Option 2 — Auto-hébergement du worker

Si tu veux héberger ton propre worker Cloudflare, exécute ces commandes :

    npm install -g wrangler
    wrangler login
    wrangler init euronext-proxy
    cd euronext-proxy
    wrangler deploy

Puis modifier dans le HTML la ligne :

    const CORS_PROXY = 'https://TON-WORKER.workers.dev/?url=';

---

## 🎮 Utilisation

### Navigation de base

| Action | Comment |
|--------|---------|
| **Changer de titre** | Cliquer sur une ligne du watchlist |
| **Rechercher** | Taper dans la barre 🔍 |
| **Changer de timeframe** | Boutons `1J` `1S` `1M` `3M` `6M` `1A` `MAX` |
| **Activer un indicateur** | Cliquer sur les toggles colorés |
| **Reset zoom** | Bouton `RESET ZOOM` en haut à droite |

### Comparaison multi-titres

1. Cliquer sur le bouton **layer-group** en haut à droite
2. La barre violette **"COMPARAISON (base 100)"** apparaît
3. Cocher jusqu'à **3 titres** dans le watchlist
4. Les lignes colorées se superposent sur le graphique
5. Retirer un titre : clic sur ✕ dans la chip ou décocher la case

### Volume Profile

1. Cliquer sur **VOL PROFILE** dans la barre d'indicateurs
2. L'histogramme horizontal apparaît à droite du graphique
3. La **barre dorée** indique le **POC** (Point of Control)
4. Se recalcule automatiquement à chaque changement

### Alertes de prix

1. Panneau gauche → section **"Alertes prix"**
2. Entrer un prix + choisir `≥` ou `≤`
3. Cliquer sur **AJOUTER**
4. **Autoriser les notifications** quand le navigateur le demande
5. 🔔 **Toast + son + notification** dès que le seuil est franchi

### Export CSV

Bouton **⬇** en haut à droite → télécharge un fichier de ce type :

    Date;Open;High;Low;Close;Volume
    2026-08-25;96.46;98.43;95.55;98.43;3489947
    2026-08-26;98.43;99.10;97.80;98.90;3120458

---

## 🏗️ Architecture

    ┌───────────────────────────────────────────────────────────────┐
    │                    NAVIGATEUR (client)                        │
    │  ┌─────────────────────────────────────────────────────┐      │
    │  │  BNP-CYBERDECK-v6.html                              │      │
    │  │  • Lightweight Charts 4.1 (rendu bougies)           │      │
    │  │  • Font Awesome 6.4 (icônes)                        │      │
    │  │  • Logique JS : fetch, indicateurs, alertes         │      │
    │  └─────────────────────────────────────────────────────┘      │
    │                            │                                  │
    │                            │ fetch(CORS_PROXY + url)          │
    │                            ▼                                  │
    └───────────────────────────────────────────────────────────────┘
                                 │
                                 │ HTTPS
                                 ▼
    ┌───────────────────────────────────────────────────────────────┐
    │           CLOUDFLARE WORKER (proxy CORS)                      │
    │           euronext.gunout.workers.dev                         │
    │  • Whitelist : query1.finance.yahoo.com                       │
    │  • Cache : 30s                                                │
    │  • User-Agent rotatif (anti rate-limit)                       │
    │  • Headers CORS : Access-Control-Allow-Origin: *              │
    └───────────────────────────────────────────────────────────────┘
                                 │
                                 │ HTTPS
                                 ▼
    ┌───────────────────────────────────────────────────────────────┐
    │              YAHOO FINANCE API                                │
    │              query1.finance.yahoo.com                         │
    │  • /v8/finance/chart/{TICKER}.PA                              │
    │  • Données Euronext Paris (différées 15 min)                  │
    └───────────────────────────────────────────────────────────────┘

### Flux d'une requête

    1. selectTicker('BNP')
    2. updateChart('BNP', '1M')
    3. fetchCandles('BNP', '1d', '1mo')
    4. fetch(CORS_PROXY + encodeURIComponent(url))
    5. Worker Cloudflare → Yahoo Finance
    6. JSON parsé → bougies normalisées
    7. applyCandlesToChart(candles)
    8. Calcul MA20/MA50/MA200/BB/MAD/RSI/MACD
    9. Rendu Lightweight Charts
    10. Si volProfileOn → calculateVolumeProfile()
        Si compareMode → refreshAllCompareSeries()

---

## ☁️ Worker Cloudflare

Code complet du worker à déployer sur `euronext.gunout.workers.dev` :

    const ALLOWED_HOSTS = [
      'query1.finance.yahoo.com',
      'query2.finance.yahoo.com'
    ];

    const CACHE_TTL = 30;
    const USER_AGENTS = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36'
    ];

    export default {
      async fetch(request, env, ctx) {
        if (request.method === 'OPTIONS') {
          return new Response(null, { status: 204, headers: corsHeaders() });
        }
        if (request.method !== 'GET') {
          return jsonError('Method not allowed', 405);
        }

        const reqUrl = new URL(request.url);
        const target = reqUrl.searchParams.get('url');
        if (!target) return jsonError('Missing url param', 400);

        let targetUrl;
        try { targetUrl = new URL(decodeURIComponent(target)); }
        catch { return jsonError('Invalid URL', 400); }

        if (!ALLOWED_HOSTS.includes(targetUrl.hostname)) {
          return jsonError('Only ' + ALLOWED_HOSTS.join(', ') + ' allowed', 403);
        }

        const cacheKey = new Request(targetUrl.toString(), { method: 'GET' });
        const cache = caches.default;
        let cached = await cache.match(cacheKey);
        if (cached) {
          const res = new Response(cached.body, cached);
          res.headers.set('X-Cache', 'HIT');
          applyCors(res.headers);
          return res;
        }

        const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
        let upstream;
        try {
          upstream = await fetch(targetUrl.toString(), {
            headers: {
              'User-Agent': ua,
              'Accept': 'application/json',
              'Referer': 'https://finance.yahoo.com/'
            },
            cf: { cacheTtl: CACHE_TTL, cacheEverything: true }
          });
        } catch (e) {
          return jsonError('Upstream error: ' + e.message, 502);
        }

        if (!upstream.ok) {
          return jsonError('Upstream ' + upstream.status, upstream.status);
        }

        const response = new Response(await upstream.arrayBuffer(), {
          status: 200,
          headers: {
            'Content-Type': upstream.headers.get('content-type') || 'application/json',
            'Cache-Control': 'public, max-age=' + CACHE_TTL,
            'X-Cache': 'MISS'
          }
        });
        applyCors(response.headers);
        ctx.waitUntil(cache.put(cacheKey, response.clone()));
        return response;
      }
    };

    function corsHeaders() {
      return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      };
    }

    function applyCors(headers) {
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      headers.set('Access-Control-Allow-Headers', 'Content-Type');
    }

    function jsonError(message, status) {
      status = status || 500;
      return new Response(
        JSON.stringify({ error: true, status: status, message: message }),
        { status: status, headers: { 'Content-Type': 'application/json', ...corsHeaders() } }
      );
    }

### Test rapide du worker

    curl "https://euronext.gunout.workers.dev/?url=https%3A%2F%2Fquery1.finance.yahoo.com%2Fv8%2Ffinance%2Fchart%2FBNP.PA%3Finterval%3D1d%26range%3D1d"

Réponse attendue : JSON complet Yahoo Finance avec `chart.result[0].meta.symbol = "BNP.PA"`.

---

## 📐 Indicateurs techniques

### MA — Moyenne Mobile Simple

    MA(n) = Σ(close[i]) / n    pour i = 0..n-1

- **MA20** : tendance court terme
- **MA50** : tendance moyen terme
- **MA200** : tendance long terme
- Croisement MA20/MA50 = signal golden cross / death cross

### Bollinger Bands

    MA20 ± 2 × σ(closes sur 20 périodes)

- Bande étroite → faible volatilité
- Prix hors bandes → surachat/survente

### MAD20 — Mean Absolute Deviation

    MAD = Σ|close[i] - mean| / n

- Mesure de dispersion **plus robuste** que l'écart-type

### RSI(14) — Relative Strength Index

    RSI = 100 - (100 / (1 + avgGain/avgLoss))

- **< 30** : survente (signal d'achat)
- **> 70** : surachat (signal de vente)

### MACD(12,26,9)

    MACD = EMA(12) - EMA(26)
    Signal = EMA(9) de MACD
    Histogramme = MACD - Signal

- **Histogramme positif** → momentum haussier
- **Croisement MACD/Signal** → retournement

### Volume Profile

- Découpe la plage de prix en **24 bins**
- Distribue le volume de chaque bougie sur les bins traversés
- **POC** (Point of Control) : bin avec le volume max = zone de support/résistance

---

## ⌨️ Raccourcis & interactions

| Élément | Action |
|---------|--------|
| **Ligne watchlist** | Sélectionne le titre |
| **Case violette** | Ajoute/retire de la comparaison |
| **Toggles indicateurs** | Active/désactive l'indicateur |
| **Molette souris sur chart** | Zoom avant/arrière |
| **Clic + drag sur chart** | Pan horizontal |
| **Clic + drag sur axe Y** | Zoom vertical |
| **RESET ZOOM** | Réinitialise la vue |
| **Bouton 🌙** | Bascule thème clair/sombre |
| **Bouton ⬇** | Export CSV |
| **Bouton layer-group** | Active mode comparaison |
| **Bouton chart-bar** | Active Volume Profile |

---

## 🗺️ Roadmap

### ✅ v1.0 → v6.0 (actuel)

- [x] Dashboard mono-ticker
- [x] Watchlist CAC 40
- [x] MA20 / MA50 / MA200
- [x] MAD20
- [x] Bollinger Bands
- [x] RSI / MACD
- [x] Alertes prix + notifications
- [x] Export CSV
- [x] Mode sombre/clair
- [x] Comparaison multi-titres (base 100)
- [x] Volume Profile + POC

### 🔜 v7.0 (en cours)

- [ ] WebSocket temps réel (Twelve Data)
- [ ] PWA installable (iOS/Android)
- [ ] Cloud sync des alertes (KV Cloudflare)
- [ ] Screener multi-critères
- [ ] Notifications push (Service Worker)

### 🔮 v8.0 (backlog)

- [ ] Analyse fondamentale (PER, dividende, ROE)
- [ ] Backtesting de stratégies
- [ ] Chat IA (analyse en langage naturel)
- [ ] Multi-exchange (Amsterdam, Bruxelles, Lisbonne)
- [ ] Mode replay historique

---

## 🛠️ Stack technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Frontend** | HTML5 / CSS3 / JavaScript ES2022 | — |
| **Charts** | [Lightweight Charts](https://github.com/tradingview/lightweight-charts) | 4.1.0 |
| **Icônes** | [Font Awesome](https://fontawesome.com/) | 6.4.0 |
| **Polices** | Orbitron + JetBrains Mono (Google Fonts) | — |
| **Proxy CORS** | [Cloudflare Workers](https://workers.cloudflare.com/) | — |
| **Données** | [Yahoo Finance](https://finance.yahoo.com/) | v8 API |
| **Storage** | `localStorage` (alertes + thème) | — |

### Compatibilité navigateurs

| Navigateur | Version min |
|-----------|-------------|
| Chrome / Edge | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Opera | 76+ |

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour proposer une amélioration :

1. **Fork** le projet
2. **Créer** une branche (`git checkout -b feature/ma-fonctionnalite`)
3. **Commit** (`git commit -m 'Ajout de ma fonctionnalité'`)
4. **Push** (`git push origin feature/ma-fonctionnalite`)
5. **Ouvrir** une Pull Request

---

## 📄 Licence

MIT License

Copyright (c) 2026 BNP CYBERDECK

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 👤 Auteur

<div align="center">

**BNP CYBERDECK** — Conçu pour la communauté financière francophone 🇫🇷🇪🇺

[![GitHub](https://img.shields.io/badge/GitHub-gunout-003399?style=for-the-badge&logo=github&logoColor=FFCC00)](https://github.com/gunout)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)

**⭐ Si ce projet t'aide, mets une étoile !**

</div>

---

<div align="center">

### 🇪🇺 Fait avec passion pour Euronext Paris 🇪🇺

*"Le marché est un mécanisme pour transférer l'argent des impatients vers les patients."* — Warren Buffett

**⚡ BNP CYBERDECK v6.0 ⚡**

</div>
