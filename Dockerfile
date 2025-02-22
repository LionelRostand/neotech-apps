
# Étape 1 : Utilisation d'une image Node.js optimisée (Alpine pour un poids réduit)
FROM node:18-alpine AS build

# Définition du répertoire de travail dans le conteneur
WORKDIR /neotech-apps

# Copier uniquement les fichiers package.json et package-lock.json pour optimiser le cache Docker
COPY package*.json ./

# Installation des dépendances en mode production
RUN npm install --only=production

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application (si nécessaire, pour les apps TypeScript ou React/Vue/Angular)
RUN npm run build

# Étape 2 : Utilisation d'une image plus légère pour l'exécution
FROM node:18-alpine

# Définition du répertoire de travail
WORKDIR /neotech-apps

# Copier uniquement les fichiers nécessaires depuis l'image de build
COPY --from=build /neotech-apps /neotech-apps

# Définir les variables d'environnement
ENV NODE_ENV=production

# Exposer le port utilisé par l'application
EXPOSE 3000

# Lancer l'application
CMD ["node", "server.js"]
