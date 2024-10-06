FROM node:alpine

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
CMD ["npm", "run", "start:prod"]


# [comando] [função] [-t -> tag] [nome do container] [conteudo -> "." se refere a partir da pasta atual]
# docker build -t m3p-backend-squad2 .
# docker exec m3p-backend-squad2 npx sequelize db:migrate
# docker-compose up 