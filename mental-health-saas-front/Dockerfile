# Utilise node:latest pour le développement
FROM node:latest

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tous les fichiers
COPY . .

# Exposer le port de l'application
EXPOSE ${FRONTEND_PORT}

# Commande de démarrage en mode développement
CMD ["npm", "run", "dev"]
