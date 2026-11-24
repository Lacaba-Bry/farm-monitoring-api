import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateSupplyDto {
  @IsString()
  @IsNotEmpty()
  supplyName: string;

  @IsString()
  @IsNotEmpty()
  supplyType: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  unit: string;

  @IsNumber()
  @Min(0)
  minimumStock: number;
}
