import { CreateUserUseCase } from 'src/core/application/use-cases/user/create-user/create.user.usecase';
import { ERole } from 'src/core/shared/utils/enums/ERole';
import { CompanyInterfaceRepository } from 'src/core/domain/entities/company/repository/company.repository.interface';
import {
  inputCreateUserWithCompanyDTO,
  outputCreateUserWithCompanyDTO,
} from './create-user-with-company.dto';
import { CompanyFactory } from 'src/core/domain/entities/company/factory/company.factory';
import { Company } from 'src/core/domain/entities/company/entity/company.entity';
import { User } from 'src/core/domain/entities/user/entity/user.entity';

export class CreateUserWithCompanyUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly companyRepository: CompanyInterfaceRepository,
  ) {}

  async execute(
    input: inputCreateUserWithCompanyDTO,
  ): Promise<outputCreateUserWithCompanyDTO> {
    const createdUser = await this.createUserUseCase.execute({
      name: input.name,
      email: input.email,
      password: input.password,
      role: ERole.COMPANY,
    } as User);

    const newCompany: Company = CompanyFactory.create({
      user_id: createdUser.id,
      corporate_reason: input.corporate_reason,
      cnpj: input.cnpj,
      description: input.description,
      website: input.website ?? null,
      logo_url: input.logo_url ?? null,
    } as Company);

    await this.companyRepository.create(newCompany);

    return {
      company: {
        id: newCompany.id,
        user_id: createdUser.id,
        corporate_reason: newCompany.corporate_reason,
        cnpj: newCompany.cnpj,
        description: newCompany.description,
        website: newCompany.website,
        logo_url: newCompany.logo_url,
      },
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        isActive: createdUser.isActive,
      },
    };
  }
}
