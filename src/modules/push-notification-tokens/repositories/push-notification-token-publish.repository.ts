import { ExpoSendPushNotification } from '@shared/services/expo-push-notification.service';
import { PushNotificationTokenFindAllRepository } from './push-notification-token-find-all.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PushNotificationTokenPublishNotification {
  constructor(
    private readonly expoService: ExpoSendPushNotification,
    private readonly pushNotificationTokenFindAllRepository: PushNotificationTokenFindAllRepository,
  ) {}

  async execute(title: string, body: string) {
    const tokens = await this.pushNotificationTokenFindAllRepository.execute();
    const messages = await this.expoService.preparePushNotification(
      tokens.map((t) => t.toPrimitive().token),
      {
        title,
        body,
      },
    );
    console.log(messages);

    this.expoService.sendPushNotification(messages);
  }
}
