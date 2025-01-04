import { Body, Controller, Post } from '@nestjs/common';
import { PushNotificationTokenCreateDto } from './push-notification-token.dto';
import { PushNotificationTokenCreateRepository } from './repositories/push-notification-token-create.repository';
import { Public } from '@shared/decorators/public.decorator';
import { ExpoSendPushNotification } from '@shared/services/expo-push-notification.service';
import { PushNotificationTokenFindAllRepository } from './repositories/push-notification-token-find-all.repository';

@Controller('push-notification-tokens')
export class PushNotificationTokenController {
  constructor(
    private readonly expoService: ExpoSendPushNotification,
    private readonly pushNotificationTokenFindAllRepository: PushNotificationTokenFindAllRepository,
    private readonly pushNotificationTokenCreateRepository: PushNotificationTokenCreateRepository,
  ) {}

  @Public()
  @Post()
  async create(@Body() createDto: PushNotificationTokenCreateDto) {
    await this.pushNotificationTokenCreateRepository.execute(createDto);
  }

  // @Public()
  // @Get('publish')
  // async publish(): Promise<void> {
  //   const tokens = await this.pushNotificationTokenFindAllRepository.execute();

  //   const messages = await this.expoService.preparePushNotification(
  //     tokens.map((t) => t.toPrimitive().token),
  //     {
  //       title: 'Hello, world!',
  //       body: 'This is a test notification.',
  //     },
  //   );

  //   this.expoService.sendPushNotification(messages);
  // }
}
