import { StackProps } from 'aws-cdk-lib';
import { IUserPool } from 'aws-cdk-lib/aws-cognito';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { IBucket } from 'aws-cdk-lib/aws-s3';

export interface IAWSAmplifyStackProps extends StackProps {
  appName: string;
  gitRepository: string;
  gitOwner: string;
  roleName: string;
  roleDescription: string;
  userPoolId: string;
  userPoolClientId: string;
  identityPoolId: string;
  apiEndpoint: string;
  apiName: string;
}

export interface IRestApiStackProps extends StackProps {
  userPool: IUserPool;
  table: ITable;
  bucket: IBucket;
}
