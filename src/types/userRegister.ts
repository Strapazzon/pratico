export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterUserServerActionResponse {
  success: boolean;
  token?: string;
  refreshToken?: string;
  error?: "passwordsDoNotMatch" | "emailAlreadyExists" | "unknownError";
}
