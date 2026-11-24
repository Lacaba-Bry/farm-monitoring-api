import { PartialType } from '@nestjs/mapped-types';
import { CreateCropMonitoringDto } from './create-crop-monitoring.dto.js';

export class UpdateCropMonitoringDto extends PartialType(CreateCropMonitoringDto) {}
