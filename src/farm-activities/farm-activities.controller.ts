import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FarmActivitiesService } from './farm-activities.service';
import { CreateFarmActivityDto } from './dto/create-farm-activity.dto';
import { UpdateFarmActivityDto } from './dto/update-farm-activity.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('farm-activities')
export class FarmActivitiesController {
  constructor(private readonly activitiesService: FarmActivitiesService) {}

  @Roles(UserRole.FARMER, UserRole.FARM_MANAGER)
  @Post()
  create(@Body() dto: CreateFarmActivityDto) {
    return this.activitiesService.create(dto);
  }

  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }

  @Roles(UserRole.FARMER, UserRole.FARM_WORKER, UserRole.FARM_MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateFarmActivityDto) {
    return this.activitiesService.update(+id, dto);
  }

  @Roles(UserRole.FARM_MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(+id);
  }
}
