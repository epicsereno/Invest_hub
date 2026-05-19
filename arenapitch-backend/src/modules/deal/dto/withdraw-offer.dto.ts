import { IsOptional, IsString } from 'class-validator';

export class WithdrawOfferDto {
  @IsOptional()
  @IsString()
  reason?: string;
}
