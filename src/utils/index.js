export function getFirebaseAuthErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/user-disabled":
      return "This user account has been disabled.";
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/wrong-password":
      return "The password is incorrect.";
    case "auth/email-already-in-use":
      return "The email is already in use by another account.";
    case "auth/weak-password":
      return "The password is too weak. It must be at least 6 characters.";
    case "auth/network-request-failed":
      return "Network error occurred. Please check your connection.";
    case "auth/too-many-requests":
      return "Too many login attempts. Please try again later.";
    case "auth/requires-recent-login":
      return "This operation requires you to log in again.";
    case "auth/invalid-credential":
      return "The provided credential is invalid or expired. Please check and try again.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not allowed. Please contact support.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email but a different sign-in method.";
    case "auth/invalid-verification-code":
      return "The verification code is invalid.";
    case "auth/invalid-verification-id":
      return "The verification ID is invalid.";
    case "auth/internal-error":
      return "An internal error occurred. Please try again later.";
    case "auth/quota-exceeded":
      return "The project quota for this operation has been exceeded.";
    case "auth/timeout":
      return "The operation timed out. Please try again later.";
    default:
      return "An unknown error occurred. Please try again.";
  }
}
