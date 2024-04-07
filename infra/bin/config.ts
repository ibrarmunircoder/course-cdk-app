import { IAWSAmplifyStackProps } from './types';

export const amplifyAppStackConfig: IAWSAmplifyStackProps = {
  appName: 'course-cdk-app',
  gitOwner: 'ibrarmunircode',
  gitRepository: 'course-cdk-app',
  roleName: 'CourseCDKAmplifyAppRole',
  roleDescription: 'Allow amplify to provision resources',
};
