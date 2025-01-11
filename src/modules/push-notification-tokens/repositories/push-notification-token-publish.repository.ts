import { ExpoSendPushNotification } from '@shared/services/expo-push-notification.service';
import { PushNotificationTokenFindAllRepository } from './push-notification-token-find-all.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class PushNotificationTokenPublishNotification {
  constructor(
    private readonly expoService: ExpoSendPushNotification,
    private readonly pushNotificationTokenFindAllRepository: PushNotificationTokenFindAllRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async execute(title: string, body: string) {
    try {
      console.log('repository: preparing notifications');
      const tokens =
        await this.pushNotificationTokenFindAllRepository.execute();
      const messages = await this.expoService.preparePushNotification(
        tokens.map((t) => t.toPrimitive().token),
        {
          title,
          body,
        },
      );

      const result = await this.expoService.sendPushNotification(messages);
      console.log('repository: sended notifications', result);

      const withErrors = result
        .filter((i) => i.status === 'error')
        .map((i) => i?.details?.expoPushToken);

      const query = await this.prismaService.pushNotificationToken.deleteMany({
        where: {
          token: {
            in: withErrors,
          },
        },
      });
      console.log('repository: removing errors tokens', query);
    } catch {
      throw new InternalServerErrorException('error sending notifications');
    }
  }
}
