import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { CreateJobDto, CreateJobResponseDto } from './dto/create.job.dto';
import { inputCreateJobDTO } from 'src/core/application/use-cases/job/create-job/create.job.dto';
import { CreateJobUseCase } from 'src/core/application/use-cases/job/create-job/create.job.usecase';
import { SwaggerDocs } from 'src/utils/decorators/swagger.decorator';
import { JOB_SCHEMA } from 'src/utils/swagger/schema/job.schema';
import { GetAllJobsUseCase } from 'src/core/application/use-cases/job/get-all-jobs/get.all.job.usecase';
import { GetOneJobUseCase } from 'src/core/application/use-cases/job/get-one-job/get-one.job.usecase';
import { UpdateJobUseCase } from 'src/core/application/use-cases/job/update-job/update.job.usecase';
import { DeleteJobUseCase } from 'src/core/application/use-cases/job/delete-job/delete.job.usecase';
import { inputDeleteJobDTO } from 'src/core/application/use-cases/job/delete-job/delete.job.dto';
import { inputGetOneJobDTO } from 'src/core/application/use-cases/job/get-one-job/get-one.job.dto';
import { DeleteJobResponseDTO } from './dto/delete.job.dto';
import { GetOneJobResponseDTO } from './dto/get-one.job.dto';
import { GetAllJobsResponseDto } from './dto/get-all.job.dto';

@Controller('job')
export class JobController {
  constructor(
    private readonly createJobUseCase: CreateJobUseCase,
    private readonly getAllJobsUseCase: GetAllJobsUseCase,
    private readonly getOneJobUseCase: GetOneJobUseCase,
    private readonly updateJobUseCase: UpdateJobUseCase,
    private readonly deleteJobUseCase: DeleteJobUseCase,
  ) {}

  @Post()
  @SwaggerDocs(JOB_SCHEMA.create)
  create(@Body() createJobDto: CreateJobDto): Promise<CreateJobResponseDto> {
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
  getAll(): Promise<GetAllJobsResponseDto[]> {
    return this.getAllJobsUseCase.execute();
  }

  @Get(':id')
  @SwaggerDocs(JOB_SCHEMA.getOne)
  findOne(@Param('id') id: string): Promise<GetOneJobResponseDTO | null> {
    const input: inputGetOneJobDTO = { id };
    return this.getOneJobUseCase.execute(input);
  }

  @Delete(':id')
  @SwaggerDocs(JOB_SCHEMA.delete)
  remove(@Param('id') id: string): Promise<DeleteJobResponseDTO> {
    const input: inputDeleteJobDTO = { id };
    return this.deleteJobUseCase.execute(input);
  }
}
