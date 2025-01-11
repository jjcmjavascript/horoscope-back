import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HoroscopeFindOrCreateRepository } from './repositories/horoscope-find-or-create.repository';

@Injectable()
export class HoroscopeScheduleService {
  constructor(
    private readonly horoscopeFindOrCreateRepository: HoroscopeFindOrCreateRepository,
  ) {}

  @Cron(CronExpression.EVERY_4_HOURS)
  async handleDailyHoroscope(): Promise<void> {
    console.log('Iniciando la tarea diaria de horóscopos');
    try {
      const result = await this.horoscopeFindOrCreateRepository.execute();
      console.log('Tarea completada con éxito', result);
    } catch (error) {
      console.error('Error ejecutando la tarea diaria', error);
    }
  }
}
