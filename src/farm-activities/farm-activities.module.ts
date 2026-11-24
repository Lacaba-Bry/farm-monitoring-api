import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmActivity } from './entities/farm-activity.entity';
import { FarmActivitiesService } from './farm-activities.service';
import { FarmActivitiesController } from './farm-activities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FarmActivity])],
  controllers: [FarmActivitiesController],
  providers: [FarmActivitiesService],
})
export class FarmActivitiesModule {}
