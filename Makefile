
DOCKER_COMPOSE = docker-compose
DC_FILE = docker-compose.yml

# Cibles
.PHONY: up down build frontend backend db logs

# Lancer tous les services (frontend, backend, db)
up:
	$(DOCKER_COMPOSE) -f $(DC_FILE) up -d

# Arrêter tous les services
down:
	$(DOCKER_COMPOSE) -f $(DC_FILE) down

# Construire ou reconstruire les images Docker
build:
	$(DOCKER_COMPOSE) -f $(DC_FILE) build

# Démarrer uniquement le service frontend
frontend:
	$(DOCKER_COMPOSE) -f $(DC_FILE) up -d frontend

# Démarrer uniquement le service backend
backend:
	$(DOCKER_COMPOSE) -f $(DC_FILE) up -d backend

# Démarrer uniquement la base de données
db:
	$(DOCKER_COMPOSE) -f $(DC_FILE) up -d db

# Afficher les logs de tous les services
logs:
	$(DOCKER_COMPOSE) -f $(DC_FILE) logs -f
