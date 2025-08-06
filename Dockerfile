###############################################################################################
# Hering Frontend - build
###############################################################################################
FROM node:22-alpine AS build
RUN apk add --no-cache dos2unix

WORKDIR /build

COPY ./docker/entrypoint.sh ./entrypoint.sh
RUN dos2unix entrypoint.sh

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

###############################################################################################
# Hering Frontend - production
###############################################################################################
# https://static-web-server.net/
FROM joseluisq/static-web-server:2-alpine
ENV TZ=Europe/Zurich

RUN addgroup -g 1001 -S app \
    && adduser -u 1001 -S app -G app \
    && apk add --no-cache envsubst

COPY --from=build --chown=app:app /build/entrypoint.sh /hering-entrypoint.sh
RUN chmod +x  /hering-entrypoint.sh

COPY --from=build --chown=app:app /build/dist /public/

EXPOSE 8080
ENV SERVER_PORT=8080

#ENV SERVER_LOG_LEVEL=info
ENV SERVER_FALLBACK_PAGE=/public/index.html
ENV SERVER_DIRECTORY_LISTING=false
ENV SERVER_CACHE_CONTROL_HEADERS=true

ENTRYPOINT ["/hering-entrypoint.sh"]
CMD ["static-web-server"]