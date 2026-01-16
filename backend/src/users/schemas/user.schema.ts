import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string; // Will store bcrypt hash

    @Prop({ required: true, enum: UserRole, default: UserRole.USER })
    role: UserRole;

    @Prop()
    avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
