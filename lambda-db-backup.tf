# infra/backups.tf
resource "aws_db_instance" "main" {
  # ... existing config ...
  backup_retention_period = 35
  backup_window           = "07:00-09:00"
}

resource "aws_lambda_function" "backup_handler" {
  filename      = "backup_lambda.zip"
  function_name = "db-backup-handler"
  role          = aws_iam_role.lambda_backup.arn
  handler       = "index.handler"
  runtime       = "nodejs14.x"

  environment {
    variables = {
      S3_BUCKET = aws_s3_bucket.backups.id
    }
  }
}

resource "aws_cloudwatch_event_rule" "backup_schedule" {
  name                = "daily-backup"
  schedule_expression = "cron(0 12 * * ? *)"
}

resource "aws_cloudwatch_event_target" "backup_lambda" {
  rule      = aws_cloudwatch_event_rule.backup_schedule.name
  target_id = "lambda"
  arn       = aws_lambda_function.backup_handler.arn
}
