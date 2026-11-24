import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmActivityDto } from './create-farm-activity.dto.js';

export class UpdateFarmActivityDto extends PartialType(CreateFarmActivityDto) {}
