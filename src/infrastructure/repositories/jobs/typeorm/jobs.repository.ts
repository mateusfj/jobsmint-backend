import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { NotFoundDomainException } from 'src/core/shared/exceptions/domain.exceptions';
import { JobsModel } from './jobs.model';
import { JobsInterfaceRepository } from 'src/core/domain/entities/jobs/repository/jobs.repository.interface';
import { Jobs } from 'src/core/domain/entities/jobs/entity/jobs.entity';

@Injectable()
export class JobsRepository implements JobsInterfaceRepository {
  constructor(
    @InjectRepository(JobsModel)
    private readonly jobsRepository: Repository<JobsModel>,
  ) {}

  async findByTitle(title: string): Promise<Jobs | null> {
    const job = await this.jobsRepository.findOne({
      where: { title: title },
    });

    if (!job) {
      return null;
    }

    return new Jobs({
      id: job.id,
      title: job.title,
      description: job.description,
      salary: job.salary,
      workMode: job.workMode,
      employmentType: job.employmentType,
      status: job.status,
    });
  }

  async create(data: Jobs): Promise<void> {
    await this.jobsRepository.save({
      id: data.id,
      title: data.title,
      description: data.description,
      salary: data.salary,
      workMode: data.workMode,
      employmentType: data.employmentType,
      status: data.status,
    });
  }

  async findAll(): Promise<Jobs[]> {
    const jobs = await this.jobsRepository.find();
    return jobs.map(
      (job) =>
        new Jobs({
          id: job.id,
          title: job.title,
          description: job.description,
          salary: job.salary,
          workMode: job.workMode,
          employmentType: job.employmentType,
          status: job.status,
        }),
    );
  }

  async findOne(id: string): Promise<Jobs> {
    const job = await this.jobsRepository.findOne({ where: { id } });

    if (!job) {
      throw new NotFoundDomainException('Job not found');
    }
    return new Jobs({
      id: job.id,
      title: job.title,
      description: job.description,
      salary: job.salary,
      workMode: job.workMode,
      employmentType: job.employmentType,
      status: job.status,
    });
  }

  async delete(id: string): Promise<void> {
    const job = await this.jobsRepository.findBy({ id });
    if (!job) {
      throw new NotFoundDomainException('Job not found');
    }
    await this.jobsRepository.softDelete({ id });
  }

  async update(data: Jobs): Promise<Jobs> {
    const job = await this.jobsRepository.findOne({ where: { id: data.id } });
    if (!job) {
      throw new NotFoundDomainException('Job not found');
    }

    await this.jobsRepository.save(job);

    return new Jobs({
      id: job.id,
      title: job.title,
      description: job.description,
      salary: job.salary,
      workMode: job.workMode,
      employmentType: job.employmentType,
      status: job.status,
    });
  }
}
