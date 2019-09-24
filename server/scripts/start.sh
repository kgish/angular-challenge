#!/bin/sh

yarn build
yarn migration:run

if [[ "$NODE_ENV" == "production" ]] ; then
  yarn start:prod
else
  yarn start:dev
fi
