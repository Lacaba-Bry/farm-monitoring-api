import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crop } from './entities/crop.entity';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop)
    private readonly cropsRepo: Repository<Crop>,
  ) {}

  create(dto: CreateCropDto) {
    const crop = this.cropsRepo.create(dto);
    return this.cropsRepo.save(crop);
  }

  findAll(cropStatus?: string) {
    if (cropStatus) {
      return this.cropsRepo.find({ where: { cropStatus }, relations: { user: true } });
    }
    return this.cropsRepo.find({ relations: { user: true } });
  }

  async findOne(id: number) {
    const crop = await this.cropsRepo.findOne({
      where: { cropId: id },
      relations: {
        user: true,
        monitoringRecords: true,
        harvests: true,
        activities: true,
      },
    });
    if (!crop) throw new NotFoundException(`Crop #${id} not found`);
    return crop;
  }

  async findMonitoringByCrop(id: number) {
    const crop = await this.cropsRepo.findOne({
      where: { cropId: id },
      relations: { monitoringRecords: true },
    });
    if (!crop) throw new NotFoundException(`Crop #${id} not found`);
    return crop.monitoringRecords;
  }

  async update(id: number, dto: UpdateCropDto) {
    const crop = await this.findOne(id);
    Object.assign(crop, dto);
    return this.cropsRepo.save(crop);
  }

  async remove(id: number) {
    const crop = await this.findOne(id);
    await this.cropsRepo.remove(crop);
    return { message: 'Crop deleted successfully' };
  }
}
