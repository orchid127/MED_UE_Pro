FROM node:20 AS frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

FROM maven:3.9-eclipse-temurin-21 AS backend
WORKDIR /app
COPY . .
COPY --from=frontend /app/client/dist ./client/dist
RUN mvn package -DskipTests
ENTRYPOINT ["java", "-jar", "target/Med-1.0-SNAPSHOT.jar"]
