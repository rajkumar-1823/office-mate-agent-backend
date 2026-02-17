
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'room_electronics_map' })
export class RoomElectronicsMap extends Document {
    @Prop({ required: true, unique: true, default: uuidv4 })
    room_electronics_map_id: string;

    @Prop({ required: true })
    room_id: string;

    @Prop({ required: true })
    electronics_id: string;
}

export const RoomElectronicsMapSchema = SchemaFactory.createForClass(RoomElectronicsMap);
