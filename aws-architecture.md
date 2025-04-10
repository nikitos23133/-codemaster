Frontend (S3 + CloudFront)
↓
API Gateway
↓
ECS/Fargate Services (Auth, Courses, Payments)
↓
RDS (PostgreSQL) / ElastiCache (Redis)
↓
EventBridge (Event Bus)
↓
Lambda Functions (Analytics, Notifications)
↓
S3 (Storage) + Redshift (Data Warehouse)
