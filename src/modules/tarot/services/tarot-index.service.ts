import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PushNotificationTokenFindAllRepository } from '@modules/push-notification-tokens/repositories/push-notification-token-find-all.repository';
import { TarotFindRepository } from '../repositories/tarot-find.repository';
import { TarotIndexDto } from '../tarot.dto';
import { config } from '@config/config';

@Injectable()
export class TarotIndexService {
  constructor(
    private readonly tarotFindRepository: TarotFindRepository,
    private readonly tokenFindRepository: PushNotificationTokenFindAllRepository,
  ) {}

  async execute(params: TarotIndexDto) {
    try {
      if (!params.token) {
        throw new BadRequestException('Token is required');
      }

      const date = new Date();
      date.setHours(date.getHours() - config.app.hoursToSearchTarot);

      const foundedTokens = await this.tokenFindRepository.execute({
        token: params.token,
      });
      const token = foundedTokens[0];

      if (!token) {
        throw new BadRequestException("Device doesn't exists");
      }

      const result = await this.tarotFindRepository.execute({
        where: {
          pushNotificationTokenId: token.values.id,
          createdAt: {
            gt: date,
          },
        },
      });

      if (!result) {
        throw new BadRequestException('Tarot not found');
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
