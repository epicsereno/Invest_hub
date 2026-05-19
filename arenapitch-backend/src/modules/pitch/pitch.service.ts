import { Injectable } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { CreatePitchDto } from './dto/create-pitch.dto';
import { PitchRepository } from './pitch.repository';

@Injectable()
export class PitchService {
  constructor(
    private readonly pitchRepository: PitchRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async create(dto: CreatePitchDto, inventorId: string) {
    const pitch = await this.pitchRepository.create(dto, inventorId);
    await this.notificationService.pitchSubmitted(pitch.id);
    return pitch;
  }

  findAll(filters: { arena?: 'PUBLIC' | 'PRIVATE' }) {
    return this.pitchRepository.findAll(filters);
  }

  findOne(id: string) {
    return this.pitchRepository.findOne(id);
  }
}
