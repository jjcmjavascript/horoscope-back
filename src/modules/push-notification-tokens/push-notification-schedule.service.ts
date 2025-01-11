import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PushNotificationTokenPublishNotification } from '@modules/push-notification-tokens/repositories/push-notification-token-publish.repository';

@Injectable()
export class PushNotificationScheduleService {
  constructor(
    private readonly pushNotificationTokenPublishNotification: PushNotificationTokenPublishNotification,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleDailyHoroscope(): Promise<void> {
    try {
      console.log('creatin notification');
      await this.pushNotificationTokenPublishNotification.execute(
        'Llego tu horóscopo',
        'La magia del universo hoy estará contigo',
      );
      console.log('notification sended');
    } catch (error) {
      console.error('Error ejecutando las notificaciones', error);
    }
  }
}
