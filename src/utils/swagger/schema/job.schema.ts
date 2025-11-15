import { JobModel } from 'src/infrastructure/repositories/jobs/typeorm/jobs.model';
import {
  CreateJobDto,
  CreateJobResponseDto,
} from 'src/presentation/modules/job/dto/create-job.dto';
import { GetAllJobsResponseDto } from 'src/presentation/modules/job/dto/get.all.job.dto';

export const JOB_SCHEMA = {
  create: {
    method: 'post' as const,
    summary: 'Create one job',
    description: 'This function creates one job',
    bodyType: CreateJobDto,
    response: [
      {
        status: 201,
        description: 'job created successfully',
        type: CreateJobResponseDto,
      },
    ],
  },

  getAll: {
    method: 'get' as const,
    summary: 'Get all jobs',
    description: 'This function retrieves all jobs',
    queryParams: Object.keys(JobModel),
    response: [
      {
        status: 200,
        description: 'List of all jobs',
        type: GetAllJobsResponseDto,
        isArray: true,
      },
    ],
  },
};
