import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HoroscopeFindOrCreateRepository } from './repositories/horoscope-find-or-create.repository';

@Injectable()
export class HoroscopeScheduleService {
  constructor(
    private readonly horoscopeFindOrCreateRepository: HoroscopeFindOrCreateRepository,
  ) {}

  @Cron('5 5 * * *')
  async handleDailyHoroscope(): Promise<void> {
    try {
      const result = await this.horoscopeFindOrCreateRepository.execute();

      console.log('Tarea completada con éxito', result);
    } catch (error) {
      console.error('Error ejecutando la tarea diaria', error);
    }
  }
}
