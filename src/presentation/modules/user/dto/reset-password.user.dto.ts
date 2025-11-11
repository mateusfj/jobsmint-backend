import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { inputUpdatePasswordUserDTO } from 'src/core/application/use-cases/user/update-password/update-password.user.dto';

export class UpdatePasswordUserDTO implements inputUpdatePasswordUserDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  currentPassword: string;
}
