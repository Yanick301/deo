# EZCENTIALS - Luxury Fashion Store

## Installation

1.  Installez les dépendances :
    ```bash
    npm install
    ```

2.  Lancez le projet :
    ```bash
    npm run dev
    ```

## Gestion des Images (Important)

Pour que les images s'affichent sur le site, vous devez créer manuellement les dossiers suivants à la racine du projet et y déposer vos fichiers images.

### Structure des dossiers

```
/ (Racine du projet)
├── public/
│   └── images/
│       │   # Images Générales (Accueil, Campagne, Fonds)
│       ├── hero_couple_winter_walk.jpg
│       ├── hero_couple_city_suit.jpg
│       ├── hero_couple_evening_wear.jpg
│       ├── category_preview_men.jpg
│       ├── category_preview_women.jpg
│       ├── campaign_poster.jpg
│       ├── reviews_background.jpg
│       │
│       └── products/
│           # Images des Produits (Format: categorie_objet_couleur_vue.jpg)
│           ├── men-clothing_coat_black_1.jpg
│           ├── men-clothing_coat_black_2.jpg
│           ├── men-clothing_coat_black_3.jpg
│           ├── women-clothing_dress_red_1.jpg
│           └── ... (voir required_images.txt pour la liste complète)
```

### Note sur les noms de fichiers
Le site est programmé pour chercher des noms de fichiers spécifiques. Veuillez consulter le fichier `required_images.txt` inclus dans ce projet pour voir la liste exacte des noms de fichiers à utiliser.

## Fonctionnalités
- **Authentification** : Supabase (Email/Password)
- **Langue** : Allemand par défaut (Support FR, EN, ES, PT)
- **Devise** : EUR
