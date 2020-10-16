FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install @angular/cli @angular-builders/custom-webpack
RUN npm install --only=prod
RUN npm run build:prod

FROM nginx:alpine
COPY --from=builder /app/dist/ng-start /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/localhost.crt /etc/nginx/localhost.crt
COPY docker/localhost.key /etc/nginx/localhost.key
