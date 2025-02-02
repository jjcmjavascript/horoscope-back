import { TarotBulkDestroyRepository } from '@modules/tarot/repositories/tarot-bulk-destroy.repostory';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TarotClearOldDataScheduleService {
  constructor(
    private readonly tarotBulkDestroyRepository: TarotBulkDestroyRepository,
  ) {}

  @Cron('0 5 * * *')
  async handleDailyHoroscope(): Promise<void> {
    try {
      console.log(
        'Ejecutando tarea diaria [TarotClearOldDataScheduleService]: Limpiar datos antiguos',
      );

      const date = new Date();
      date.setDate(date.getDate() - 5);

      await this.tarotBulkDestroyRepository.execute({
        where: {
          createdAt: {
            lt: date,
          },
        },
      });
      console.log(
        'Datos antiguos eliminados [TarotClearOldDataScheduleService]',
      );
    } catch (error) {
      console.error(
        'Error ejecutando la tarea diaria: [TarotClearOldDataScheduleService]',
        error,
      );
    }
  }
}
