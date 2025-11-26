import { EEmploymentType } from 'src/core/shared/utils/enums/EmploymentType';
import { EStatusJob } from 'src/core/shared/utils/enums/EStatusJob';

import { EWorkMode } from 'src/core/shared/utils/enums/EWorkMode';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class JobModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'float', nullable: true })
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

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
