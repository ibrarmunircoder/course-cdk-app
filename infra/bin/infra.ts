#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AmplifyStack } from '../lib/amplify.stack';
import { CognitoStack } from '../lib/cognito.stack';
import { RestApiStack } from '../lib/api.stack';
import { StorageStack } from '../lib/storgae.stack';

const app = new cdk.App();
const cognitoStack = new CognitoStack(app, 'CourseAppCognitoStack');

const storageStack = new StorageStack(app, 'CourseStorageStack');

const apiStack = new RestApiStack(app, 'CourseAppApiStack', {
  userPool: cognitoStack.userPool,
  table: storageStack.table,
  bucket: storageStack.bucket,
});

new AmplifyStack(app, 'CourseCdkAmplifyStack', {
  appName: 'course-cdk-app',
  gitOwner: 'ibrarmunircoder',
  gitRepository: 'course-cdk-app',
  roleName: 'CourseCDKAmplifyAppRole',
  roleDescription: 'Allow amplify to provision resources',
  userPoolId: cognitoStack.userPool.userPoolId,
  userPoolClientId: cognitoStack.userPoolWebClient.userPoolClientId,
  identityPoolId: cognitoStack.identityPool.identityPoolId,
  apiEndpoint: apiStack.api.url,
  apiName: apiStack.api.restApiName,
});
