# PROJECT MAP — MIZAN

## [TECH_STACK]

### Technologies

- **HTML5** : structure des pages.
- **CSS3** : mise en forme et design responsive.
- **JavaScript Vanilla (ES Modules)** : logique de l'application.
- **Fetch API** : communication avec les API.
- **json-server** : API REST locale pour gérer les articles.
- **localStorage** : cache et préférences utilisateur.
- **Git & GitHub** : gestion des versions et partage du code.

### Data Sources

- **XAUS API** : récupération des prix de l'or et de l'argent.
- **json-server** : gestion des articles du catalogue.
- **Database file** : `db.json`.
- **Catalogue endpoint** : `/articles`.
- **Local API URL** : `http://localhost:3000`.

### Technical Constraints

- Aucun framework JavaScript.
- JavaScript organisé en modules ES.
- Une seule fonction réseau `request(path, options)` dans `js/shared/api.js`.
- Utilisation de `async/await` pour les requêtes.
- Délai maximum des requêtes : 8 secondes.
- Erreurs normalisées : `{ type, status, message }`.
- Aucun `alert()` ni `confirm()` : utilisation de modales personnalisées.
- Aucune donnée distante insérée avec `innerHTML`.
- Les données distantes sont affichées avec `textContent`.
- Cache et préférences enregistrés sous des clés versionnées.
- Les prix des articles du catalogue sont affichés en MAD.
- Le sélecteur de devise de la page des métaux reste conservé.
- Aucun framework ni système d'authentification.
- Le design existant reste la référence.

---

## [SYSTEM_FLOW]

### 1. Initialisation

- `index.html` charge `js/metals/main.js`.
- `catalogue.html` charge `js/catalogue/catalogue-main.js`.
- Chaque point d'entrée initialise uniquement sa page.
- Les préférences enregistrées sont restaurées depuis `localStorage`.

### 2. Page principale — Métaux

- `main.js` initialise la page principale.
- `shared/api.js` gère les requêtes vers XAUS API.
- `ui.js` affiche les prix et les informations nécessaires.
- `calculator.js` gère l'estimation de la valeur des bijoux.
- `history.js` gère les données historiques.
- La devise sélectionnée est conservée après le rechargement.

### 3. Page Catalogue

- `catalogue-main.js` initialise la page du catalogue.
- `catalogue.js` gère les opérations sur les articles et leur validation.
- `catalogue-state.js` conserve l'état actuel du catalogue.
- `catalogue-ui.js` affiche les articles, les formulaires et les messages.
- `shared/api.js` centralise toutes les requêtes réseau.
- `shared/storage.js` gère le cache et les préférences.

### 4. Gestion des articles

Les opérations disponibles :

- **GET** : récupérer la liste et le détail des articles.
- **POST** : ajouter un article.
- **PUT** : remplacer toutes les informations d'un article.
- **PATCH** : modifier certaines informations d'un article.
- **DELETE** : supprimer un article après confirmation.

Les articles possèdent les propriétés suivantes :

- `id`
- `title`
- `description`
- `price`
- `status`
- `createdAt`

Aucun champ de catégorie supplémentaire n'est ajouté.

### 5. Recherche, filtre et tri

- Recherche par titre, sans distinction entre majuscules et minuscules.
- Filtrage par statut.
- Tri par titre, prix ou date.
- Recherche, filtre et tri peuvent être combinés.
- Un bouton permet de réinitialiser les filtres.

### 6. Gestion des erreurs

Les erreurs réseau sont centralisées dans `request()`.

Types d'erreurs :

- `offline` : absence de connexion.
- `network` : problème de connexion.
- `http` : réponse HTTP en erreur.
- `parse` : réponse JSON invalide.
- `timeout` : délai maximum dépassé.

Chaque action déclenchant une requête doit produire un retour visuel.

### 7. États de l'interface

Chaque écran du catalogue doit gérer :

- **Loading** : chargement des données.
- **Success** : données affichées correctement.
- **Empty** : aucun article ou aucun résultat.
- **Error** : erreur avec explication et possibilité de réessayer.

### 8. Cache et mode hors-ligne

- Chaque GET réussi est enregistré dans `localStorage`.
- Les données du catalogue utilisent la clé `catalogue:v1:items`.
- Le cache contient les données et leur horodatage.
- Durée de validité : 5 minutes.
- En cas d'indisponibilité de l'API, le cache peut être affiché.
- Un bandeau indique la date des données et l'état hors-ligne.
- Le bouton « Rafraîchir » force une nouvelle requête.
- Un cache corrompu est ignoré sans bloquer l'application.

### 9. Préférences utilisateur

Les préférences conservées après rechargement :

- Articles favoris.
- Filtre actif.
- Tri sélectionné.
- Devise sélectionnée pour la page des métaux.
- Thème clair ou sombre.

Les prix du catalogue restent affichés en MAD.

---

## [ARCHITECTURE]

### Project Structure

```text
Mizan-Part-II-Clone/
│
├── .vscode/
│   └── settings.json
│
├── index.html
├── catalogue.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── metals/
│   │   ├── main.js
│   │   ├── ui.js
│   │   ├── calculator.js
│   │   └── history.js
│   │
│   ├── catalogue/
│   │   ├── catalogue-main.js
│   │   ├── catalogue.js
│   │   ├── catalogue-state.js
│   │   └── catalogue-ui.js
│   │
│   └── shared/
│       ├── api.js
│       └── storage.js
│
├── samples/
│   ├── prices-response.json
│   └── history-response.json
│
├── captures/
│
├── db.json
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
└── PROJECT_MAP.md
```

### File Responsibilities

| File | Responsibility |
|---|---|
| `index.html` | Structure de la page principale |
| `catalogue.html` | Structure de la page du catalogue |
| `css/style.css` | Styles des pages |
| `js/metals/main.js` | Initialisation de la page principale |
| `js/metals/ui.js` | Affichage de la page principale |
| `js/metals/calculator.js` | Calcul de la valeur estimée des bijoux |
| `js/metals/history.js` | Gestion de l'historique des métaux |
| `js/catalogue/catalogue-main.js` | Point d'entrée de la page catalogue |
| `js/catalogue/catalogue.js` | Opérations CRUD et validation des articles |
| `js/catalogue/catalogue-state.js` | Gestion de l'état du catalogue |
| `js/catalogue/catalogue-ui.js` | Affichage du catalogue, formulaires et messages |
| `js/shared/api.js` | Client API unique et fonction `request()` |
| `js/shared/storage.js` | Cache et préférences dans localStorage |
| `db.json` | Données locales utilisées par json-server |
| `package.json` | Scripts et dépendances du projet |
| `package-lock.json` | Versions exactes des dépendances installées |
| `samples/` | Exemples de réponses JSON des métaux |
| `captures/` | Captures des états de l'application |
| `.vscode/settings.json` | Paramètres locaux de VS Code |
| `README.md` | Documentation et instructions d'utilisation |
| `PROJECT_MAP.md` | Mémoire architecturale du projet |
| `.gitignore` | Fichiers exclus du suivi Git |

### Architecture Principles

- Chaque module possède une responsabilité claire.
- Les appels réseau passent uniquement par `request()`.
- La logique métier est séparée de l'affichage.
- L'état de l'application est séparé du DOM.
- Le stockage local est centralisé dans `storage.js`.
- Les modules existants de la page principale sont conservés.
- Le code reste simple, lisible et facile à maintenir.
- Aucune fonctionnalité hors du périmètre du projet n'est ajoutée.

---

## [ORPHANS & PENDING]

### Pending Development

- [ ] Vérifier que tous les imports correspondent à la nouvelle structure des dossiers.
- [ ] Vérifier que les deux pages chargent les bons fichiers JavaScript.
- [ ] Configurer `json-server` et vérifier `/articles`.
- [ ] Centraliser les appels réseau dans `request()`.
- [ ] Développer la lecture et l'affichage des articles.
- [ ] Ajouter la recherche, le filtre et le tri.
- [ ] Développer la création et la validation des articles.
- [ ] Développer la modification avec PUT et PATCH.
- [ ] Développer la suppression avec confirmation et rollback.
- [ ] Gérer les quatre états de l'interface.
- [ ] Ajouter le cache avec TTL de 5 minutes.
- [ ] Ajouter le mode hors-ligne et le rafraîchissement forcé.
- [ ] Persister les favoris et les préférences.
- [ ] Tester les erreurs réseau et HTTP.
- [ ] Vérifier l'absence d'erreurs non gérées dans la console.
- [ ] Mettre à jour le README.
- [ ] Préparer les captures et la démonstration finale.

### Optional Bonus

- [ ] Ajouter un panneau réseau repliable affichant la méthode, l'URL, le statut et la durée des requêtes.