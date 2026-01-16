import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Package } from '../../packages/schemas/package.schema';

export type BookingDocument = Booking & Document;

export enum BookingStatus {
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
}

@Schema({ timestamps: true })
export class Booking {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    user: User;

    @Prop({ type: Types.ObjectId, ref: Package.name, required: true })
    package: Package;

    @Prop({ required: true })
    date: Date; // The slot time

    @Prop({ enum: BookingStatus, default: BookingStatus.CONFIRMED })
    status: BookingStatus;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
