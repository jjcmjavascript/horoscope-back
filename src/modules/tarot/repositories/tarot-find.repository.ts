import { Injectable } from '@nestjs/common';
import { Tarot } from '@shared/entities/tarot.entity';
import { PrismaService } from '@shared/services/database/prisma/prisma.service';
import { RepositoryParams } from '@shared/types/commons.interface';

@Injectable()
export class TarotFindRepository {
  constructor(private readonly prisma: PrismaService) {}

  async execute(props?: RepositoryParams): Promise<Tarot | null> {
    const result = await this.prisma.tarot.findFirst({
      where: props?.where,
    });

    return result ? Tarot.create(result) : null;
  }
}
