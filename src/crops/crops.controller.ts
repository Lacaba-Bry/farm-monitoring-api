import { Controller, Get, Post, Body, Put, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CropsService } from './crops.service';
import { CreateCropDto } from './dto/create-crop.dto';
import { UpdateCropDto } from './dto/update-crop.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  @Roles(UserRole.FARMER, UserRole.FARM_MANAGER)
  @Post()
  create(@Body() dto: CreateCropDto) {
    return this.cropsService.create(dto);
  }

  @Get()
  findAll(@Query('cropStatus') cropStatus?: string) {
    return this.cropsService.findAll(cropStatus);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cropsService.findOne(+id);
  }

  @Get(':id/crop-monitoring')
  findMonitoringByCrop(@Param('id') id: string) {
    return this.cropsService.findMonitoringByCrop(+id);
  }

  @Roles(UserRole.FARMER, UserRole.FARM_MANAGER)
  @Put(':id')
  replace(@Param('id') id: string, @Body() dto: UpdateCropDto) {
    return this.cropsService.update(+id, dto);
  }

  @Roles(UserRole.FARMER, UserRole.FARM_MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCropDto) {
    return this.cropsService.update(+id, dto);
  }

  @Roles(UserRole.FARM_MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cropsService.remove(+id);
  }
}
