import { Module } from '@nestjs/common';
import { PushNotificationTokenController } from './push-notification-token.controller';
import { PushNotificationTokenCreateRepository } from './repositories/push-notification-token-create.repository';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { PushNotificationTokenFindAllRepository } from './repositories/push-notification-token-find-all.repository';
import { ExpoSendPushNotification } from '@shared/services/expo-push-notification.service';
import { PushNotificationScheduleService } from './push-notification-schedule.service';
import { PushNotificationTokenPublishNotification } from './repositories/push-notification-token-publish.repository';
import { PushNotificacionTokenClearOldDataScheduleService } from './push-notificacion-token-clear-old-data-schedule.service';
import { PushNotificationTokenBulkDestroyRespository } from './repositories/push-notification-token-bulk-destroy.respository';

@Module({
  imports: [PrismaModule],
  providers: [
    ExpoSendPushNotification,
    PushNotificationTokenCreateRepository,
    PushNotificationTokenFindAllRepository,
    PushNotificationTokenPublishNotification,
    PushNotificationScheduleService,
    PushNotificationTokenBulkDestroyRespository,
    PushNotificacionTokenClearOldDataScheduleService,
  ],
  controllers: [PushNotificationTokenController],
  exports: [
    PushNotificationTokenCreateRepository,
    PushNotificationTokenFindAllRepository,
  ],
})
export class PushNotificationTokenModule {}
