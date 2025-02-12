import { HoroscopeDestroyBulkRepository } from '@modules/horoscope/repositories/horoscope-destroy-bulk.repository';
import { HoroscopeDetailsDestoyBulkRespository } from '@modules/horoscope/repositories/horoscope-details-destoy-bulk.respository';
import { HoroscopeFindAllRepository } from '@modules/horoscope/repositories/horoscope-find-all.repository';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class HoroscopesClearOldDataScheduleService {
  constructor(
    private readonly horoscopeFindAllRepository: HoroscopeFindAllRepository,
    private readonly horoscopeDetailsDestoyBulkRespository: HoroscopeDetailsDestoyBulkRespository,
    private readonly horoscopeDestroyBulkRepository: HoroscopeDestroyBulkRepository,
  ) {}

  @Cron('0 5 * * *')
  async handleDailyHoroscope(): Promise<void> {
    try {
      console.info(
        'Ejecutando tarea diaria [HoroscopesClearOldDataScheduleService]: Limpiar datos antiguos',
      );

      const date = new Date();
      date.setDate(date.getDate() - 7);
      const horoscopes = await this.horoscopeFindAllRepository.execute({
        where: {
          createdAt: {
            lt: date,
          },
        },
      });

      const horoscopeIds = horoscopes.map((h) => h.id);

      await this.horoscopeDetailsDestoyBulkRespository.execute({
        where: {
          horoscopeId: {
            in: horoscopeIds,
          },
        },
      });

      await this.horoscopeDestroyBulkRepository.execute({
        where: {
          id: {
            in: horoscopeIds,
          },
        },
      });

      console.info(
        'Datos antiguos eliminados [HoroscopesClearOldDataScheduleService]',
      );
    } catch (error) {
      console.error(
        'Error ejecutando la tarea diaria: [HoroscopesClearOldDataScheduleService]',
        error,
      );
    }
  }
}
