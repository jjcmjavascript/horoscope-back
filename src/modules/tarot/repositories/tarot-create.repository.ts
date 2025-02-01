import { Injectable } from '@nestjs/common';
import { PrimitiveTarot, Tarot } from '@shared/entities/tarot.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class TarotCreateRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(tarot: Partial<PrimitiveTarot>): Promise<Tarot> {
    const result = await this.prismaService.tarot.create({
      data: {
        pushNotificationTokenId: tarot.pushNotificationTokenId,
        name: tarot.name,
        birthday: tarot.birthday,
        reading: tarot.reading,
      },
    });

    return result ? Tarot.create(result) : null;
  }
}
