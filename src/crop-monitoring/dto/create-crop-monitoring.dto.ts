import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCropMonitoringDto {
  @IsInt()
  cropId: number;

  @IsDateString()
  monitoringDate: string;

  @IsString()
  @IsNotEmpty()
  condition: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
