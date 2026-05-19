import { IsEnum, IsNumber, IsOptional, IsString, IsUrl, Min, MinLength } from 'class-validator';

export enum ArenaTypeDto {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export class CreatePitchDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(20)
  summary: string;

  @IsString()
  category: string;

  @IsEnum(ArenaTypeDto)
  arenaType: ArenaTypeDto;

  @IsNumber()
  @Min(0)
  fundingAsk: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  equityOffered?: number;

  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @IsOptional()
  @IsUrl()
  deckUrl?: string;
}
