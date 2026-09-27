#!/bin/bash
set -e

echo "========================================================="
echo "   Starting Royal Karate Association All-in-One Container"
echo "========================================================="

# 1. Start MySQL daemon
echo "Starting MySQL service..."
service mysql start

# 2. Wait for MySQL to initialize
echo "Waiting for MySQL server to accept connections..."
while ! mysqladmin ping --silent; do
    sleep 1
done

echo "MySQL started successfully."

# 3. Setup Database & Credentials
echo "Configuring MySQL database '$MYSQL_DATABASE'..."
mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$MYSQL_PASSWORD';" || true
mysql -u root -p"$MYSQL_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS \`$MYSQL_DATABASE\`;" || true
mysql -u root -p"$MYSQL_PASSWORD" -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '$MYSQL_PASSWORD'; FLUSH PRIVILEGES;" || true

echo "Database '$MYSQL_DATABASE' ready!"

# 4. Launch Spring Boot application (serving both REST API & Frontend React SPA on port 8080)
echo "Starting Spring Boot Application (Frontend + Backend on shared port $PORT)..."
exec java -jar /app/app.jar
