
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ collection: 'rooms', toJSON: { virtuals: true } })
export class Room extends Document {
  @Prop({ required: true, unique: true, default: uuidv4 })
  room_id: string;

  @Prop({ required: true })
  room_name: string;

  @Prop({ required: true })
  room_key: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
