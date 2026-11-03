# AfficheTonFa

AfficheTonFa est une plateforme statique de cartographie documentaire interactive. Son tableau Three.js met en scène des fiches sourcées et leurs relations, tandis qu'une vue documentaire reste accessible sans WebGL.

> Le tableau initial est volontairement vide. Les fiches seront ajoutées une par une, avec leurs sources et relations vérifiées. Le projet fournit un outil documentaire ; il ne déduit aucune culpabilité par association.

## Démarrage

```bash
npm ci
npm start
```

Ouvrez `http://localhost:4200/`. Maintenez `Maj` pendant le déplacement d'une fiche. La souris, le tactile et les flèches du clavier contrôlent la caméra.

## Vérification et build

```bash
npm run check
```

Le build GitHub Pages est généré dans `dist/web/browser` avec le chemin de base `/AfficheTonFa/`. Le déploiement reste manuel via l'action **Build and deploy GitHub Pages**, afin qu'aucune mise en production publique n'ait lieu sans décision explicite.

## Paquets

- `@affichetonfa/shared-types` : contrats et validation JSON ;
- `@affichetonfa/board-core` : moteur Three.js sans dépendance Angular ;
- `@affichetonfa/board-web-component` : intégration `<investigation-board>` ;
- `apps/web` : application Angular et route iframe.

Consultez la documentation d'[architecture](docs/architecture.md), du [contrat de données](docs/data-schema.md), de l'[intégration](docs/embedding.md), du [développement](docs/development.md) et de la [politique éditoriale](docs/editorial-policy.md).
