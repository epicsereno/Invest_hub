import { Injectable } from '@nestjs/common';
import { OfferStatus } from '@prisma/client';
import { PrismaService } from '../../../database/prisma.service';
import { CounterOfferDto } from '../dto/counter-offer.dto';
import { CreateOfferDto } from '../dto/create-offer.dto';

@Injectable()
export class DealRepository {
  constructor(private readonly prisma: PrismaService) {}

  makeOffer(dto: CreateOfferDto, investorId: string) {
    return this.prisma.offer.create({
      data: {
        pitchId: dto.pitchId,
        investorId,
        amount: dto.amount,
        equity: dto.equity,
        terms: dto.message ? `${dto.terms}\n\nInvestor note: ${dto.message}` : dto.terms,
      },
    });
  }

  counterOffer(offerId: string, dto: CounterOfferDto, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const counter = await tx.counterOffer.create({
        data: {
          ...dto,
          offerId,
          createdById: userId,
        },
      });

      await tx.offer.update({
        where: { id: offerId },
        data: { status: OfferStatus.COUNTERED },
      });

      return counter;
    });
  }

  acceptDeal(offerId: string) {
    return this.prisma.offer.update({
      where: { id: offerId },
      data: { status: OfferStatus.ACCEPTED },
      include: this.offerInclude(),
    });
  }

  withdrawOffer(offerId: string) {
    return this.prisma.offer.update({
      where: { id: offerId },
      data: { status: OfferStatus.WITHDRAWN },
      include: this.offerInclude(),
    });
  }

  findOne(offerId: string) {
    return this.prisma.offer.findUnique({
      where: { id: offerId },
      include: this.offerInclude(),
    });
  }

  findByPitch(pitchId: string, investorId?: string, status?: string) {
    return this.prisma.offer.findMany({
      where: {
        pitchId,
        investorId,
        status: this.toOfferStatus(status),
      },
      include: this.offerInclude(),
      orderBy: { createdAt: 'desc' },
    });
  }

  findByInvestor(investorId: string, status?: string) {
    return this.prisma.offer.findMany({
      where: {
        investorId,
        status: this.toOfferStatus(status),
      },
      include: this.offerInclude(),
      orderBy: { createdAt: 'desc' },
    });
  }

  findHistory(offerId: string) {
    return this.prisma.offer.findUnique({
      where: { id: offerId },
      include: {
        counterOffers: {
          include: { createdBy: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
  }

  private toOfferStatus(status?: string): OfferStatus | undefined {
    if (!status) {
      return undefined;
    }

    return Object.values(OfferStatus).includes(status as OfferStatus) ? (status as OfferStatus) : undefined;
  }

  private offerInclude() {
    return {
      pitch: true,
      investor: true,
      counterOffers: {
        orderBy: { createdAt: 'desc' as const },
      },
    };
  }
}
