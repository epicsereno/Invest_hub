import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { NotificationService } from '../../../notification/notification.service';
import { MakeOfferCommand } from '../../commands/make-offer/make-offer.command';
import { DealMadeEvent } from '../../events/deal-made.event';
import { DealRepository } from '../../repositories/deal.repository';

@CommandHandler(MakeOfferCommand)
export class MakeOfferHandler implements ICommandHandler<MakeOfferCommand> {
  constructor(
    private readonly dealRepository: DealRepository,
    private readonly eventBus: EventBus,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(command: MakeOfferCommand) {
    const offer = await this.dealRepository.makeOffer(command, command.investorId);
    await this.notificationService.offerCreated(offer.id);
    this.eventBus.publish(new DealMadeEvent(offer.id, offer.pitchId, offer.investorId));
    return offer;
  }
}
