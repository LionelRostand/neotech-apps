
# Utiliser Node.js Alpine comme image de base
FROM node:18.20.7-alpine

# Installer Yarn et serve
ENV YARN_VERSION=1.22.22
RUN apk add --no-cache --virtual .build-deps-yarn curl gnupg tar \
    && export GNUPGHOME="$(mktemp -d)" \
    && for key in 6A010C5166006599AA17F08146C2130DFD2497F5; do \
        gpg --batch --keyserver hkps://keys.openpgp.org --recv-keys "$key" || \
        gpg --batch --keyserver keyserver.ubuntu.com --recv-keys "$key"; \
    done \
    && curl -fsSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
    && curl -fsSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz.asc" \
    && gpg --batch --verify yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
    && gpgconf --kill all \
    && rm -rf "$GNUPGHOME" \
    && mkdir -p /opt \
    && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
    && ln -s /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
    && ln -s /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
    && rm yarn-v$YARN_VERSION.tar.gz.asc yarn-v$YARN_VERSION.tar.gz \
    && apk del .build-deps-yarn

# Installer serve globalement
RUN npm install -g serve

# Créer un utilisateur non-root
RUN addgroup -g 1000 node \
    && adduser -u 1000 -G node -s /bin/sh -D node

# Définir le répertoire de travail
WORKDIR /neotech-apps

# Copier les fichiers package.json et yarn.lock
COPY package*.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile --production

# Copier le reste des fichiers
COPY . .

# Construction de l'application
RUN yarn build

# Définir les variables d'environnement
ENV NODE_ENV=production

# Exposer le port
EXPOSE 3008

# Commande pour démarrer l'application
CMD ["serve", "-s", "dist", "-l", "3008"]
