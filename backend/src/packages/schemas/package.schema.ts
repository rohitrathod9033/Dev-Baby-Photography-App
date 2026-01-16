import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PackageDocument = Package & Document;

@Schema({ timestamps: true })
export class Package {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: string; // Display only, e.g. "$200"

    @Prop({ required: true })
    duration: number; // in minutes

    @Prop([String])
    images: string[];

    @Prop({ default: true })
    isActive: boolean;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
