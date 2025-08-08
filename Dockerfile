# Stage: static site
FROM nginx:alpine
COPY game /usr/share/nginx/html
# optional: expose 80 (default)
EXPOSE 80
# nginx default command runs automatically
