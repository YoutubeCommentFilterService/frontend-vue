#!/bin/bash

NGINX_SSH_PORT=$NGINX_SSH_PORT
NGINX_SSH_USER=$NGINX_SSH_USER
NGINX_SSH_DOMAIN=$NGINX_SSH_DOMAIN

NGINX_SSH_PATH="$NGINX_SSH_USER@$NGINX_SSH_DOMAIN"

ssh -q -o ConnectTimeout=5 -p $NGINX_SSH_PORT $NGINX_SSH_PATH exit

if [ $? -eq 0 ]; then
    echo "SSH 연결 성공"
else
    echo "SSH 연결 실패. 스크립트를 종료합니다."
    exit 1  # 연결 실패 시 종료
fi

bun run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed. Stopping deployment."
  exit 1
fi

scp -P $NGINX_SSH_PORT -r ./dist "$NGINX_SSH_PATH:~/"
ssh -p $NGINX_SSH_PORT "$NGINX_SSH_PATH" '. deploy-front.sh'