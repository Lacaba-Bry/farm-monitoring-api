import { Injectable } from '@nestjs/common';
import { CreateFarmActivityDto } from './dto/create-farm-activity.dto.js';
import { UpdateFarmActivityDto } from './dto/update-farm-activity.dto.js';

@Injectable()
export class FarmActivitiesService {
  create(createFarmActivityDto: CreateFarmActivityDto) {
    return 'This action adds a new farmActivity';
  }

  findAll() {
    return `This action returns all farmActivities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} farmActivity`;
  }

  update(id: number, updateFarmActivityDto: UpdateFarmActivityDto) {
    return `This action updates a #${id} farmActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} farmActivity`;
  }
}
