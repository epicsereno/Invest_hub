import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePitchDto } from './dto/create-pitch.dto';

@Injectable()
export class PitchRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePitchDto, inventorId: string) {
    return this.prisma.pitch.create({
      data: {
        ...dto,
        inventorId,
      },
    });
  }

  findAll(filters: { arena?: 'PUBLIC' | 'PRIVATE' }) {
    return this.prisma.pitch.findMany({
      where: filters.arena ? { arenaType: filters.arena } : undefined,
      include: {
        inventor: true,
        offers: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.pitch.findUnique({
      where: { id },
      include: {
        inventor: true,
        offers: true,
      },
    });
  }
}
