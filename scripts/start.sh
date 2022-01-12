#!/bin/bash
cd /home/ubuntu/ALL-CON/server

export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USERNAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')

export ACCESS_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')

export TWILIO_SID=$(aws ssm get-parameters --region ap-northeast-2 --names TWILIO_SID --query Parameters[0].Value | sed 's/"//g')
export TWILIO_PHONE=$(aws ssm get-parameters --region ap-northeast-2 --names TWILIO_PHONE --query Parameters[0].Value | sed 's/"//g')
export TWILIO_TOKEN=$(aws ssm get-parameters --region ap-northeast-2 --names TWILIO_TOKEN --query Parameters[0].Value | sed 's/"//g')

export EMAIL_ID=$(aws ssm get-parameters --region ap-northeast-2 --names EMAIL_ID --query Parameters[0].Value | sed 's/"//g')
export EMAIL_PASS=$(aws ssm get-parameters --region ap-northeast-2 --names EMAIL_PASS --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js