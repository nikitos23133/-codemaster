# infra/main.tf
provider "aws" {
  region = "us-east-1"
}

resource "aws_ecs_cluster" "main" {
  name = "codemaster-cluster"
}

resource "aws_autoscaling_group" "web" {
  min_size = 2
  max_size = 10
  target_group_arns = [aws_lb_target_group.web.arn]
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  version = "3.14.2"
  # Конфигурация VPC
}
