FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/
COPY workers/package*.json workers/

RUN npm ci

COPY . .

ENV NODE_ENV=development

CMD ["sh", "-lc", "echo 'workers container ready'; sleep infinity"]
