
FROM alpine:3.17.2

RUN apk update
RUN apk upgrade
RUN apk add bash git helm openssh yq github-cli

RUN apk add \
    curl \
    docker \
    openrc

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NVM_VERSION 0.39.3
ENV NODE_VERSION 18.16.0

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN ls -asl $NVM_DIR/versions/node/v$NODE_VERSION/bin
RUN ls -asl $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules/npm/bin

RUN $NVM_DIR/versions/node/v$NODE_VERSION/bin/node -v

RUN $NVM_DIR/versions/node/v$NODE_VERSION/bin/npm install --global yarn

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

# Start docker on boot
RUN rc-update add docker boot

# Default commands to bash
ENTRYPOINT ["bash"]
