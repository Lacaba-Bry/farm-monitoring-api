import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Crop } from '../../crops/entities/crop.entity';

@Entity('harvests')
export class Harvest {
  @PrimaryGeneratedColumn()
  harvestId: number;

  @Column()
  cropId: number;

  @Column({ type: 'date' })
  harvestDate: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quantity: number;

  @Column({ length: 20 })
  unit: string;

  @ManyToOne(() => Crop, (crop) => crop.harvests)
  @JoinColumn({ name: 'cropId' })
  crop: Crop;
}
