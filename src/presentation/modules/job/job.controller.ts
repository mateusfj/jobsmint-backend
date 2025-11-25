import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { CreateJobDto, CreateJobResponseDto } from './dto/create.job.dto';
import { inputCreateJobDTO } from 'src/core/application/use-cases/job/create-job/create.job.dto';
import { CreateJobUseCase } from 'src/core/application/use-cases/job/create-job/create.job.usecase';
import { SwaggerDocs } from 'src/utils/decorators/swagger.decorator';
import { JOB_SCHEMA } from 'src/utils/swagger/schema/job.schema';
import { GetAllJobsUseCase } from 'src/core/application/use-cases/job/get-all-jobs/get.all.job.usecase';
import { GetOneJobUseCase } from 'src/core/application/use-cases/job/get-one-job/get-one.job.usecase';

import { DeleteJobUseCase } from 'src/core/application/use-cases/job/delete-job/delete.job.usecase';
import { inputDeleteJobDTO } from 'src/core/application/use-cases/job/delete-job/delete.job.dto';
import { inputGetOneJobDTO } from 'src/core/application/use-cases/job/get-one-job/get-one.job.dto';
import { DeleteJobResponseDTO } from './dto/delete.job.dto';
import { GetOneJobResponseDTO } from './dto/get-one.job.dto';
import { GetAllJobsResponseDto } from './dto/get-all.job.dto';
import { QueryParamsDto } from 'src/infrastructure/repositories/typeorm/services/dto/base-find-all.dto';
import { QueryParamsGetOne } from 'src/infrastructure/repositories/typeorm/services/dto/base-find-one.dto';
import { ResponseItem, ResponseList } from 'src/core/shared/types/IResponse';
import { UpdateJobUseCase } from 'src/core/application/use-cases/job/update-job/update.job.usecase';
import { UpdateJobDto } from './dto/update.job.dto';
import { inputUpdateJobDTO } from 'src/core/application/use-cases/job/update-job/update.job.dto';

@Controller('job')
export class JobController {
  constructor(
    private readonly createJobUseCase: CreateJobUseCase,
    private readonly getAllJobsUseCase: GetAllJobsUseCase,
    private readonly getOneJobUseCase: GetOneJobUseCase,
    private readonly deleteJobUseCase: DeleteJobUseCase,
    private readonly updateJobUseCase: UpdateJobUseCase,
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
  getAll(
    @Query() query: QueryParamsDto,
  ): Promise<ResponseList<GetAllJobsResponseDto>> {
    return this.getAllJobsUseCase.execute(query);
  }

  @Get(':id')
  @SwaggerDocs(JOB_SCHEMA.getOne)
  findOne(
    @Param('id') id: string,
    @Query() query: QueryParamsGetOne,
  ): Promise<ResponseItem<GetOneJobResponseDTO> | null> {
    const input: inputGetOneJobDTO = { id };
    return this.getOneJobUseCase.execute(input, query);
  }

  @Patch(':id')
  @SwaggerDocs(JOB_SCHEMA.update)
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    const input: inputUpdateJobDTO = {
      id,
      title: updateJobDto.title,
      description: updateJobDto.description,
      salary: updateJobDto.salary,
      workMode: updateJobDto.workMode,
      employmentType: updateJobDto.employmentType,
      status: updateJobDto.status,
    };
    return this.updateJobUseCase.execute(input);
  }

  @Delete(':id')
  @SwaggerDocs(JOB_SCHEMA.delete)
  remove(@Param('id') id: string): Promise<DeleteJobResponseDTO> {
    const input: inputDeleteJobDTO = { id };
    return this.deleteJobUseCase.execute(input);
  }
}
