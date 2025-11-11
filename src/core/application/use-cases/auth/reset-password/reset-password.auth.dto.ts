export interface inputResetPasswordAuthDTO {
  resetToken: string;
  newPassword: string;
  currentPassword: string;
}

export interface outputResetPasswordAuthDTO {
  message: string;
}
