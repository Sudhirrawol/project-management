FROM node:20

WORKDIR /project-service

COPY package*.json ./

RUN npm ci
# → clean install from package-lock.json
# → useful for Docker/CI builds

COPY . .

RUN npm run build

EXPOSE 4002

CMD ["npm","start"]