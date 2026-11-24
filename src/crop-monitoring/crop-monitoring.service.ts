import { Injectable } from '@nestjs/common';
import { CreateCropMonitoringDto } from './dto/create-crop-monitoring.dto.js';
import { UpdateCropMonitoringDto } from './dto/update-crop-monitoring.dto.js';

@Injectable()
export class CropMonitoringService {
  create(createCropMonitoringDto: CreateCropMonitoringDto) {
    return 'This action adds a new cropMonitoring';
  }

  findAll() {
    return `This action returns all cropMonitoring`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cropMonitoring`;
  }

  update(id: number, updateCropMonitoringDto: UpdateCropMonitoringDto) {
    return `This action updates a #${id} cropMonitoring`;
  }

  remove(id: number) {
    return `This action removes a #${id} cropMonitoring`;
  }
}
