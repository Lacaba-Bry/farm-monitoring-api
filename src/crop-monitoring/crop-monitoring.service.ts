import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CropMonitoring } from './entities/crop-monitoring.entity';
import { CreateCropMonitoringDto } from './dto/create-crop-monitoring.dto';
import { UpdateCropMonitoringDto } from './dto/update-crop-monitoring.dto';

@Injectable()
export class CropMonitoringService {
  constructor(
    @InjectRepository(CropMonitoring)
    private readonly monitoringRepo: Repository<CropMonitoring>,
  ) {}

  create(dto: CreateCropMonitoringDto) {
    const record = this.monitoringRepo.create(dto);
    return this.monitoringRepo.save(record);
  }

  findAll(cropId?: number) {
    if (cropId) {
      return this.monitoringRepo.find({ where: { cropId }, relations: { crop: true } });
    }
    return this.monitoringRepo.find({ relations: { crop: true } });
  }

  async findOne(id: number) {
    const record = await this.monitoringRepo.findOne({
      where: { monitoringId: id },
      relations: { crop: true },
    });
    if (!record) throw new NotFoundException(`Monitoring record #${id} not found`);
    return record;
  }

  async update(id: number, dto: UpdateCropMonitoringDto) {
    const record = await this.findOne(id);
    Object.assign(record, dto);
    return this.monitoringRepo.save(record);
  }

  async remove(id: number) {
    const record = await this.findOne(id);
    await this.monitoringRepo.remove(record);
    return { message: 'Monitoring record deleted successfully' };
  }
}
