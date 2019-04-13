#!/bin/bash
npm install
npm audit fix
nodemon start
exec "$@"