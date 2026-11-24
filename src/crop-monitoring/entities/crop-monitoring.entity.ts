import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Crop } from '../../crops/entities/crop.entity';

@Entity('crop_monitoring')
export class CropMonitoring {
  @PrimaryGeneratedColumn()
  monitoringId: number;

  @Column()
  cropId: number;

  @Column({ type: 'date' })
  monitoringDate: string;

  @Column({ length: 50 })
  condition: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Crop, (crop) => crop.monitoringRecords)
  @JoinColumn({ name: 'cropId' })
  crop: Crop;
}
