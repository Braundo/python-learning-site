ARG arch
FROM --platform=linux/${arch}
FROM nginx:alpine
COPY . /usr/share/nginx/html
