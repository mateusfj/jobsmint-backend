import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobModel } from '../jobs/jobs.model';
import { UserModel } from '../user/user.model';

@Entity()
export class CompanyModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserModel, (user) => user.id)
  @JoinColumn({ name: 'owner_id' })
  owner: UserModel;

  @Column()
  owner_id: string;

  @Column()
  corporate_reason: string;

  @Column()
  fantasy_name: string;

  @Column()
  industry: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar' })
  cnpj: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  website: string | null;

  @Column({ type: 'varchar', nullable: true })
  logo_url: string | null;

  @Column({ type: 'int', nullable: true })
  number: number | null;

  @Column({ type: 'varchar', nullable: true })
  street: string | null;

  @Column({ type: 'varchar', nullable: true })
  neighborhood: string | null;

  @Column({ type: 'varchar', nullable: true })
  complement: string | null;

  @Column({ type: 'varchar', nullable: true })
  city: string | null;

  @Column({ type: 'varchar', nullable: true })
  state: string | null;

  @Column({ type: 'varchar', nullable: true })
  zip_code: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToMany(() => JobModel, (job) => job.company)
  jobs: JobModel[];
}
