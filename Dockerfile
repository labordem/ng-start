FROM node:lts-alpine AS builder
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build:prod

FROM nginx:alpine
COPY --from=builder /usr/src/app/dist/ng-start /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/localhost.crt /etc/nginx/localhost.crt
COPY docker/localhost.key /etc/nginx/localhost.key
