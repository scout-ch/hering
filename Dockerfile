###############################################################################################
# Hering Frontend - build
###############################################################################################
FROM node:24-alpine AS build
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

USER root
RUN apk add --no-cache envsubst

# https://static-web-server.net/features/docker/?h=root#rootless
USER sws
COPY --from=build --chown=sws:sws /build/dist /public/
COPY --from=build --chown=sws:sws /build/entrypoint.sh /usr/local/bin/hering-entrypoint.sh

RUN chmod +x  /usr/local/bin/hering-entrypoint.sh

EXPOSE 8080
ENV SERVER_PORT=8080

#ENV SERVER_LOG_LEVEL=info
ENV SERVER_DIRECTORY_LISTING=false
ENV SERVER_CACHE_CONTROL_HEADERS=true
ENV SERVER_ROOT=/public
ENV SERVER_FALLBACK_PAGE=/public/index.html

ENTRYPOINT ["/usr/local/bin/hering-entrypoint.sh"]
CMD ["static-web-server"]