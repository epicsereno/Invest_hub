import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { AcceptDealCommand } from '../../commands/accept-deal/accept-deal.command';
import { DealAcceptedEvent } from '../../events/deal-accepted.event';
import { DealRepository } from '../../repositories/deal.repository';

@CommandHandler(AcceptDealCommand)
export class AcceptDealHandler implements ICommandHandler<AcceptDealCommand> {
  constructor(
    private readonly dealRepository: DealRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: AcceptDealCommand) {
    const offer = await this.dealRepository.acceptDeal(command.offerId);
    this.eventBus.publish(new DealAcceptedEvent(offer.id, command.userId));
    return offer;
  }
}
