FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests

FROM eclipse-temurin:21-jdk-alpine
COPY --from=build /home/app/target/*.jar app.jar
EXPOSE 3000
ENV PORT 3000
ENTRYPOINT ["java","-jar","app.jar"]