import { Transform, Type } from 'class-transformer';
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
  @Transform(({ value }) => {
    return decodeURIComponent(value.toString());
  })
  @Matches(/^ExponentPushToken\[[A-Za-z0-9_\-]+\]$/, {
    message: 'Invalid push token',
  })
  token: string;
}

export class TarotCreateDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  @Transform(({ value }) => {
    return value.toString().slice(0, 30);
  })
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  birthday?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  question?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.toString().slice(0, 1200))
  goals?: string;

  @IsString()
  @MaxLength(100)
  @Matches(/^ExponentPushToken\[[A-Za-z0-9_\-]+\]$/, {
    message: 'Invalid push token',
  })
  token: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Card)
  cards: Card[];

  @IsOptional()
  @IsString()
  @MaxLength(200)
  thoughts?: string;
}
