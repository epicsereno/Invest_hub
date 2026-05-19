export class OfferWithdrawnEvent {
  constructor(
    public readonly offerId: string,
    public readonly withdrawnById: string,
  ) {}
}
