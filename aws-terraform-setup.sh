#!/bin/bash
# Установка AWS CLI
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Настройка профиля
aws configure set aws_access_key_id $AWS_ACCESS_KEY
aws configure set aws_secret_access_key $AWS_SECRET_KEY
aws configure set default.region us-east-1

# Установка Terraform
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
sudo apt-add-repository "deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main"
sudo apt-get update && sudo apt-get install terraform
