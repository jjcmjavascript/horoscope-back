import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class Card {
  @IsNumber()
  order: number;

  @IsString()
  @MaxLength(40)
  name: string;

  @IsString()
  @MaxLength(20)
  orientation: string;
}

export class TarotIndexDto {
  @IsString()
  @MaxLength(100)
  @Matches(/^ExponentPushToken\[[A-Za-z0-9]+\]$/, {
    message: 'Invalid push token',
  })
  token: string;
}

export class TarotCreateDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  birthday?: string;

  @IsString()
  @MaxLength(150)
  question?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  birthDate?: string;

  @IsString()
  @MaxLength(100)
  @Matches(/^ExponentPushToken\[[A-Za-z0-9]+\]$/, {
    message: 'Invalid push token',
  })
  token: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Card)
  cards: Card[];
}
