import { ERole } from 'src/core/shared/utils/enums/ERole';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ERole, default: ERole.CANDIDATE })
  role: ERole;

  @Column()
  isActive: boolean;
}
