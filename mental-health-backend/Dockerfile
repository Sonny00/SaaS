# Étape de build
FROM node:latest

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers
COPY . .

# Générer Prisma Client
RUN npx prisma generate

# Exposer le port de l'application
EXPOSE ${BACKEND_PORT}

# Commande de démarrage
CMD ["npm", "run", "start"]
