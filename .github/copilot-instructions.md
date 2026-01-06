# Instructions pour agents AI sur ce projet web statique

## Vue d’ensemble
Ce projet est un site web statique composé de plusieurs pages HTML, d’un fichier CSS global et d’un script JavaScript principal. Il n’utilise pas de framework ni de backend.

## Structure principale
- Les pages sont : `index.html`, `about.html`, `contact.html`, `services.html`, `team.html`.
- Les composants réutilisables sont dans `header.html` et `footer.html`.
- Les styles sont centralisés dans `style.css`.
- Le dossier `images/` contient les ressources graphiques (ex : `logo.jpg`).
- La logique JavaScript est dans `app.js`.

## Conventions et patterns
- **Modularité HTML** : Les fichiers `header.html` et `footer.html` sont destinés à être inclus dans chaque page. Si une automatisation est nécessaire, documenter ou automatiser l’inclusion.
- **Navigation** : Les liens de navigation sont gérés dans le header. Vérifier la cohérence des liens entre les pages.
- **Styles** : Tous les styles sont dans `style.css`. Respecter la structure existante et éviter la duplication de règles.
- **Images** : Utiliser le dossier `images/` pour toutes les ressources graphiques. Référencer les images avec des chemins relatifs.
- **JavaScript** : Centraliser la logique dans `app.js`. Si une fonctionnalité JS est ajoutée, documenter son point d’entrée et son impact sur les pages.

## Workflows développeur
- **Aucune compilation ou build** : Les fichiers sont servis tels quels. Pour prévisualiser, ouvrir les fichiers HTML dans un navigateur.
- **Debug** : Utiliser les outils de développement du navigateur pour inspecter le DOM, le CSS et le JS.
- **Tests** : Aucun test automatisé n’est présent. Les vérifications se font manuellement via le navigateur.

## Points d’intégration
- **Aucune dépendance externe** détectée (pas de package manager, pas de CDN référencé dans la structure).
- **Ajout de pages** : Dupliquer une page existante et adapter le contenu, puis mettre à jour la navigation dans le header.

## Exemples de patterns
- Inclusion du header/footer :
  ```html
  <!-- Inclure header.html et footer.html dans chaque page -->
  <!-- ...existing code... -->
  ```
- Ajout d’une image :
  ```html
  <img src="images/logo.jpg" alt="Logo">
  ```
- Ajout d’un script :
  ```html
  <script src="app.js"></script>
  ```

## Fichiers clés à consulter
- `index.html` : Page d’accueil, point d’entrée principal.
- `header.html` et `footer.html` : Structure commune.
- `style.css` : Toutes les règles de style.
- `app.js` : Logique JavaScript globale.

---

Pour toute modification, respecter la structure existante et documenter les changements si des patterns nouveaux sont introduits.
