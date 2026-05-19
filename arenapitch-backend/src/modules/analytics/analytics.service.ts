import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async overview() {
    const [users, pitches, offers] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.pitch.count(),
      this.prisma.offer.count(),
    ]);

    return { users, pitches, offers };
  }
}
