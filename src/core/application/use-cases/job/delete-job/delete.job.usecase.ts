import { NotFoundDomainException } from 'src/core/domain/@shared/exceptions/domain.exceptions';
import { inputDeleteJobDTO, outputDeleteJobDTO } from './delete.job.dto';
import { JobInterfaceRepository } from 'src/core/domain/jobs/repository/job.repository.interface';

export class DeleteJobUseCase {
  constructor(private readonly jobRepository: JobInterfaceRepository) {}

  async execute(input: inputDeleteJobDTO): Promise<outputDeleteJobDTO> {
    const job = await this.jobRepository.findOne(input.id);

    if (!job) {
      throw new NotFoundDomainException('Job not found');
    }

    await this.jobRepository.delete(input.id);

    return { message: 'Job deleted successfully' };
  }
}
