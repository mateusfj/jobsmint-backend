import * as bcrypt from 'bcrypt';

import { UserInterfaceRepository } from 'src/core/domain/user/repository/user.repository.interface';
import {
  inputUpdatePasswordUserDTO,
  outputUpdatePasswordUserDTO,
} from './update-password.user.dto';
import {
  NotFoundDomainException,
  UnauthorizedDomainException,
} from 'src/core/shared/exceptions/domain.exceptions';

export class UpdatePasswordUserUseCase {
  constructor(private readonly userRepository: UserInterfaceRepository) {}

  async execute(
    input: inputUpdatePasswordUserDTO,
  ): Promise<outputUpdatePasswordUserDTO> {
    const user = await this.userRepository.findOne(input.userId);

    if (!user) {
      throw new NotFoundDomainException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      input.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedDomainException('Current password is incorrect');
    }

    const hashNewPassword: string = await bcrypt.hash(input.newPassword, 10);
    user.password = hashNewPassword;

    await this.userRepository.update(user);

    return {
      message: 'Password updated successfully',
    };
  }
}
