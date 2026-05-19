export class DealAcceptedEvent {
  constructor(
    public readonly offerId: string,
    public readonly acceptedById: string,
  ) {}
}
