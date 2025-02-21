
# Définir le répertoire de travail dans le conteneur
WORKDIR /neotech-apps

# Copier uniquement package.json et package-lock.json pour installer les dépendances en cache
COPY package*.json ./

# Installer les dépendances en mode production
RUN npm install --only=production

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port (remplacez 3000 par le port de votre app)
EXPOSE 3000

# Démarrer l'application
CMD ["node", "server.js"]

