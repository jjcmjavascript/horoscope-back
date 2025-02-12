import { TarotBulkDestroyRepository } from '@modules/tarot/repositories/tarot-bulk-destroy.repostory';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TarotClearOldDataScheduleService {
  constructor(
    private readonly tarotBulkDestroyRepository: TarotBulkDestroyRepository,
  ) {}

  @Cron('0 5 * * *')
  async execute(): Promise<void> {
    try {
      console.info(
        'Ejecutando tarea diaria [TarotClearOldDataScheduleService]: Limpiar datos antiguos',
      );

      const date = new Date();
      date.setDate(date.getDate() - 7);

      await this.tarotBulkDestroyRepository.execute({
        where: {
          createdAt: {
            lt: date,
          },
        },
      });
      console.info(
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
