import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CropMonitoring } from '../../crop-monitoring/entities/crop-monitoring.entity';
import { Harvest } from '../../harvests/entities/harvest.entity';
import { FarmActivity } from '../../farm-activities/entities/farm-activity.entity';

@Entity('crops')
export class Crop {
  @PrimaryGeneratedColumn()
  cropId: number;

  @Column({ length: 100 })
  cropName: string;

  @Column({ type: 'date' })
  plantingDate: string;

  @Column({ length: 30, default: 'Growing' })
  cropStatus: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.crops)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => CropMonitoring, (monitoring) => monitoring.crop)
  monitoringRecords: CropMonitoring[];

  @OneToMany(() => Harvest, (harvest) => harvest.crop)
  harvests: Harvest[];

  @OneToMany(() => FarmActivity, (activity) => activity.crop)
  activities: FarmActivity[];
}
