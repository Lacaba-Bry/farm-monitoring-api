import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCropDto {
  @IsString()
  @IsNotEmpty()
  cropName: string;

  @IsDateString()
  plantingDate: string;

  @IsOptional()
  @IsString()
  cropStatus?: string;

  @IsInt()
  userId: number;
}
