FROM node:alpine

# Instala o dockerize
ENV DOCKERIZE_VERSION v0.8.0
RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

WORKDIR /usr/src/app

# copia o package e instala os requisitos
COPY package*.json ./
RUN npm install

# copia os restantes dos arquivos para o docker (menos os do .dockerignore)
# metodo | arquivos | local (WORKDIR)
COPY . . 

# porta do container (interno)
EXPOSE ${APP_PORT}

# comando que roda quando inicia
ENTRYPOINT  ["dockerize", "-wait", "tcp://db:5432", "-timeout", "20s", "npm", "run", "start:prod"]


# [comando] [função] [-t -> tag] [nome do container] [conteudo -> "." se refere a partir da pasta atual]
# docker build -t m3p-backend-squad2 .
# docker exec m3p-backend-squad2 npx sequelize db:migrate
# docker-compose up 