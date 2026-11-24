import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Harvest } from './entities/harvest.entity';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';

@Injectable()
export class HarvestsService {
  constructor(
    @InjectRepository(Harvest)
    private readonly harvestsRepo: Repository<Harvest>,
  ) {}

  create(dto: CreateHarvestDto) {
    const harvest = this.harvestsRepo.create(dto);
    return this.harvestsRepo.save(harvest);
  }

  findAll(cropId?: number) {
    if (cropId) {
      return this.harvestsRepo.find({ where: { cropId }, relations: { crop: true } });
    }
    return this.harvestsRepo.find({ relations: { crop: true } });
  }

  async findOne(id: number) {
    const harvest = await this.harvestsRepo.findOne({
      where: { harvestId: id },
      relations: { crop: true },
    });
    if (!harvest) throw new NotFoundException(`Harvest #${id} not found`);
    return harvest;
  }

  async update(id: number, dto: UpdateHarvestDto) {
    const harvest = await this.findOne(id);
    Object.assign(harvest, dto);
    return this.harvestsRepo.save(harvest);
  }

  async remove(id: number) {
    const harvest = await this.findOne(id);
    await this.harvestsRepo.remove(harvest);
    return { message: 'Harvest record deleted successfully' };
  }
}
