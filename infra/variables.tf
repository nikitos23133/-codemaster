provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "codemaster-vpc"
  cidr = "10.0.0.0/16"
  
  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
  
  enable_nat_gateway = true
}

module "ecs_cluster" {
  source = "terraform-aws-modules/ecs/aws"
  
  cluster_name = "codemaster-cluster"
  fargate_capacity_providers = ["FARGATE"]
}

resource "aws_db_instance" "main" {
  allocated_storage    = 20
  storage_type         = "gp2"
  engine               = "postgres"
  engine_version       = "13.7"
  instance_class       = "db.t3.micro"
  name                 = "codemaster"
  username             = var.db_user
  password             = var.db_password
  parameter_group_name = "default.postgres13"
  skip_final_snapshot  = true
}
