import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobModel } from './jobs.model';
import { JobInterfaceRepository } from 'src/core/domain/jobs/repository/job.repository.interface';
import { Job } from 'src/core/domain/jobs/entity/job.entity';
import { ResponseList } from 'src/core/shared/types/IResponse';
import { JobFactory } from 'src/core/domain/jobs/factory/job.factory';
import { BaseFindAllService } from 'src/infrastructure/repositories/typeorm/services/base-find-all.service';
import { BaseFindOneService } from '../services/base-find-one.service';

import { QueryParams } from 'src/core/shared/interfaces/query-params/query-params.interface';
import { QueryParamsGetOne } from '../services/dto/base-find-one.dto';

@Injectable()
export class JobRepository implements JobInterfaceRepository {
  constructor(
    @InjectRepository(JobModel)
    private readonly jobsRepository: Repository<JobModel>,
    private readonly baseFindAllService: BaseFindAllService<JobModel>,
    private readonly baseFindOneService: BaseFindOneService<JobModel>,
  ) {}

  async findOneModel(
    id: string,
    query: QueryParamsGetOne,
  ): Promise<JobModel | null> {
    const job = await this.baseFindOneService.findOneById(
      this.jobsRepository,
      'job',
      id,
      query,
    );
    return job;
  }

  async findAllModels(query: QueryParams): Promise<ResponseList<JobModel>> {
    const jobs = await this.baseFindAllService.findAllBase(
      this.jobsRepository,
      'job',
      query,
    );
    return jobs;
  }

  async create(job: Job): Promise<void> {
    await this.jobsRepository.save(job);
  }

  async findAll(): Promise<Job[] | null> {
    const jobs = await this.jobsRepository.find();
    return jobs.map((job) => JobFactory.create(job));
  }

  async findOne(id: string): Promise<Job | null> {
    const job = await this.jobsRepository.findOne({ where: { id } });

    if (!job) {
      return null;
    }

    return JobFactory.create(job);
  }

  async delete(id: string): Promise<void> {
    await this.jobsRepository.softDelete({ id });
  }

  async update(job: Job): Promise<void> {
    await this.jobsRepository.update(job.id, {
      title: job.title,
      description: job.description,
      salary: job.salary,
      workMode: job.workMode,
      employmentType: job.employmentType,
      status: job.status,
      isActive: job.isActive,
    });
  }
}
