import { Injectable } from '@nestjs/common';
import { Tarot } from '@shared/entities/tarot.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';

@Injectable()
export class TarotFindRepository {
  constructor(private readonly prisma: PrismaService) {}

  async execute({
    createdAt,
    pushNotificationTokenId,
  }: {
    pushNotificationTokenId: number;
    createdAt: {
      gt: Date;
    };
  }): Promise<Tarot | null> {
    const result = await this.prisma.tarot.findFirst({
      where: {
        pushNotificationTokenId,
        createdAt,
      },
    });

    return result ? Tarot.create(result) : null;
  }
}
