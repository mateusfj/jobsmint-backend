import { ApiProperty } from '@nestjs/swagger';
import { outputGetAllJobsDTO } from 'src/core/application/use-cases/job/get-all-jobs/get.all.job.dto';

export class GetAllJobsResponseDto implements outputGetAllJobsDTO {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'Frontend Developer' })
  title: string;
  @ApiProperty({ example: 'Descrição da vaga' })
  description: string;

  @ApiProperty({ example: 5000, nullable: true })
  salary: number | null;

  @ApiProperty({ example: 'on-site' })
  workMode: string;

  @ApiProperty({ example: 'clt' })
  employmentType: string;

  @ApiProperty({ example: 'open' })
  status: string;
}
