FROM node:22

WORKDIR /

ENV something

COPY package.json package-lock.json .
RUN npm ci
COPY . .

EXPOSE 3001

CMD npm run start
