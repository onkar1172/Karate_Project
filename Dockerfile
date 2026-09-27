# ==========================================
# STAGE 1: Build React Frontend
# ==========================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# ==========================================
# STAGE 2: Build Spring Boot Backend
# ==========================================
FROM maven:3.9-eclipse-temurin-21-alpine AS backend-builder
WORKDIR /app/backend

COPY backend/pom.xml ./
RUN mvn dependency:go-offline -B

COPY backend/src ./src
COPY --from=frontend-builder /app/frontend/dist ../frontend/dist

RUN mvn package -DskipTests

# ==========================================
# STAGE 3: All-in-One Container (MySQL + Backend + Frontend on single port 8080)
# ==========================================
FROM eclipse-temurin:21-jre-jammy

# Install MySQL Server
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get install -y mysql-server netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy built Spring Boot executable JAR (contains embedded frontend static files)
COPY --from=backend-builder /app/backend/target/*.jar app.jar

# Copy entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Environment variables for MySQL & Application
ENV MYSQL_DATABASE=karate_db \
    MYSQL_USER=root \
    MYSQL_PASSWORD=root \
    PORT=8080

EXPOSE 8080

ENTRYPOINT ["/app/docker-entrypoint.sh"]
