import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import {
  inputCreateJobDTO,
  outputCreateJobDTO,
} from 'src/core/application/use-cases/job/create-job/create.job.dto';
import { EEmploymentType } from 'src/core/shared/utils/enums/EmploymentType';
import { EStatusJob } from 'src/core/shared/utils/enums/EStatusJob';
import { EWorkMode } from 'src/core/shared/utils/enums/EWorkMode';

export class UpdateJobDto implements Partial<inputCreateJobDTO> {
  @ApiProperty({ example: 'Frontend Developer' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example:
      'A pessoa será responsável por construir e evoluir aplicações web, colaborar com o time de produto e contribuir na arquitetura das soluções.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 5000 })
  @IsNotEmpty()
  @IsOptional()
  salary: number | null;

  @ApiProperty({ example: 'onsite' })
  @IsEnum(EWorkMode)
  @IsString()
  @IsNotEmpty()
  workMode: EWorkMode;

  @ApiProperty({ example: 'clt' })
  @IsEnum(EEmploymentType)
  @IsString()
  @IsNotEmpty()
  employmentType: EEmploymentType;

  @ApiProperty({ example: 'open' })
  @IsEnum(EStatusJob)
  @IsString()
  @IsNotEmpty()
  status: EStatusJob;
}

export class CreateJobResponseDto implements outputCreateJobDTO {
  @ApiProperty({ example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6' })
  id: string;

  @ApiProperty({ example: 'Frontend Developer' })
  title: string;

  @ApiProperty({
    example:
      'A pessoa será responsável por construir e evoluir aplicações web, colaborar com o time de produto e contribuir na arquitetura das soluções.',
  })
  description: string;

  @ApiProperty({ example: 5000 })
  salary: number | null;

  @ApiProperty({ example: 'onsite' })
  workMode: EWorkMode;

  @ApiProperty({ example: 'clt' })
  employmentType: EEmploymentType;

  @ApiProperty({ example: 'open' })
  status: EStatusJob;
}
