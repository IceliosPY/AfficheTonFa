# Contrat de données v1

Le contrat canonique est défini par les interfaces strictes de `packages/shared-types/src/index.ts`. Chaque graphe JSON utilise `schemaVersion: "1.0"` et contient :

- `id`, `title`, `description`, `notice`, `updatedAt` ;
- `nodes`, dont chaque entrée possède un identifiant stable, une catégorie, un résumé, une description et au moins une source ;
- `edges`, dont chaque entrée référence deux nœuds existants et précise type, description, statut documentaire, date de vérification et sources ;
- une configuration visuelle facultative.

Les catégories sont `organization`, `person`, `case`, `event` et `document`. Les types de relations sont `organizational`, `historical`, `judicial`, `event` et `documentary`. Les statuts sont `established`, `alleged`, `disputed` et `archived`.

`npm run validate:data` vérifie les champs obligatoires, les identifiants dupliqués, l'intégrité référentielle et la présence de sources. Le MVP ne contient que des données fictives. Toute donnée réelle doit suivre le processus de vérification décrit dans [politique éditoriale](editorial-policy.md).
