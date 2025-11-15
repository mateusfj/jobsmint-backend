import { EEmploymentType } from 'src/core/shared/utils/enums/EmploymentType';
import { EStatusJobs } from 'src/core/shared/utils/enums/EStatusJobs';
import { EWorkMode } from 'src/core/shared/utils/enums/EWorkMode';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JobsModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  salary: number | null;

  @Column({ type: 'enum', enum: EWorkMode, default: EWorkMode.FULL_TIME })
  workMode: EWorkMode;

  @Column({
    type: 'enum',
    enum: EEmploymentType,
    default: EEmploymentType.CLT,
  })
  employmentType: EEmploymentType;

  @Column({ type: 'enum', enum: EStatusJobs, default: EStatusJobs.OPEN })
  status: EStatusJobs;

  @Column()
  isActive: boolean;
}
