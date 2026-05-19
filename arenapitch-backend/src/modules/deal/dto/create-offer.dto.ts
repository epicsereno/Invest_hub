import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  pitchId: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsNumber()
  @Min(0)
  equity: number;

  @IsString()
  terms: string;

  @IsOptional()
  @IsString()
  message?: string;
}
