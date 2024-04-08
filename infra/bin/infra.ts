#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AmplifyStack } from '../lib/amplify.stack';
import { CognitoStack } from '../lib/cognito.stack';

const app = new cdk.App();
const cognitoStack = new CognitoStack(app, 'CourseAppCognitoStack');
new AmplifyStack(app, 'CourseCdkAmplifyStack', {
  appName: 'course-cdk-app',
  gitOwner: 'ibrarmunircoder',
  gitRepository: 'course-cdk-app',
  roleName: 'CourseCDKAmplifyAppRole',
  roleDescription: 'Allow amplify to provision resources',
  userPoolId: cognitoStack.userPool.userPoolId,
  userPoolClientId: cognitoStack.userPoolWebClient.userPoolClientId,
  identityPoolId: cognitoStack.identityPool.identityPoolId,
});
