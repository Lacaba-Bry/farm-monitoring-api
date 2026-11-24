import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Crop } from '../../crops/entities/crop.entity';

@Entity('farm_activities')
export class FarmActivity {
  @PrimaryGeneratedColumn()
  activityId: number;

  @Column()
  userId: number;

  @Column()
  cropId: number;

  @Column({ length: 100 })
  activityName: string;

  @Column({ type: 'datetime' })
  scheduleDate: Date;

  @Column({ length: 20, default: 'Pending' })
  status: string;

  @ManyToOne(() => User, (user) => user.activities)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Crop, (crop) => crop.activities)
  @JoinColumn({ name: 'cropId' })
  crop: Crop;
}
