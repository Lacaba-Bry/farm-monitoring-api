import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FarmActivitiesService } from './farm-activities.service.js';
import { CreateFarmActivityDto } from './dto/create-farm-activity.dto.js';
import { UpdateFarmActivityDto } from './dto/update-farm-activity.dto.js';

@Controller('farm-activities')
export class FarmActivitiesController {
  constructor(private readonly farmActivitiesService: FarmActivitiesService) {}

  @Post()
  create(@Body() createFarmActivityDto: CreateFarmActivityDto) {
    return this.farmActivitiesService.create(createFarmActivityDto);
  }

  @Get()
  findAll() {
    return this.farmActivitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmActivitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFarmActivityDto: UpdateFarmActivityDto) {
    return this.farmActivitiesService.update(+id, updateFarmActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmActivitiesService.remove(+id);
  }
}
