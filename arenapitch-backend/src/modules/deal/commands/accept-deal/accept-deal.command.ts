export class AcceptDealCommand {
  constructor(
    public readonly offerId: string,
    public readonly userId: string,
    public readonly note?: string,
  ) {}
}
