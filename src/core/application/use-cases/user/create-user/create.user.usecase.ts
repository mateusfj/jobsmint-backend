import * as bcrypt from 'bcrypt';
import { UserInterfaceRepository } from 'src/core/domain/user/repository/user.repository.interface';
import { inputCreateUserDTO, outputCreateUserDTO } from './create.user.dto';
import { ConflictDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { UserFactory } from 'src/core/domain/user/factory/user.factory';

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserInterfaceRepository) {}

  async execute(input: inputCreateUserDTO): Promise<outputCreateUserDTO> {
    const userExists = await this.userRepository.findByEmail(input.email);

    if (userExists) {
      throw new ConflictDomainException('User already exists with this email');
    }

    const hashPassword: string = await bcrypt.hash(input.password, 10);

    const user = UserFactory.create({
      name: input.name,
      email: input.email,
      password: hashPassword,
      role: input.role,
    });

    await this.userRepository.create(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    };
  }
}
