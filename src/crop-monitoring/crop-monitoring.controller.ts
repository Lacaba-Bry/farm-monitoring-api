import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CropMonitoringService } from './crop-monitoring.service.js';
import { CreateCropMonitoringDto } from './dto/create-crop-monitoring.dto.js';
import { UpdateCropMonitoringDto } from './dto/update-crop-monitoring.dto.js';

@Controller('crop-monitoring')
export class CropMonitoringController {
  constructor(private readonly cropMonitoringService: CropMonitoringService) {}

  @Post()
  create(@Body() createCropMonitoringDto: CreateCropMonitoringDto) {
    return this.cropMonitoringService.create(createCropMonitoringDto);
  }

  @Get()
  findAll() {
    return this.cropMonitoringService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropMonitoringService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCropMonitoringDto: UpdateCropMonitoringDto) {
    return this.cropMonitoringService.update(+id, updateCropMonitoringDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropMonitoringService.remove(+id);
  }
}
