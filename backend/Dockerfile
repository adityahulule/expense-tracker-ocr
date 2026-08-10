# ---------- Build stage ----------
FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests


# ---------- Runtime stage ----------
FROM eclipse-temurin:17-jre

# Install Tesseract OCR
RUN apt-get update && \
    apt-get install -y tesseract-ocr && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 10000

CMD ["java", "-jar", "app.jar"]