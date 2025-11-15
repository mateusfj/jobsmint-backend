import { EEmploymentType } from 'src/core/shared/utils/enums/EmploymentType';
import { EStatusJob } from 'src/core/shared/utils/enums/EStatusJob';

import { EWorkMode } from 'src/core/shared/utils/enums/EWorkMode';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'int', nullable: true })
  salary: number | null;

  @Column({ type: 'enum', enum: EWorkMode, default: EWorkMode.FULL_TIME })
  workMode: EWorkMode;

  @Column({
    type: 'enum',
    enum: EEmploymentType,
    default: EEmploymentType.CLT,
  })
  employmentType: EEmploymentType;

  @Column({ type: 'enum', enum: EStatusJob, default: EStatusJob.OPEN })
  status: EStatusJob;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
