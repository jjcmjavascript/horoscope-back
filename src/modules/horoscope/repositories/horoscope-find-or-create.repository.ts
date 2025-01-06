import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HoroscopeFindOneFromNowRepository } from './horoscope-find-one-from-now.repository';
import { HoroscopeDetailsFindAllRepository } from './horoscope-details-find-all.repository';
import { HoroscopeCreateFromChatGptRepository } from './horoscope-create-from-chat-gpt.repository';
import { Horoscope } from '@shared/entities/horoscope.entity';
import { HoroscopeDetails } from '@shared/entities/horoscope-details.entity';

@Injectable()
export class HoroscopeFindOrCreateRepository {
  constructor(
    private readonly horoscopeFindOneFromNowRepository: HoroscopeFindOneFromNowRepository,
    private readonly horoscopeDetailsFindAllRepository: HoroscopeDetailsFindAllRepository,
    private readonly horoscopeCreateFromChatGptRequest: HoroscopeCreateFromChatGptRepository,
  ) {}

  async execute(): Promise<{
    horoscope: Horoscope;
    horoscopeDetails: HoroscopeDetails[];
  }> {
    try {
      const horoscope = await this.horoscopeFindOneFromNowRepository.execute();

      if (horoscope) {
        const horoscopeDetails =
          await this.horoscopeDetailsFindAllRepository.execute({
            horoscopeId: horoscope.toPrimitive().id,
          });

        return {
          horoscope,
          horoscopeDetails,
        };
      }

      return await this.horoscopeCreateFromChatGptRequest.executeTransaction();
    } catch {
      throw new InternalServerErrorException('');
    }
  }
}
