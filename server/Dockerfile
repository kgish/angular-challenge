FROM node:8.9.3-alpine

EXPOSE 3000 9229

COPY . /home/nestjs-api

WORKDIR /home/nestjs-api

RUN npm install && chmod a+x ./scripts/*.sh

CMD [ "./scripts/start.sh" ]
