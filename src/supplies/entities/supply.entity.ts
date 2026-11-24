import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Notification } from '../../notifications/entities/notification.entity';

@Entity('supplies')
export class Supply {
  @PrimaryGeneratedColumn()
  supplyId: number;

  @Column({ length: 100 })
  supplyName: string;

  @Column({ length: 50 })
  supplyType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ length: 20 })
  unit: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  minimumStock: number;

  @OneToMany(() => Notification, (notification) => notification.supply)
  notifications: Notification[];
}
