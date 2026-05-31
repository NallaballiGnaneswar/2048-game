FROM tomcat:9.0.0-jre17
COPY target/2048-game.war /home/ubuntu/apache-tomcat-10.1.55/webapps
EXPOSE 8080
CMD ["catalina.sh", "run"]
