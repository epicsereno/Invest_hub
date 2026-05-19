import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  createSystemEvent(type: string, payload: Record<string, string>) {
    return this.prisma.notification.create({
      data: {
        type,
        payload,
      },
    });
  }
}
