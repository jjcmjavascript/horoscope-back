import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class PushNotificationTokenCreateDto {
  @IsOptional()
  @IsNumber()
  userId?: number;

  @IsString()
  @IsNotEmpty()
  @Matches(/^ExponentPushToken\[[A-Za-z0-9_\-]+\]$/, {
    message: 'Invalid push token',
  })
  token: string;
}
