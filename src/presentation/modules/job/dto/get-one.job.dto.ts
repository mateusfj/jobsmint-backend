import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import {
  inputGetOneJobDTO,
  outputGetOneJobDTO,
} from 'src/core/application/use-cases/job/get-one-job/get-one.job.dto';

export class GetOneJobDTO implements inputGetOneJobDTO {
  @ApiProperty({
    example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
    description: 'Id da vaga',
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class GetOneJobResponseDTO implements outputGetOneJobDTO {
  @ApiProperty({ example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6' })
  id: string;
  @ApiProperty({ example: 'Frontend Developer' })
  title: string;
  @ApiProperty({ example: 'Descrição da vaga' })
  description: string;
  @ApiProperty({ example: 5000, nullable: true })
  salary: number | null;
  @ApiProperty({ example: 'on-site' })
  workMode: string;
  @ApiProperty({ example: 'full-time' })
  employmentType: string;
  @ApiProperty({ example: 'open' })
  status: string;
}
