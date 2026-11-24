import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Crop } from '../../crops/entities/crop.entity';
import { FarmActivity } from '../../farm-activities/entities/farm-activity.entity';
import { Notification } from '../../notifications/entities/notification.entity';

export enum UserRole {
  FARMER = 'farmer',
  FARM_WORKER = 'farm worker',
  FARM_MANAGER = 'farm manager',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.FARMER })
  role: UserRole;

  @OneToMany(() => Crop, (crop) => crop.user)
  crops: Crop[];

  @OneToMany(() => FarmActivity, (activity) => activity.user)
  activities: FarmActivity[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
