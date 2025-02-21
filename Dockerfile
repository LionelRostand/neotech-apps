FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /neotech-apps

# Copier uniquement package.json et package-lock.json pour optimiser le cache Docker
COPY  package*.json ./ 

# Installer les dépendances en mode production
RUN npm install --omit=dev

# Copier le reste des fichiers de l’application
COPY . .

# Exposer le port utilisé par l'application (changer si nécessaire)
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]
