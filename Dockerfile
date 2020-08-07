# Dockerfile
# 使用nginx做为镜像
FROM nginx
# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/
#用本地的 default.conf 配置来替换nginx镜像里的默认配置
COPY nginx.conf /etc/nginx/conf.d/default.conf
# 运行 docker build -t wp-view-v1 .
# docker run -d --name wp-view-v1 -p 80:80 wp-view-v1