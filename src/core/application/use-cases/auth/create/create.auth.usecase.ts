import * as bcrypt from 'bcrypt';

import { inputCreateAuthDTO, outputCreateAuthDTO } from './create.auth.dto';
import { AuthInterfaceRepository } from 'src/core/domain/entities/auth/repository/auth.repository.interface';
import { ConflictDomainException } from 'src/core/shared/exceptions/domain.exceptions';
import { AuthFactory } from 'src/core/domain/entities/auth/factory/auth.factory';

export class CreateAuthUseCase {
  constructor(private readonly authRepository: AuthInterfaceRepository) {}

  async execute(input: inputCreateAuthDTO): Promise<outputCreateAuthDTO> {
    const userExists = await this.authRepository.findByEmail(input.email);

    if (userExists) {
      throw new ConflictDomainException('User already exists with this email');
    }

    const hashPassword: string = await bcrypt.hash(input.password, 10);

    const auth = AuthFactory.create({
      name: input.name,
      email: input.email,
      password: hashPassword,
      role: input.role,
    });

    await this.authRepository.create(auth);

    return {
      id: auth.id,
      name: auth.name,
      email: auth.email,
      role: auth.role,
      isActive: auth.isActive,
    };
  }
}
