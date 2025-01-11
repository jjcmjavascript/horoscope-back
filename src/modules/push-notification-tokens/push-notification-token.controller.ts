import { Body, Controller, Get, Post } from '@nestjs/common';
import { PushNotificationTokenCreateDto } from './push-notification-token.dto';
import { PushNotificationTokenCreateRepository } from './repositories/push-notification-token-create.repository';
import { Public } from '@shared/decorators/public.decorator';
import { PushNotificationTokenPublishNotification } from './repositories/push-notification-token-publish.repository';

@Controller('push-notification-tokens')
export class PushNotificationTokenController {
  constructor(
    private readonly pushNotificationTokenCreateRepository: PushNotificationTokenCreateRepository,
    private readonly pushNotificationTokenSend: PushNotificationTokenPublishNotification,
  ) {}

  @Public()
  @Post()
  async create(@Body() createDto: PushNotificationTokenCreateDto) {
    await this.pushNotificationTokenCreateRepository.execute(createDto);
  }

  @Public()
  @Get('publish')
  async publish(): Promise<void> {
    return await this.pushNotificationTokenSend.execute(
      'Llego tu horóscopo',
      'La magia del universo hoy estará contigo',
    );
  }
}
