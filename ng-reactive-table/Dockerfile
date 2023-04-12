#stage 1
FROM  node:18.14.0-alpine as node
ARG mode=development
WORKDIR /app
COPY . .
RUN npm install
RUN buildType=dev && [[ $mode == development ]]  || buildType=prod; \
    npm run build-$buildType
#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/ng-reactive-table /usr/share/nginx/html
