import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HoroscopeFindOneFromNowRepository } from './horoscope-find-one-from-now.repository';
import { HoroscopeDetailsFindAllRepository } from './horoscope-details-find-all.repository';
import { HoroscopeCreateFromChatGptRepository } from './horoscope-create-from-chat-gpt.repository';
import { HoroscopePrimitive } from '@shared/entities/horoscope.entity';
import {
  HoroscopeDetails,
  HoroscopeDetailsPrimitive,
} from '@shared/entities/horoscope-details.entity';
import { HoroscopeFindOneRepository } from './horoscope-find-one.repositoty';
import { config } from '@config/config';

@Injectable()
export class HoroscopeFindOrCreateRepository {
  constructor(
    private readonly horoscopeFindOneFromNowRepository: HoroscopeFindOneFromNowRepository,
    private readonly horoscopeDetailsFindAllRepository: HoroscopeDetailsFindAllRepository,
    private readonly horoscopeCreateFromChatGptRequest: HoroscopeCreateFromChatGptRepository,
    private readonly horoscopeFindOneRepository: HoroscopeFindOneRepository,
  ) {}

  async execute(): Promise<{
    horoscope: HoroscopePrimitive;
    horoscopeDetails: HoroscopeDetailsPrimitive[];
  }> {
    try {
      const date = new Date();
      const hours = date.getHours();

      let horoscope =
        hours >= config.app.hoursToSearch
          ? await this.horoscopeFindOneFromNowRepository.execute()
          : await this.horoscopeFindOneRepository.execute();

      let horoscopeDetails: HoroscopeDetails[];

      if (horoscope) {
        horoscopeDetails = await this.horoscopeDetailsFindAllRepository.execute(
          {
            horoscopeId: horoscope.id,
          },
        );
      } else {
        const result =
          await this.horoscopeCreateFromChatGptRequest.executeTransaction();
        horoscope = result.horoscope;
        horoscopeDetails = result.horoscopeDetails;
      }

      if (horoscopeDetails.length < 12) {
        throw new Error('Horoscope details not found');
      }

      return {
        horoscope: horoscope.toPrimitive(),
        horoscopeDetails: horoscopeDetails.map((h) => h.toPrimitive()),
      };
    } catch (e) {
      console.error(e);
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
