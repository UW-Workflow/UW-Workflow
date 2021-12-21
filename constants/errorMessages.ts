const ERROR_MESSAGES = {
  "auth/user-not-found":
    "No account with given credentials is found, please Sign Up.",
  "auth/requires-recent-login":
    "This activity requires recent login. Please log in again.",
  "auth/weak-password":
    "Password is too weak, it should be atleast 6 characters long.",
  "auth/wrong-password": "Wrong password entered.",
  "auth/too-many-requests":
    "Account locked due to too many attemps. Please reset your password.",
  "auth/email-already-in-use":
    "An account with the given email already exists.",
  default: "There was a problem with authentication.",
};
export function getAuthErrorMessage(error: string) {
  if (error in ERROR_MESSAGES) {
    return ERROR_MESSAGES[error];
  }
  return ERROR_MESSAGES["default"];
}
