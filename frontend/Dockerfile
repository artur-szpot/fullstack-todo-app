FROM node:22 as builder

COPY package.json package-lock.json .
RUN npm ci && npm cache clean --force

COPY . .
RUN npm run build

FROM nginx

COPY from=builder dist /usr/share/nginx/html

EXPOSE 80
