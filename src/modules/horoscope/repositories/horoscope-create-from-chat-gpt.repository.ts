import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HoroscopeCreateRepository } from './horoscope-create.repository';
import { initHoroscopeProcess } from '@scripts/scrapper';
import { HoroscopeDetails } from '@shared/entities/horoscope-details.entity';
import { Horoscope } from '@shared/entities/horoscope.entity';

interface RequestQuery {
  date: Date;
  signs: Record<string, string>;
}

@Injectable()
export class HoroscopeCreateFromChatGptRepository {
  constructor(
    private readonly horoscopeCreateRepository: HoroscopeCreateRepository,
  ) {}

  async executeTransaction(): Promise<{
    horoscope: Horoscope;
    horoscopeDetails: HoroscopeDetails[];
  }> {
    try {
      const scriptResult = (await initHoroscopeProcess()) as RequestQuery;

      const result = await this.horoscopeCreateRepository.executeTransaction(
        scriptResult.signs,
      );

      return {
        horoscope: result.horoscope,
        horoscopeDetails: result.horoscopeDetails,
      };
    } catch (e: unknown) {
      console.error(e);
      throw new InternalServerErrorException(
        'An unexpected error occurred during horoscope creation',
      );
    }
  }
}
