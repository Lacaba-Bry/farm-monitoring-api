import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Supply } from '../../supplies/entities/supply.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  notificationId: number;

  @Column()
  userId: number;

  @Column()
  supplyId: number;

  @Column({ length: 255 })
  message: string;

  @CreateDateColumn()
  notificationDate: Date;

  @Column({ default: false })
  isRead: boolean;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Supply, (supply) => supply.notifications)
  @JoinColumn({ name: 'supplyId' })
  supply: Supply;
}
