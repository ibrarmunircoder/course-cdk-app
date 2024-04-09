import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import { IAWSAmplifyStackProps } from '../bin/types';
import { createName } from '../utils/cdk.utils';

export class AmplifyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: IAWSAmplifyStackProps) {
    super(scope, id, props);

    const role = new iam.Role(this, 'Role', {
      roleName: props.roleName,
      description: props.roleDescription,
      assumedBy: new iam.ServicePrincipal('amplify.amazonaws.com'),
    });
    role.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess-Amplify')
    );

    // build settings
    const buildSpec = codebuild.BuildSpec.fromObjectToYaml({
      version: 1,
      applications: [
        {
          frontend: {
            phases: {
              preBuild: {
                commands: ['npm ci'],
              },
              build: {
                commands: [
                  `echo VITE_IDENTITY_POOL_ID=$IDENTITY_POOL_ID >> .env`,
                  `echo VITE_USER_POOL_ID=$USER_POOL_ID >> .env`,
                  `echo VITE_USER_POOL_CLIENT_ID=$USER_POOL_CLIENT_ID >> .env`,
                  `echo VITE_REGION=$REGION >> .env`,
                  `echo VITE_API_ENDPOINT=$API_ENDPOINT >> .env`,
                  'npm run build',
                ],
              },
            },
            artifacts: {
              baseDirectory: 'build',
              files: ['**/*'],
            },
            cache: { paths: ['node_modules/**/*'] },
          },
          appRoot: 'client',
        },
      ],
    });

    const amplifyApp = new amplify.App(this, createName('course-cdk-app'), {
      appName: props.appName,
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: props.gitOwner,
        repository: props.gitRepository,
        oauthToken: cdk.SecretValue.secretsManager('github-token2'),
      }),
      role,
      buildSpec,
      platform: amplify.Platform.WEB,
      environmentVariables: {
        AMPLIFY_MONOREPO_APP_ROOT: 'client',
        IDENTITY_POOL_ID: props.identityPoolId,
        USER_POOL_ID: props.userPoolId,
        USER_POOL_CLIENT_ID: props.userPoolClientId,
        REGION: this.region,
        API_ENDPOINT: props.apiEndpoint,
      },
    });

    amplifyApp.addBranch('main');

    amplifyApp.addCustomRule(
      amplify.CustomRule.SINGLE_PAGE_APPLICATION_REDIRECT
    );
  }
}
