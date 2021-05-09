#!/usr/bin/env bash

npm i -g agentkeepalive --save
npm i -g npm@7.12.0
npm i -D typescript \
          electron \
          prettier \
          eslint \
          @types/node \
          @typescript-eslint/parser \
          @typescript-eslint/eslint-plugin \
          @electron-forge/cli
npx electron-forge import