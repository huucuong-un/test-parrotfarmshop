FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app



COPY mvnw .
COPY .mvn .mvn

COPY pom.xml .


RUN ./mvnw dependency:resolve

COPY src src

CMD ["./mvnw", "spring-boot:run"]




