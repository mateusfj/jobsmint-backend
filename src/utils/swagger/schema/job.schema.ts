import { JobModel } from 'src/infrastructure/repositories/typeorm/jobs/jobs.model';
import {
  CreateJobDto,
  CreateJobResponseDto,
} from 'src/presentation/modules/job/dto/create.job.dto';
import { DeleteJobResponseDTO } from 'src/presentation/modules/job/dto/delete.job.dto';
import { GetAllJobsResponseDto } from 'src/presentation/modules/job/dto/get-all.job.dto';
import { GetOneJobResponseDTO } from 'src/presentation/modules/job/dto/get-one.job.dto';

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

  getOne: {
    method: 'get' as const,
    summary: 'Get one job',
    description: 'This function retrieves one job',
    response: [
      {
        status: 200,
        description: 'One job',
        type: GetOneJobResponseDTO,
      },
    ],
  },

  delete: {
    method: 'delete' as const,
    summary: 'Delete one job',
    description: 'This function deletes one job',
    response: [
      {
        status: 200,
        description: 'Job deleted successfully',
        type: DeleteJobResponseDTO,
      },
    ],
  },
};
