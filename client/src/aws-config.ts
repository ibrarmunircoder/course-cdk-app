import { ResourcesConfig } from 'aws-amplify';

const awsConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
    },
  },
  API: {
    REST: {
      [import.meta.env.VITE_API_NAME]: {
        endpoint: import.meta.env.VITE_API_ENDPOINT,
      },
    },
  },
};
export default awsConfig;
