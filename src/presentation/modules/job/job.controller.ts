import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import {
  inputCreateJobDTO,
  outputCreateJobDTO,
} from 'src/core/application/use-cases/job/create-job/create.job.dto';
import { CreateJobUseCase } from 'src/core/application/use-cases/job/create-job/create.job.usecase';
import { SwaggerDocs } from 'src/utils/decorators/swagger.decorator';
import { JOB_SCHEMA } from 'src/utils/swagger/schema/job.schema';
import { GetAllJobsUseCase } from 'src/core/application/use-cases/job/get-all-jobs/get.all.job.usecase';
import { outputGetAllJobsDTO } from 'src/core/application/use-cases/job/get-all-jobs/get.all.job.dto';

@Controller('job')
export class JobController {
  constructor(
    private readonly createJobUseCase: CreateJobUseCase,
    private readonly getAllJobsUseCase: GetAllJobsUseCase,
  ) {}

  @Post()
  @SwaggerDocs(JOB_SCHEMA.create)
  create(@Body() createJobDto: CreateJobDto): Promise<outputCreateJobDTO> {
    const input: inputCreateJobDTO = {
      title: createJobDto.title,
      description: createJobDto.description,
      salary: createJobDto.salary,
      workMode: createJobDto.workMode,
      employmentType: createJobDto.employmentType,
      status: createJobDto.status,
    };
    return this.createJobUseCase.execute(input);
  }

  @Get()
  @SwaggerDocs(JOB_SCHEMA.getAll)
  getAll(): Promise<outputGetAllJobsDTO[]> {
    return this.getAllJobsUseCase.execute();
  }
}
