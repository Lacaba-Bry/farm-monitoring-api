import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropMonitoring } from './entities/crop-monitoring.entity';
import { CropMonitoringService } from './crop-monitoring.service';
import { CropMonitoringController } from './crop-monitoring.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CropMonitoring])],
  controllers: [CropMonitoringController],
  providers: [CropMonitoringService],
})
export class CropMonitoringModule {}
