import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import {
  inputGetOneJobDTO,
  outputGetOneJobDTO,
} from 'src/core/application/use-cases/job/get-one-job/get-one.job.dto';

export class GetOneJobInputDto implements inputGetOneJobDTO {
  @ApiProperty({
    example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class GetOneJobOutputDto implements outputGetOneJobDTO {
  @ApiProperty({ example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6' })
  id: string;

  @ApiProperty({ example: 'Frontend Developer' })
  title: string;

  @ApiProperty({ example: 'Descrição da vaga' })
  description: string;

  @ApiProperty({ example: 5000 })
  salary: number | null;

  @ApiProperty({ example: 'onsite' })
  workMode: string;

  @ApiProperty({ example: 'full-time' })
  employmentType: string;

  @ApiProperty({ example: 'open' })
  status: string;
}

export class GetOneJobResponseDto {
  @ApiProperty({ type: GetOneJobOutputDto })
  data: GetOneJobOutputDto;
}
