import { CreateUserUseCase } from 'src/core/application/use-cases/user/create-user/create.user.usecase';
import { CompanyInterfaceRepository } from 'src/core/domain/company/repository/company.repository.interface';
import {
  inputCreateUserWithCompanyDTO,
  outputCreateUserWithCompanyDTO,
} from './create-user-with-company.dto';
import { CompanyFactory } from 'src/core/domain/company/factory/company.factory';
import { Company } from 'src/core/domain/company/entity/company.entity';
import { Address } from 'src/core/domain/value-objects/address/entity/address.entity';

export class CreateUserWithCompanyUseCase {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly companyRepository: CompanyInterfaceRepository,
  ) {}

  async execute(
    input: inputCreateUserWithCompanyDTO,
  ): Promise<outputCreateUserWithCompanyDTO> {
    const createdUser = await this.createUserUseCase.execute({
      name: input.user.name,
      email: input.user.email,
      password: input.user.password,
      role: input.user.role,
    });

    const newAddress = new Address(input.company.address);

    const newCompany: Company = CompanyFactory.create({
      owner_id: createdUser.id,
      corporate_reason: input.company.corporate_reason,
      cnpj: input.company.cnpj,
      fantasy_name: input.company.fantasy_name,
      industry: input.company.industry,
      phone: input.company.phone,
    });

    newCompany.setAddress(newAddress);
    await this.companyRepository.create(newCompany);

    return {
      company: {
        id: newCompany.id,
        owner_id: createdUser.id,
        corporate_reason: newCompany.corporate_reason,
        cnpj: newCompany.cnpj,
        description: '',
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
