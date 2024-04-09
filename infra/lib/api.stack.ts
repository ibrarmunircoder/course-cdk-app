import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambdaNodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import { createName } from '../utils/cdk.utils';
import { IRestApiStackProps } from '../bin/types';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import path = require('path');

export class RestApiStack extends cdk.Stack {
  public readonly api: apiGateway.RestApi;
  constructor(scope: Construct, id: string, props: IRestApiStackProps) {
    super(scope, id, props);

    this.api = new apiGateway.RestApi(this, createName('course-app-api'), {
      restApiName: createName('course-app-api'),
      defaultCorsPreflightOptions: {
        allowCredentials: true,
        allowOrigins: apiGateway.Cors.ALL_ORIGINS,
        allowMethods: apiGateway.Cors.ALL_METHODS,
      },
    });

    // cognito authorizer
    const authorizer = new apiGateway.CognitoUserPoolsAuthorizer(
      this,
      'cognito-authorizer',
      {
        cognitoUserPools: [props.userPool],
      }
    );

    const courseVideosFunction = new lambdaNodejs.NodejsFunction(
      this,
      createName('listVideos'),
      {
        runtime: Runtime.NODEJS_16_X,
        functionName: createName('listVideos'),
        entry: path.join(__dirname, '../functions/listVideos.ts'),
        handler: 'handler',
        bundling: {
          minify: false,
          sourceMap: false,
        },
        memorySize: 128,
        timeout: cdk.Duration.seconds(30),
      }
    );

    props.table.grantReadWriteData(courseVideosFunction);

    const listUserCompletedVideosFunction = new lambdaNodejs.NodejsFunction(
      this,
      createName('listUserCompletedVideos'),
      {
        runtime: Runtime.NODEJS_16_X,
        functionName: createName('listUserCompletedVideos'),
        entry: path.join(__dirname, '../functions/listUserCompletedVideos.ts'),
        handler: 'handler',
        bundling: {
          minify: false,
          sourceMap: false,
        },
        memorySize: 128,
        timeout: cdk.Duration.seconds(30),
      }
    );

    props.table.grantReadWriteData(listUserCompletedVideosFunction);

    const addUserCompletedVideoFunction = new lambdaNodejs.NodejsFunction(
      this,
      createName('addUserCompletedVideo'),
      {
        runtime: Runtime.NODEJS_16_X,
        functionName: createName('addUserCompletedVideo'),
        entry: path.join(__dirname, '../functions/addUserCompletedVideo.ts'),
        handler: 'handler',
        bundling: {
          minify: false,
          sourceMap: false,
        },
        memorySize: 128,
        timeout: cdk.Duration.seconds(30),
      }
    );

    props.table.grantReadWriteData(addUserCompletedVideoFunction);

    const videosResource = this.api.root.addResource('course-videos');
    const courseVideosFunctionIntegration = new apiGateway.LambdaIntegration(
      courseVideosFunction
    );
    videosResource.addMethod('GET', courseVideosFunctionIntegration, {
      authorizationType: apiGateway.AuthorizationType.COGNITO,
      authorizer,
    });

    const userVideosResource = this.api.root.addResource(
      'user-completed-videos'
    );
    const userCompletedVideosIntegration = new apiGateway.LambdaIntegration(
      listUserCompletedVideosFunction
    );
    const addUserCompletedVideoIntegration = new apiGateway.LambdaIntegration(
      addUserCompletedVideoFunction
    );
    userVideosResource.addMethod('GET', userCompletedVideosIntegration, {
      authorizationType: apiGateway.AuthorizationType.COGNITO,
      authorizer,
    });
    userVideosResource.addMethod('POST', addUserCompletedVideoIntegration, {
      authorizationType: apiGateway.AuthorizationType.COGNITO,
      authorizer,
    });
  }
}
