import { ExpoSendPushNotification } from '@shared/services/expo-push-notification.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class PushNotificationersonalMsgRepository {
  constructor(
    private readonly expoService: ExpoSendPushNotification,
    private readonly prismaService: PrismaService,
  ) {}

  async execute(title: string, body: string, token: string) {
    try {
      console.log('repository: preparing notifications');

      const messages = await this.expoService.preparePushNotification([token], {
        title,
        body,
      });

      const result = await this.expoService.sendPushNotification(messages);

      console.log('repository: sended notifications', result);

      const withErrors = result
        .filter((i) => i.status === 'error')
        .map((i) => i?.details?.expoPushToken);

      console.log(
        'repository: removing errors tokens: ',
        withErrors.length,
        withErrors,
      );

      this.prismaService.pushNotificationToken.deleteMany({
        where: {
          token: {
            in: withErrors,
          },
        },
      });
    } catch {
      throw new InternalServerErrorException('error sending notifications');
    }
  }
}
