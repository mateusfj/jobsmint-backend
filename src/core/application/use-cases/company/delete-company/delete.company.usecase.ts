import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import {
  inputDeleteCompanyDTO,
  outputDeleteCompanyDTO,
} from './delete.company.dto';
import { CompanyInterfaceRepository } from 'src/core/domain/company/repository/company.repository.interface';

export class DeleteCompanyUseCase {
  constructor(private readonly companyRepository: CompanyInterfaceRepository) {}

  async execute(input: inputDeleteCompanyDTO): Promise<outputDeleteCompanyDTO> {
    const company = await this.companyRepository.findOne(input.id);

    if (!company) {
      throw new NotFoundDomainException('Company not found');
    }

    await this.companyRepository.delete(input.id);

    return { message: 'Company deleted successfully' };
  }
}
