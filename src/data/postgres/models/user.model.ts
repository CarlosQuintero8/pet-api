import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  USER = "user",
  ADMIN = "admin"
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 50,
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('varchar', {
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role: UserRole;

  @Column('varchar', {
    length: 20,
    nullable: true,
  })
  phone: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
  })
  address: string;

  @Column('boolean', {
    default: false,
    nullable: false,
  })
  isEmailVerified: boolean;

  @Column('varchar', {
    nullable: true,
    length: 36,
  })
  verificationToken: string | null;

  @Column('boolean', {
    default: true,
    nullable: false,
  })
  status: boolean;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // Solo hashear si la contraseña ha sido modificada
    if (this.password && (!this.id || this.password.indexOf('$2b$') !== 0)) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}