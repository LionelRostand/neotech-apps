# Étape 1: Build de l'application avec Node.js
FROM node:18.20.7-alpine AS builder

# Activer Corepack pour utiliser Yarn directement
RUN corepack enable

# Définir le répertoire de travail
WORKDIR /neotech-apps

# Copier uniquement les fichiers nécessaires pour l'installation des dépendances
COPY package*.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le reste du projet
COPY . .

# Construire l'application
RUN yarn build

# Étape 2: Image finale optimisée
FROM node:18.20.7-alpine

# Installer serve globalement
RUN npm install -g serve

# Créer un utilisateur non-root
RUN addgroup -g 1000 node && adduser -u 1000 -G node -s /bin/sh -D node

# Passer en utilisateur sécurisé
USER node

# Définir le répertoire de travail
WORKDIR /neotech-apps

# Copier uniquement les fichiers nécessaires pour exécuter l'application
COPY --from=builder /neotech-apps/dist ./dist

# Définir les variables d'environnement
ENV NODE_ENV=production

# Exposer le port
EXPOSE 3008

# Commande pour démarrer l'application
CMD ["serve", "-s", "dist", "-l", "3008"]
