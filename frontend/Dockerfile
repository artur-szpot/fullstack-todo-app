FROM node:22 AS builder

COPY package.json package-lock.json ./
RUN npm ci && npm cache clean --force

COPY . .
RUN npm run build

FROM nginx

COPY --from=builder build /usr/share/nginx/html/

EXPOSE 80
