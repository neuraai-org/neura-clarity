FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY backend/package*.json backend/
COPY frontend/package*.json frontend/
COPY workers/package*.json workers/

RUN npm ci

COPY . .

ENV NODE_ENV=development
EXPOSE 3001

CMD ["sh", "-lc", "npm run dev --workspace @weekly-clarity/frontend -- --hostname 0.0.0.0 --port 3001"]
