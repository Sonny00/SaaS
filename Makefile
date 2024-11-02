DOCKER_COMPOSE = docker-compose
DC_FILE = docker-compose.yml

# Cibles
.PHONY: up down build frontend backend db logs mongo mongo_express

# Lancer tous les services dans l'ordre souhaité
up:
	$(DOCKER_COMPOSE) -f $(DC_FILE) up mongo
	@echo "Waiting for MongoDB to be ready..."
	@until docker exec $(shell docker-compose -f $(DC_FILE) ps -q mongo) mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; do \
	  sleep 5; \
	done
	$(DOCKER_COMPOSE) -f $(DC_FILE) up -d mongo_express backend frontend

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

# Démarrer uniquement le service mongo
mongo:
	$(DOCKER_COMPOSE) -f $(DC_FILE) up -d mongo

# Démarrer uniquement mongo_express (après que MongoDB est prêt)
mongo_express:
	$(DOCKER_COMPOSE) -f $(DC_FILE) up -d mongo_express

# Afficher les logs de tous les services
logs:
	$(DOCKER_COMPOSE) -f $(DC_FILE) logs -f
