FROM node:14.15.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --only=prod
COPY . .
RUN npm install @angular/cli @angular-builders/custom-webpack
RUN npm run build:prod

FROM nginx:stable-alpine
COPY --from=builder /app/dist/ng-start /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/localhost.crt /etc/nginx/localhost.crt
COPY docker/localhost.key /etc/nginx/localhost.key
