import { ApiProperty } from '@nestjs/swagger';
import { outputGetAllJobsDTO } from 'src/core/application/use-cases/job/get-all-jobs/get.all.job.dto';

export class GetAllJobsResponseDto implements outputGetAllJobsDTO {
  @ApiProperty({ example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6' })
  id?: string;

  @ApiProperty({ example: 'Frontend Developer' })
  title?: string;

  @ApiProperty({ example: 'Descrição da vaga' })
  description?: string;

  @ApiProperty({ example: 5000 })
  salary?: number | null;

  @ApiProperty({ example: 'onsite' })
  workMode?: string;

  @ApiProperty({ example: 'clt' })
  employmentType?: string;

  @ApiProperty({ example: 'open' })
  status?: string;
}
