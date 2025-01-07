import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HoroscopeFindOneFromNowRepository } from './horoscope-find-one-from-now.repository';
import { HoroscopeDetailsFindAllRepository } from './horoscope-details-find-all.repository';
import { HoroscopeCreateFromChatGptRepository } from './horoscope-create-from-chat-gpt.repository';
import { HoroscopePrimitive } from '@shared/entities/horoscope.entity';
import {
  HoroscopeDetails,
  HoroscopeDetailsPrimitive,
} from '@shared/entities/horoscope-details.entity';

@Injectable()
export class HoroscopeFindOrCreateRepository {
  constructor(
    private readonly horoscopeFindOneFromNowRepository: HoroscopeFindOneFromNowRepository,
    private readonly horoscopeDetailsFindAllRepository: HoroscopeDetailsFindAllRepository,
    private readonly horoscopeCreateFromChatGptRequest: HoroscopeCreateFromChatGptRepository,
  ) {}

  async execute(): Promise<{
    horoscope: HoroscopePrimitive;
    horoscopeDetails: HoroscopeDetailsPrimitive[];
  }> {
    try {
      let horoscope = await this.horoscopeFindOneFromNowRepository.execute();
      let horoscopeDetails: HoroscopeDetails[];

      if (horoscope) {
        horoscopeDetails = await this.horoscopeDetailsFindAllRepository.execute(
          {
            horoscopeId: horoscope.toPrimitive().id,
          },
        );
      } else {
        const result =
          await this.horoscopeCreateFromChatGptRequest.executeTransaction();
        horoscope = result.horoscope;
        horoscopeDetails = result.horoscopeDetails;
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
