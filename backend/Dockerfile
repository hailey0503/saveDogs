 FROM node:latest

RUN mkdir -p /usr/Desktop/dog_transport_backend

WORKDIR /user/Desktop/dog_transport_backend

COPY package.json /usr/Desktop/dog_transport_backend

RUN npm istall

COPY . /usr/Desktop/dog_transport_backend

EXPOSE 4800

CMD [ "node", "server.js" ]