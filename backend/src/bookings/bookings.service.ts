import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument, BookingStatus } from './schemas/booking.schema';

@Injectable()
export class BookingsService {
    constructor(@InjectModel(Booking.name) private bookingModel: Model<BookingDocument>) { }

    async create(createBookingDto: any, userId: string): Promise<Booking> {
        // Basic slot validation: prevent double booking same time
        const existing = await this.bookingModel.findOne({
            date: createBookingDto.date,
            status: BookingStatus.CONFIRMED,
        });

        if (existing) {
            throw new ConflictException('Slot already booked');
        }

        const booking = new this.bookingModel({
            ...createBookingDto,
            user: userId,
        });
        return booking.save();
    }

    async findAll(): Promise<Booking[]> {
        return this.bookingModel.find().populate('user').populate('package').exec();
    }

    async findByUser(userId: string): Promise<Booking[]> {
        return this.bookingModel.find({ user: userId } as any).populate('package').exec();
    }
}
