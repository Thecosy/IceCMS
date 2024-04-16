FROM nginx:latest
COPY dist/ /usr/share/nginx/html/   
#将项目根目录下 dist 文件夹中的所有文件复制到镜像中 /usr/share/nginx/html/ 目录下；
COPY default.conf /etc/nginx/conf.d/default.conf   
#将 default.conf 复制到 etc/nginx/conf.d/default.conf，用本地的 default.con