import { IsNumber, IsString, Min } from 'class-validator';

export class CounterOfferDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNumber()
  @Min(0)
  equity: number;

  @IsString()
  terms: string;
}
