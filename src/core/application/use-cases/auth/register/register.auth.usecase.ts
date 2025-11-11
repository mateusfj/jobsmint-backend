import {
  inputRegisterUserAuthDTO,
  outputRegisterUserAuthDTO,
} from './register.auth.dto';
import { CreateUserUseCase } from '../../user/create/create.user.usecase';

export class RegisterUserUseCase {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async execute(
    input: inputRegisterUserAuthDTO,
  ): Promise<outputRegisterUserAuthDTO> {
    const newUser = await this.createUserUseCase.execute(input);
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive,
    };
  }
}
