import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { NotFoundDomainException } from 'src/core/shared/exceptions/domain.exceptions';
import { JobModel } from './jobs.model';
import { JobInterfaceRepository } from 'src/core/domain/entities/jobs/repository/job.repository.interface';
import { Job } from 'src/core/domain/entities/jobs/entity/job.entity';

@Injectable()
export class JobRepository implements JobInterfaceRepository {
  constructor(
    @InjectRepository(JobModel)
    private readonly jobsRepository: Repository<JobModel>,
  ) {}

  async findByTitle(title: string): Promise<Job | null> {
    const job = await this.jobsRepository.findOne({
      where: { title: title },
    });

    if (!job) {
      return null;
    }

    return new Job({
      id: job.id,
      title: job.title,
      description: job.description,
      salary: job.salary,
      workMode: job.workMode,
      employmentType: job.employmentType,
      status: job.status,
    });
  }

  async create(data: Job): Promise<void> {
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

  async findAll(): Promise<Job[]> {
    const jobs = await this.jobsRepository.find();
    return jobs.map(
      (job) =>
        new Job({
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
  Job;
  async findOne(id: string): Promise<Job> {
    const job = await this.jobsRepository.findOne({ where: { id } });

    if (!job) {
      throw new NotFoundDomainException('Job not found');
    }
    return new Job({
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

  async update(data: Job): Promise<Job> {
    const job = await this.jobsRepository.findOne({ where: { id: data.id } });
    if (!job) {
      throw new NotFoundDomainException('Job not found');
    }

    await this.jobsRepository.save(job);

    return new Job({
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
