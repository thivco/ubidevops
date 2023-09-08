# FROM node:18
# WORKDIR /app
# COPY . /app
# RUN npm install
# EXPOSE 80
# CMD [ "node", "server.js"]


FROM httpd:2.4
COPY ./ /usr/local/apache2/htdocs/
EXPOSE 80