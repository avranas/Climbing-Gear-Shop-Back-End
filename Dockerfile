FROM node:16.13
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN cd client
RUN npm install
RUN pwd
RUN ls
RUN npm run build
RUN cd ..
RUN npm install
RUN npm start
EXPOSE 3000
ENTRYPOINT node index.js