import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstname: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ length: 15, nullable: true })
  number: string;

  @Column({ length: 50, nullable: true })
  state: string;

  @Column({ length: 50, nullable: true })
  country: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 50, nullable: true })
  position: string;

  @Column({ length: 50, nullable: true })
  role: string;

  @Column({ length: 20, default: 'active' })
  status: string;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
