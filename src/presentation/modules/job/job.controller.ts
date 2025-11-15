import { Controller, Post, Body } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import {
  inputCreateJobDTO,
  outputCreateJobDTO,
} from 'src/core/application/use-cases/job/create-job/create.job.dto';
import { CreateJobUseCase } from 'src/core/application/use-cases/job/create-job/create.job.usecase';

@Controller('job')
export class JobController {
  constructor(private readonly createJobUseCase: CreateJobUseCase) {}

  @Post()
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
}
