import { StackProps } from 'aws-cdk-lib';

export interface IAWSAmplifyStackProps extends StackProps {
  appName: string;
  gitRepository: string;
  gitOwner: string;
  roleName: string;
  roleDescription: string;
  userPoolId: string;
  userPoolClientId: string;
  identityPoolId: string;
}
