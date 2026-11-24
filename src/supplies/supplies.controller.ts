import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { SuppliesService } from './supplies.service';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('supplies')
export class SuppliesController {
  constructor(private readonly suppliesService: SuppliesService) {}

  @Roles(UserRole.FARM_MANAGER)
  @Post()
  create(@Body() dto: CreateSupplyDto) {
    return this.suppliesService.create(dto);
  }

  @Get()
  findAll() {
    return this.suppliesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suppliesService.findOne(+id);
  }

  @Roles(UserRole.FARM_MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSupplyDto, @Request() req) {
    return this.suppliesService.update(+id, dto, req.user.userId);
  }

  @Roles(UserRole.FARM_MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suppliesService.remove(+id);
  }
}
