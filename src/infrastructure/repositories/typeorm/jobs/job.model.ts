import { EEmploymentType } from 'src/core/domain/@shared/enums/EmploymentType';
import { EStatusJob } from 'src/core/domain/@shared/enums/EStatusJob';

import { EWorkMode } from 'src/core/domain/@shared/enums/EWorkMode';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CompanyModel } from '../companies/companies.model';

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
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @ManyToOne(() => CompanyModel, (company) => company.jobs)
  @JoinColumn({ name: 'company_id' })
  company: CompanyModel;

  @Column({ type: 'uuid' })
  company_id: string;
}
