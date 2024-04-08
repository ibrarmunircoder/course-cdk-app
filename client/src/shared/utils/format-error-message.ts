export const formatErrorMessage = (error: any) => {
  let errorMsg = 'Something went wrong!. Please try again';
  if ('errors' in error && Array.isArray(error['errors'])) {
    const obj = error.errors[0];
    if (obj.errorType === 'Unauthorized') {
      errorMsg = 'You are not authorized to access this.';
    }
    if (obj.errorType === 'DynamoDB:ConditionalCheckFailedException') {
      errorMsg = 'Duplication error. Please add unique facilities.';
    } else {
      errorMsg = obj.message;
    }
  }

  if (!window.navigator.onLine || error?.message?.includes('NetworkOffline')) {
    errorMsg = 'Please check your internet connection first';
  }

  if (error instanceof Error) {
    errorMsg = error.message;
  }

  return errorMsg;
};
