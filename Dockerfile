FROM node:20 AS frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

FROM eclipse-temurin:21-jdk AS backend
WORKDIR /app
COPY . .
COPY --from=frontend /app/client/dist ./client/dist
RUN ./mvnw package -DskipTests
ENTRYPOINT ["java", "-jar", "target/your-app-jar-with-dependencies.jar"]
