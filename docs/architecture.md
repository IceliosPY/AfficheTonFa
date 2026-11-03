# Architecture

AfficheTonFa sépare quatre responsabilités.

1. `packages/shared-types` définit le contrat documentaire versionné et sa validation à l'exécution.
2. `packages/board-core` contient le moteur Three.js, le placement, les interactions et les fournisseurs de données. Il n'importe jamais Angular.
3. `packages/board-web-component` expose le moteur sous la balise standard `<investigation-board>`.
4. `apps/web` compose l'expérience éditoriale Angular, la vue documentaire et la route d'intégration iframe.

Le moteur dépend uniquement d'un objet `InvestigationGraph`. Le stockage est fourni par l'interface `DataProvider`; `StaticJsonDataProvider` sert le MVP et une future implémentation de `RestApiDataProvider` pourra remplacer les fichiers sans modifier le rendu.

Les positions explicites présentes dans les données sont prioritaires. Les autres sont calculées de façon déterministe par catégorie. Une simple mise à jour de filtres change la visibilité et l'opacité des objets existants sans reconstruire la scène. `destroy()` annule l'animation, retire les écouteurs et libère géométries, matériaux, textures, contrôles et renderer.
