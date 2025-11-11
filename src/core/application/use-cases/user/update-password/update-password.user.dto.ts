export interface inputUpdatePasswordUserDTO {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export interface outputUpdatePasswordUserDTO {
  message: string;
}
