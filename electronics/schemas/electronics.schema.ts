
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ElectronicsType, ElectronicsState } from '../../types';

@Schema({ collection: 'electronics' })
export class Electronics extends Document {
    @Prop({ required: true, unique: true, default: uuidv4 })
    electronics_id: string;

    @Prop({ required: true })
    electronics_name: string;

    @Prop({ required: true })
    electronics_key: string;

    @Prop({ required: true, enum: Object.values(ElectronicsType) })
    type: ElectronicsType;

    @Prop({ required: true, enum: Object.values(ElectronicsState) })
    state: ElectronicsState;
}

export const ElectronicsSchema = SchemaFactory.createForClass(Electronics);
