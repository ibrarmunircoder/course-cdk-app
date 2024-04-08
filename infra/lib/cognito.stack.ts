import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as identityPool from '@aws-cdk/aws-cognito-identitypool-alpha';
import { Construct } from 'constructs';
import { createName } from '../utils/cdk.utils';

export class CognitoStack extends cdk.Stack {
  public readonly userPool: cognito.IUserPool;
  public readonly userPoolWebClient: cognito.IUserPoolClient;
  public readonly identityPool: identityPool.IIdentityPool;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.userPool = new cognito.UserPool(
      this,
      createName('course-app-user-pool'),
      {
        userPoolName: createName('course-app-user-pool'),
        selfSignUpEnabled: true,
        signInAliases: {
          email: true,
        },
        autoVerify: {
          email: true,
        },
        userVerification: {
          emailSubject: 'Email verification code',
          emailBody: 'Thanks for signing up Your verification code is {####}',
          emailStyle: cognito.VerificationEmailStyle.CODE,
        },
        accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      }
    );

    this.userPoolWebClient = new cognito.UserPoolClient(
      this,
      createName('course-app-client'),
      {
        userPool: this.userPool,
        userPoolClientName: 'course-app-client',
        authFlows: {
          userPassword: true,
          userSrp: true,
        },
        generateSecret: false,
        refreshTokenValidity: cdk.Duration.days(8),
        readAttributes: new cognito.ClientAttributes().withStandardAttributes({
          email: true,
          emailVerified: true,
          gender: true,
          fullname: true,
        }),
      }
    );

    this.identityPool = new identityPool.IdentityPool(
      this,
      createName('course-app-identity-pool'),
      {
        allowUnauthenticatedIdentities: true,
        identityPoolName: createName('course-app-identity-pool'),
        authenticationProviders: {
          userPools: [
            new identityPool.UserPoolAuthenticationProvider({
              userPool: this.userPool,
              userPoolClient: this.userPoolWebClient,
            }),
          ],
        },
      }
    );

    /**
     * print values to console
     */
    new cdk.CfnOutput(this, 'userPoolId', {
      value: this.userPool.userPoolId,
    });

    new cdk.CfnOutput(this, 'userPoolWebClientId', {
      value: this.userPoolWebClient.userPoolClientId,
    });
    new cdk.CfnOutput(this, 'userIdentityPoolId', {
      value: this.identityPool.identityPoolId,
    });
  }
}
