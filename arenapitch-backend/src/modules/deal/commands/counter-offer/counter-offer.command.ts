export class CounterOfferCommand {
  constructor(
    public readonly offerId: string,
    public readonly userId: string,
    public readonly amount: number,
    public readonly equity: number,
    public readonly terms: string,
  ) {}
}
