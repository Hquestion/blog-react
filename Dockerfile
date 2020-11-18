# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage

RUN mkdir -p /home/app

WORKDIR /home/app

COPY package*.json /home/app
COPY yarn.lock /home/app

RUN yarn

COPY . /home/app

RUN npm run build
# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15

COPY --from=build-stage /home/app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

# TODO 配置代理
COPY --from=build-stage ./nginx-proxy.conf /etc/nginx/extra-conf.d/nginx-proxy.conf

