import { Injectable } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  pitchSubmitted(pitchId: string) {
    return this.notificationRepository.createSystemEvent('PITCH_SUBMITTED', { pitchId });
  }

  offerCreated(offerId: string) {
    return this.notificationRepository.createSystemEvent('OFFER_CREATED', { offerId });
  }

  counterOfferCreated(counterOfferId: string) {
    return this.notificationRepository.createSystemEvent('COUNTER_OFFER_CREATED', { counterOfferId });
  }
}
