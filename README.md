# Sports MMA

Application web Next.js pour suivre les événements MMA à venir.

## Fonctionnalités

- Vue liste des événements avec filtres par organisation.
- Vue calendrier avec indicateurs par jour.
- Affichage des détails d’un événement, dont la date et le lieu.
- Navigation simple entre les organisations MMA suivies par l’application.

## Installation

Prérequis:

- Node.js 18 ou plus.
- `pnpm`.

Installer les dépendances:

```bash
pnpm install
```

## Lancement en local

Démarrer le serveur de développement:

```bash
pnpm dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Commandes utiles

```bash
pnpm build
pnpm start
pnpm lint
```

## Structure

- `app/`: pages et layout Next.js.
- `components/`: interface utilisateur, calendrier et liste d'événements.
- `lib/`: logique de récupération et de transformation des données.
- `types/`: types TypeScript partagés.

## Notes

Les données d’événements sont affichées côté client avec des vues liste et calendrier pour comparer rapidement les organisations et les dates.
