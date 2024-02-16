# Estágio 1: Construção da aplicação
FROM node:21.6.1-bullseye-slim as build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências, incluindo as de desenvolvimento
RUN npm install

# Copia os arquivos do projeto para o diretório de trabalho
COPY ./ .

# Constrói a aplicação usando a CLI do NestJS
RUN npm run build

# Estágio 2: Configuração do ambiente de execução
FROM node:21.6-alpine as runtime

WORKDIR /usr/src/app

# Copia os arquivos de dependência
COPY --from=build /usr/src/app/package*.json ./

# Instala apenas as dependências de produção
RUN npm install --only=production

# Copia a aplicação construída do estágio anterior
COPY --from=build /usr/src/app/dist ./dist

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para executar a aplicação
CMD ["node", "dist/main"]
