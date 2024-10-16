export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterUserServerActionResponse {
  error?: "passwordsDoNotMatch" | "emailAlreadyExists" | "unknownError";
}
