# Développement

Prérequis : Node.js 22 ou plus récent et npm 10 ou plus récent.

```bash
npm ci
npm start
```

L'application est disponible localement sur `http://localhost:4200/`. Les contrôles complets sont lancés par `npm run check` : vérification TypeScript, validation des graphes, tests et build de production compatible avec `/AfficheTonFa/`.

Le build final est écrit dans `dist/web/browser`. Il comprend l'application, les données JSON, le bundle du Web Component sous `embed/` et l'exemple sans Angular sous `examples/vanilla/`.
