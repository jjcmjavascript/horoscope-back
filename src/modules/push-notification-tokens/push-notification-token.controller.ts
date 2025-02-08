// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PushNotificationTokenCreateDto } from './push-notification-token.dto';
import { PushNotificationTokenCreateRepository } from './repositories/push-notification-token-create.repository';
import { Public } from '@shared/decorators/public.decorator';
import { PushNotificationersonalMsgRepository } from './repositories/push-notification-personal-msg.repository';

@Controller('push-notification-tokens')
export class PushNotificationTokenController {
  constructor(
    private readonly pushNotificationTokenCreateRepository: PushNotificationTokenCreateRepository,
    private readonly pushNotificationersonalMsgRepository: PushNotificationersonalMsgRepository,
  ) {}

  @Public()
  @Post()
  async create(@Body() createDto: PushNotificationTokenCreateDto) {
    await this.pushNotificationTokenCreateRepository.execute(createDto);
  }

  // @Public()
  // @Get('publish-one')
  // async publish(@Query() params: { token: string }): Promise<void> {
  //   console.log('params', params);
  //   return await this.pushNotificationersonalMsgRepository.execute(
  //     '',
  //     '',
  //     params.token,
  //   );
  // }
}
