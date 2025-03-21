# Énoncé de projet : Création d'une API pour la gestion d'itinéraires et d'un affichage sur carte interactive

Vous devez développer une API en Next.js utilisant MongoDB et Prisma pour mettre à disposition des itinéraires touristiques. Ces itinéraires seront utilisés dans un projet Symfony pour être affichés sur une carte interactive Leaflet. L'objectif est de permettre à un utilisateur de consulter des itinéraires avec des "locations", d'afficher un tracé sur une carte, et de mettre en évidence certains lieux particuliers comme des "must to see" (lieux à ne pas manquer). Il faudra configurer Tailwind sur le projet Symfony (https://tailwindcss.com/docs/installation/framework-guides/symfony)
 
### Partie 1 : API Next.js
Vous allez créer une API qui permettra de gérer les données suivantes :
- Location : un lieu possèdera un intitulé, des coordonnées GPS (décimal, par exemple 48.8566, 2.3522 pour Paris), une description et une adresse postale
- Itinerary (Itinéraire) : qui aura un titre, un ensemble de "locations", une description

A vous de voir comment agencer les différentes données et leur structure dans MongoDB. Un MCD est attendu au préalable

Les endpoints de l'API devront permettre les actions suivantes :
- GET /api/itineraries : Récupérer la liste de tous les itinéraires avec leurs détails.
- GET /api/itineraries/:id : Récupérer un itinéraire spécifique avec ses informations et les locations associées.
- POST /api/itineraries : Créer un nouvel itinéraire avec ses locations et un titre.
- POST /api/locations : Créer une nouvelle location avec ses informations (titre, coordonnées, description).
- PUT /api/itineraries/:id : Mettre à jour un itinéraire (ajouter des "must to see", modifier les locations, etc.).
- DELETE /api/itineraries/:id : Supprimer un itinéraire spécifique.

### Partie 2 : Frontend avec Symfony et Leaflet
Ensuite, vous devez créer une interface en Symfony / Tailwind qui consommera l'API Next.js et affichera les itinéraires sur une carte Leaflet.
Affichage des itinéraires sur une carte :
- Les locations seront représentées par des marqueurs sur la carte.
- Un tracé devra relier ces points dans l'ordre des itinéraires
- Différenciation des "must to see" :
  - Les "must to see" seront affichés sur la carte avec une couleur différente (par exemple, des marqueurs rouges ou une autre couleur pour les distinguer des autres points de l'itinéraire).
- Navigation sur la carte :
  - L'utilisateur pourra zoomer, déplacer la carte et visualiser les itinéraires avec un tracé connecté entre les points.