import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateFarmActivityDto {
  @IsInt()
  userId: number;

  @IsInt()
  cropId: number;

  @IsString()
  @IsNotEmpty()
  activityName: string;

  @IsDateString()
  scheduleDate: string;

  @IsOptional()
  @IsString()
  status?: string;
}
