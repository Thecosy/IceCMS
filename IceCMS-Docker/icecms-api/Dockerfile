# 该镜像需要依赖的基础镜像
FROM openjdk:latest

# 指定维护者的名字
MAINTAINER ttice

# 将指定目录下的jar包复制到docker容器的/export/Apps/springboot-admin目录下
COPY main.jar /export/Apps/springboot-admin/main.jar

# 声明服务运行在8080端口
EXPOSE 8181

# 指定docker容器启动时运行jar包
ENTRYPOINT ["java","-Xmx128m","-Xss256k","-XX:ParallelGCThreads=2","-Djava.compiler=NONE", "-jar","/export/Apps/springboot-admin/main.jar"]

