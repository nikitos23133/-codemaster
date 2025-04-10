// infra/lib/main-stack.ts
import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';

export class MainStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cluster = new ecs.Cluster(this, 'Cluster', {
      clusterName: 'main-cluster'
    });

    new ecs.FargateService(this, 'AuthService', {
      cluster,
      taskDefinition: new ecs.FargateTaskDefinition(this, 'AuthTask'),
      desiredCount: 3
    });
  }
}
