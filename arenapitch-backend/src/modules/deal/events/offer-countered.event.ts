export class OfferCounteredEvent {
  constructor(
    public readonly counterOfferId: string,
    public readonly offerId: string,
    public readonly createdById: string,
  ) {}
}
