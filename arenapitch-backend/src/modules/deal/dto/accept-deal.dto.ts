import { IsOptional, IsString } from 'class-validator';

export class AcceptDealDto {
  @IsOptional()
  @IsString()
  note?: string;
}
