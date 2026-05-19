import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { WithdrawOfferCommand } from '../../commands/withdraw-offer/withdraw-offer.command';
import { OfferWithdrawnEvent } from '../../events/offer-withdrawn.event';
import { DealRepository } from '../../repositories/deal.repository';

@CommandHandler(WithdrawOfferCommand)
export class WithdrawOfferHandler implements ICommandHandler<WithdrawOfferCommand> {
  constructor(
    private readonly dealRepository: DealRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: WithdrawOfferCommand) {
    const offer = await this.dealRepository.withdrawOffer(command.offerId);
    this.eventBus.publish(new OfferWithdrawnEvent(offer.id, command.userId));
    return offer;
  }
}
