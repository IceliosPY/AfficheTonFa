# Intégration externe

## Web Component

```html
<script src="https://iceliospy.github.io/AfficheTonFa/embed/investigation-board.js"></script>
<investigation-board data-url="https://example.org/graph.json" theme="dark" height="700px"></investigation-board>
```

L'URL distante doit autoriser CORS. Il est aussi possible d'affecter directement un objet validable : `board.graph = graph`.

Méthodes publiques : `loadGraph(graphOrUrl?)`, `selectNode(id)`, `focusNode(id)`, `resetCamera()`, `setFilters(filters)`, `setTheme(theme)` et `destroy()`.

Événements composés : `board-ready`, `node-selected`, `edge-selected`, `camera-changed` et `board-error`.

## iframe

La route est `/#/embed/{graphId}?theme=dark&origin=https%3A%2F%2Fsite-hote.example`. `origin` doit être une origine HTTPS exacte. En son absence, seule l'origine du site AfficheTonFa est acceptée.

La page hôte peut envoyer `select-node`, `focus-node`, `reset-camera`, `set-filters` et `set-theme`. Les messages sont acceptés uniquement si `event.source` est la fenêtre parente et si `event.origin` correspond exactement à l'origine configurée. La frame renvoie `board-ready`, `node-selected` et `edge-selected` vers cette même origine.
