export interface User {
  uid: string;
  email?: string;
  emailVerified?: boolean;
  isAnonymous?: boolean;
  displayName?: string;
  photoURL: string;
  phoneNumber?: string;
  token?: string;
  refreshToken?: string;
}
