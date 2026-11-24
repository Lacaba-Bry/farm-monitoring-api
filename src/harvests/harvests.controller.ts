import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { HarvestsService } from './harvests.service';
import { CreateHarvestDto } from './dto/create-harvest.dto';
import { UpdateHarvestDto } from './dto/update-harvest.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('harvests')
export class HarvestsController {
  constructor(private readonly harvestsService: HarvestsService) {}

  @Roles(UserRole.FARMER, UserRole.FARM_MANAGER)
  @Post()
  create(@Body() dto: CreateHarvestDto) {
    return this.harvestsService.create(dto);
  }

  @Get()
  findAll(@Query('cropId') cropId?: string) {
    return this.harvestsService.findAll(cropId ? +cropId : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.harvestsService.findOne(+id);
  }

  @Roles(UserRole.FARMER, UserRole.FARM_MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHarvestDto) {
    return this.harvestsService.update(+id, dto);
  }

  @Roles(UserRole.FARM_MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.harvestsService.remove(+id);
  }
}
