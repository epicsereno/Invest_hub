import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { NotificationService } from '../../../notification/notification.service';
import { CounterOfferCommand } from '../../commands/counter-offer/counter-offer.command';
import { OfferCounteredEvent } from '../../events/offer-countered.event';
import { DealRepository } from '../../repositories/deal.repository';

@CommandHandler(CounterOfferCommand)
export class CounterOfferHandler implements ICommandHandler<CounterOfferCommand> {
  constructor(
    private readonly dealRepository: DealRepository,
    private readonly eventBus: EventBus,
    private readonly notificationService: NotificationService,
  ) {}

  async execute(command: CounterOfferCommand) {
    const counter = await this.dealRepository.counterOffer(command.offerId, command, command.userId);
    await this.notificationService.counterOfferCreated(counter.id);
    this.eventBus.publish(new OfferCounteredEvent(counter.id, counter.offerId, counter.createdById));
    return counter;
  }
}
