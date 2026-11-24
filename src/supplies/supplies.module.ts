import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supply } from './entities/supply.entity';
import { Notification } from '../notifications/entities/notification.entity';
import { SuppliesService } from './supplies.service';
import { SuppliesController } from './supplies.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Supply, Notification])],
  controllers: [SuppliesController],
  providers: [SuppliesService],
})
export class SuppliesModule {}
