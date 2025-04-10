# autoscaling.tf
resource "aws_autoscaling_policy" "cpu_scaling" {
  name                   = "cpu-scaling-policy"
  scaling_adjustment     = 2
  adjustment_type        = "ChangeInCapacity"
  cooldown               = 300
  autoscaling_group_name = aws_autoscaling_group.web.name
}

resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "high-cpu-utilization"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  evaluation_periods  = "2"
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = "120"
  statistic           = "Average"
  threshold           = "70"
  dimensions = {
    AutoScalingGroupName = aws_autoscaling_group.web.name
  }
  alarm_actions = [aws_autoscaling_policy.cpu_scaling.arn]
}
