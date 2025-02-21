
# Étape 1 : Utilisation d'une image Node.js optimisée pour la construction
FROM node:18-alpine AS build

# Définition du répertoire de travail dans le conteneur
WORKDIR /neotech-apps

# Copier uniquement les fichiers package.json et package-lock.json pour optimiser le cache Docker
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Configuration de l'environnement de production
FROM node:18-alpine

# Installation d'un serveur HTTP léger
RUN npm install -g serve

# Définition du répertoire de travail
WORKDIR /neotech-apps

# Copier uniquement les fichiers de build depuis l'étape précédente
COPY --from=build /neotech-apps/dist ./dist

# Définir les variables d'environnement
ENV NODE_ENV=production

# Exposer le port par défaut utilisé par serve
EXPOSE 3008

# Lancer l'application avec serve
CMD ["serve", "-s", "dist", "-l", "3008"]
