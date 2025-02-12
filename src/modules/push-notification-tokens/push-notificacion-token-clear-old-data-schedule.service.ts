import { PushNotificationTokenBulkDestroyRespository } from '@modules/push-notification-tokens/repositories/push-notification-token-bulk-destroy.respository';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PushNotificacionTokenClearOldDataScheduleService {
  constructor(
    private readonly pushNotificationTokenBulkDestroyRespository: PushNotificationTokenBulkDestroyRespository,
  ) {}

  @Cron('0 5 * * *')
  async execute(): Promise<void> {
    try {
      console.info(
        'Ejecutando tarea diaria [PushNotificacionTokenClearOldDataScheduleService]: Limpiar datos antiguos',
      );

      const date = new Date();
      date.setDate(date.getDate() - 7);

      await this.pushNotificationTokenBulkDestroyRespository.execute({
        where: {
          createdAt: {
            lt: date,
          },
        },
      });
      console.info(
        'Datos antiguos eliminados [PushNotificacionTokenClearOldDataScheduleService]',
      );
    } catch (error) {
      console.error(
        'Error ejecutando la tarea diaria: [PushNotificacionTokenClearOldDataScheduleService]',
        error,
      );
    }
  }
}
