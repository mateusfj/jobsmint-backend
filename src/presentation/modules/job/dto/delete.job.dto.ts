import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import {
  inputDeleteJobDTO,
  outputDeleteJobDTO,
} from 'src/core/application/use-cases/job/delete-job/delete.job.dto';

export class DeleteJobDTO implements inputDeleteJobDTO {
  @ApiProperty({
    example: '1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p6',
    description: 'Id da vaga',
  })
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class DeleteJobResponseDTO implements outputDeleteJobDTO {
  @ApiProperty({ example: 'Job deleted successfully' })
  message: string;
}
