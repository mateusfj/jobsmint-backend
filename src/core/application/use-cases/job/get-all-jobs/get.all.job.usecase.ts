import { ResponseList } from 'src/core/domain/@shared/types/IResponse';
import { JobInterfaceRepository } from 'src/core/domain/jobs/repository/job.repository.interface';

import { AccessTokenPayload } from 'src/core/application/@shared/interfaces/jwt/jwt.interface';
import { QueryParams } from 'src/core/application/@shared/interfaces/query-params/query-params.interface';
import { ERole } from 'src/core/domain/@shared/enums/ERole';
import { outputGetAllJobsDTO } from './get.all.job.dto';

export class GetAllJobsUseCase {
  constructor(private readonly jobRepository: JobInterfaceRepository) {}

  async execute(
    query: QueryParams,
    user: AccessTokenPayload,
  ): Promise<ResponseList<outputGetAllJobsDTO>> {
    // TODO: Alterar lógica de obtenção de jobs com base no papel do usuário
    if (user.role === ERole.CANDIDATE) {
      const jobs = await this.jobRepository.findAllModels(query);
      return jobs;
    }

    // TODO: Alterar lógica de obtenção de jobs com base no papel do usuário
    if (user.role === ERole.COMPANY) {
      const jobs = await this.jobRepository.findAllModels(query);
      return jobs;
    }

    // Para administradores ou outros papéis
    const jobs = await this.jobRepository.findAllModels(query);
    return jobs;
  }
}
