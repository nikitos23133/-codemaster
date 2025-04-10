# infra/ecr.tf
resource "aws_ecr_repository" "app" {
  name                 = "codemaster-app"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_lifecycle_policy" "app" {
  repository = aws_ecr_repository.app.name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "Keep last 30 images"
      action       = { type = "expire" }
      selection    = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 30
      }
    }]
  })
}
