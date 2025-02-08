import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PushNotificationTokenPublishNotification } from '@modules/push-notification-tokens/repositories/push-notification-token-publish.repository';
import { PUSH_NOTIFICATION_MESSAGES } from './constants/push-notification-messages.constants';

@Injectable()
export class PushNotificationScheduleService {
  constructor(
    private readonly pushNotificationTokenPublishNotification: PushNotificationTokenPublishNotification,
  ) {}

  @Cron('10 12 * * *')
  async handleDailyHoroscope(): Promise<void> {
    try {
      this.pushNotificationTokenPublishNotification.execute(
        PUSH_NOTIFICATION_MESSAGES.titles.sort(() => Math.random() - 0.5)[0],
        PUSH_NOTIFICATION_MESSAGES.subtitles.sort(() => Math.random() - 0.5)[0],
      );
      console.log('notification sended');
    } catch (error) {
      console.error('Error ejecutando las notificaciones', error);
    }
  }
}
