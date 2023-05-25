FROM nginx:latest
COPY . /usr/share/nginx/html
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT ['./entrypoint.sh']
