import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class Card {
  @IsString()
  @MaxLength(50)
  name: string;

  @IsString()
  @MaxLength(100)
  orientacion: string;
}

export class TarotDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

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
