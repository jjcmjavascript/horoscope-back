import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
// import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { PushNotificationTokenFindAllRepository } from '@modules/push-notification-tokens/repositories/push-notification-token-find-all.repository';
import { ChatGptService } from '@shared/services/chat-gpt.service';

import { extractJson, removeAccents } from '@shared/helpers/string.helper';
import { TarotCreateRepository } from '../repositories/tarot-create.repository';
import { tarotPromp } from '../tarot-promp.helper';
import { TarotFindRepository } from '../repositories/tarot-find.repository';
import { TarotCreateDto } from '../tarot.dto';
import { datesToZodiacSign } from '@shared/helpers/date.helper';
import { HoroscopeFindOrCreateRepository } from '@modules/horoscope/repositories/horoscope-find-or-create.repository';

@Injectable()
export class TarotReadService {
  constructor(
    private readonly chatGpt: ChatGptService,
    private readonly horoscopeFindOrCreateRepository: HoroscopeFindOrCreateRepository,
    private readonly tarotCreateRepository: TarotCreateRepository,
    private readonly tarotFindRepository: TarotFindRepository,
    private readonly tokenFindRepository: PushNotificationTokenFindAllRepository,
  ) {}

  async execute(params: TarotCreateDto) {
    try {
      // Get each 22 hours
      const date = new Date();
      date.setHours(date.getHours() - 22);

      const foundedTokens = await this.tokenFindRepository.execute({
        token: params.token,
      });
      const token = foundedTokens[0];

      if (!token) {
        throw new BadRequestException("Device doesn't exists");
      }

      let result = await this.tarotFindRepository.execute({
        where: {
          pushNotificationTokenId: token.values.id,
          createdAt: {
            gt: date,
          },
        },
      });

      if (!result) {
        let horoscope: string = null;

        if (params.birthDate) {
          // 2025-02-01
          const [, m, d] = params.birthDate.split('-');
          const zodiacSign = datesToZodiacSign(parseInt(m), parseInt(d));
          const result = await this.horoscopeFindOrCreateRepository.execute();
          const singRedingHoroscope = result.horoscopeDetails.find(
            (h) =>
              removeAccents(h.sign) === removeAccents(zodiacSign?.sign || ''),
          );

          horoscope = singRedingHoroscope
            ? JSON.stringify(singRedingHoroscope.data, null, 2)
            : null;
        }

        const chatResponse = await this.chatGpt.execute([
          {
            role: 'system',
            content: tarotPromp,
          },
          {
            role: 'user',
            content: JSON.stringify({
              name: params.name,
              question: params.question,
              birthDate: params.birthDate,
              horoscope,
              cards: params.cards,
            }),
          },
        ]);

        const cleanedChatResponse = extractJson(chatResponse) || chatResponse;

        result = await this.tarotCreateRepository.execute({
          pushNotificationTokenId: token.values.id,
          name: params.name,
          bithDate: params.birthDate,
          reading: JSON.stringify(JSON.parse(cleanedChatResponse)),
        });
      }

      return JSON.parse(result.values.reading);
    } catch (e: unknown) {
      if (e instanceof BadRequestException) {
        throw e;
      }

      throw new InternalServerErrorException('An error happen in tarot');
    }
  }
}
