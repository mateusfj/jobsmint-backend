import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserModel } from './user.model';
import { UserInterfaceRepository } from 'src/core/domain/user/repository/user.repository.interface';
import { User } from 'src/core/domain/user/entity/user.entity';
import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';

@Injectable()
export class UserRepository implements UserInterfaceRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      return null;
    }

    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isActive: user.isActive,
    });
  }

  async create(data: User): Promise<void> {
    await this.userRepository.save({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      isActive: data.isActive,
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => {
      return new User({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        isActive: user.isActive,
      });
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundDomainException('User not found');
    }
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      isActive: user.isActive,
    });
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findBy({ id });
    if (!user) {
      throw new NotFoundDomainException('User not found');
    }
    await this.userRepository.softDelete({ id });
  }

  async update(data: User): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: data.id } });
    if (!user) {
      throw new NotFoundDomainException('User not found');
    }
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.role = data.role;
    user.isActive = data.isActive;

    await this.userRepository.save(user);
  }
}
