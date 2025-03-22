#!/bin/bash

bun run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Stopping deployment."
  exit 1
fi

NGINX_SSH_PORT=$NGINX_SSH_PORT
NGINX_SSH_USER=$NGINX_SSH_USER
NGINX_SSH_DOMAIN=$NGINX_SSH_DOMAIN

NGINX_SSH_PATH="$NGINX_SSH_USER@$NGINX_SSH_DOMAIN"

scp -P $NGINX_SSH_PORT -r ./dist "$NGINX_SSH_PATH:~/"
ssh -p $NGINX_SSH_PORT "$NGINX_SSH_PATH" '. deploy-front.sh'