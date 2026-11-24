import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CropMonitoringService } from './crop-monitoring.service';
import { CreateCropMonitoringDto } from './dto/create-crop-monitoring.dto';
import { UpdateCropMonitoringDto } from './dto/update-crop-monitoring.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('crop-monitoring')
export class CropMonitoringController {
  constructor(private readonly monitoringService: CropMonitoringService) {}

  @Roles(UserRole.FARMER, UserRole.FARM_WORKER, UserRole.FARM_MANAGER)
  @Post()
  create(@Body() dto: CreateCropMonitoringDto) {
    return this.monitoringService.create(dto);
  }

  @Get()
  findAll(@Query('cropId') cropId?: string) {
    return this.monitoringService.findAll(cropId ? +cropId : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.monitoringService.findOne(+id);
  }

  @Roles(UserRole.FARMER, UserRole.FARM_MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCropMonitoringDto) {
    return this.monitoringService.update(+id, dto);
  }

  @Roles(UserRole.FARM_MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.monitoringService.remove(+id);
  }
}
