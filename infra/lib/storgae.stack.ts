import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3Events from 'aws-cdk-lib/aws-s3-notifications';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { createName } from '../utils/cdk.utils';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import path = require('path');

export class StorageStack extends cdk.Stack {
  public readonly table: dynamodb.ITable;
  public readonly bucket: s3.IBucket;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaTrigger = new lambdaNodejs.NodejsFunction(
      this,
      createName('handleVideoUploadEvent'),
      {
        runtime: Runtime.NODEJS_16_X,
        functionName: createName('handleVideoUploadEvent'),
        entry: path.join(__dirname, '../functions/handleVideoUploadEvent.ts'),
        handler: 'handler',
        bundling: {
          minify: false,
          sourceMap: false,
        },
        memorySize: 128,
        timeout: cdk.Duration.seconds(30),
        environment: {
          NODE_ENV: process.env.NODE_ENV!,
        },
      }
    );

    this.bucket = new s3.Bucket(this, createName('courseAppVideos'), {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      cors: [
        {
          allowedHeaders: ['*'],
          allowedMethods: [
            s3.HttpMethods.DELETE,
            s3.HttpMethods.HEAD,
            s3.HttpMethods.GET,
            s3.HttpMethods.POST,
            s3.HttpMethods.PUT,
          ],
          allowedOrigins: ['*'],
          exposedHeaders: [
            'x-amz-server-side-encryption',
            'x-amz-request-id',
            'x-amz-id-2',
            'ETag',
          ],
          id: 'S3CORSRuleId1',
          maxAge: 3000,
        },
      ],
    });

    this.bucket.grantReadWrite(lambdaTrigger);

    this.bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED,
      new s3Events.LambdaDestination(lambdaTrigger)
    );

    this.table = new dynamodb.Table(this, createName('CourseAppTable'), {
      tableName: createName('CourseAppTable'),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      partitionKey: {
        name: 'pk',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'sk',
        type: dynamodb.AttributeType.STRING,
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    this.table.grantReadWriteData(lambdaTrigger);
  }
}
