export class WithdrawOfferCommand {
  constructor(
    public readonly offerId: string,
    public readonly userId: string,
    public readonly reason?: string,
  ) {}
}
