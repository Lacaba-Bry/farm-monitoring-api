import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmActivity } from './entities/farm-activity.entity';
import { CreateFarmActivityDto } from './dto/create-farm-activity.dto';
import { UpdateFarmActivityDto } from './dto/update-farm-activity.dto';

@Injectable()
export class FarmActivitiesService {
  constructor(
    @InjectRepository(FarmActivity)
    private readonly activitiesRepo: Repository<FarmActivity>,
  ) {}

  create(dto: CreateFarmActivityDto) {
    const activity = this.activitiesRepo.create(dto);
    return this.activitiesRepo.save(activity);
  }

  findAll() {
    return this.activitiesRepo.find({ relations: { user: true, crop: true } });
  }

  async findOne(id: number) {
    const activity = await this.activitiesRepo.findOne({
      where: { activityId: id },
      relations: { user: true, crop: true },
    });
    if (!activity) throw new NotFoundException(`Farm activity #${id} not found`);
    return activity;
  }

  async update(id: number, dto: UpdateFarmActivityDto) {
    const activity = await this.findOne(id);
    Object.assign(activity, dto);
    return this.activitiesRepo.save(activity);
  }

  async remove(id: number) {
    const activity = await this.findOne(id);
    await this.activitiesRepo.remove(activity);
    return { message: 'Farm activity deleted successfully' };
  }
}
