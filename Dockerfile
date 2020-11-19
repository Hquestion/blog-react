# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage

RUN mkdir -p /home/app

RUN mkdir -p /ssl

WORKDIR /home/app

COPY package*.json /home/app
COPY yarn.lock /home/app

RUN yarn

COPY . /home/app

RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

COPY --from=build-stage /home/app/build/ /usr/share/nginx/html

# 拷贝ssl证书到/ssl目录
COPY build-docker/server.key /ssl

COPY build-docker/server.pem /ssl

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY build-docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY build-docker/nginx-proxy.conf /etc/nginx/extra-conf.d/nginx-proxy.conf

