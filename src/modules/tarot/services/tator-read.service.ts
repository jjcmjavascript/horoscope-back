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
import { config } from '@config/config';

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
      date.setHours(date.getHours() - config.app.hoursToSearchTarot);

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

        if (params.birthday) {
          // 2025-02-01
          const [, m, d] = params.birthday.split('-');
          const zodiacSign = datesToZodiacSign(parseInt(m), parseInt(d));
          const result = await this.horoscopeFindOrCreateRepository.execute();
          const horoscopeBySign = result.horoscopeDetails.find(
            (h) =>
              removeAccents(h.sign).toLocaleLowerCase() ===
              removeAccents(zodiacSign?.sign || '').toLocaleLowerCase(),
          );

          horoscope = horoscopeBySign
            ? JSON.stringify(horoscopeBySign.data, null, 2)
            : null;
        }

        const previousReading = await this.tarotFindRepository.execute({
          where: {
            pushNotificationTokenId: token.values.id,
          },
        });

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
              birthday: params.birthday,
              thoughts: params.thoughts,
              horoscope,
              previousReading: previousReading
                ? previousReading.values.reading
                : null,
              cards: params.cards,
              goals: params.goals,
            }),
          },
        ]);

        const cleanedChatResponse = extractJson(chatResponse) || chatResponse;

        result = await this.tarotCreateRepository.execute({
          pushNotificationTokenId: token.values.id,
          name: params.name,
          birthday: params.birthday,
          reading: JSON.stringify(JSON.parse(cleanedChatResponse)),
          requestData: JSON.stringify({
            name: params.name,
            question: params.question,
            thoughts: params.thoughts,
            birthday: params.birthday,
            horoscope,
            cards: params.cards,
            goals: params.goals,
          }),
        });
      }

      return JSON.parse(result.values.reading);
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof BadRequestException) {
        throw e;
      }

      throw new InternalServerErrorException('An error happen in tarot');
    }
  }
}
