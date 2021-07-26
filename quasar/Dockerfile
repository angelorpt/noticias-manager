# develop stage
FROM node:13.14-alpine as dev
WORKDIR /app
COPY package*.json ./
RUN yarn global add @quasar/cli
RUN yarn global add nodemon --prefix /app
COPY . .
# RUN yarn
RUN quasar dev
EXPOSE 8080

# build stage
FROM dev as build
RUN yarn
RUN quasar build

# production stage
FROM nginx:1.17.5-alpine as production
COPY --from=build /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
