import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ArenaRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.arena.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findAccessPolicy(id: string) {
    return this.prisma.arena.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        type: true,
        ndaRequired: true,
        inviteOnly: true,
      },
    });
  }
}
