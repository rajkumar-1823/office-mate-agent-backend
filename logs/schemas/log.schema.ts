
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ElectronicsState } from '../../types';

@Schema({ collection: 'logs' })
export class Log extends Document {
  @Prop({ required: true })
  electronicsId: string;

  @Prop({ required: true, enum: Object.values(ElectronicsState) })
  previousState: ElectronicsState;

  @Prop({ required: true, enum: Object.values(ElectronicsState) })
  newState: ElectronicsState;

  @Prop({ required: true, default: Date.now })
  timestamp: Date;
}

export const LogSchema = SchemaFactory.createForClass(Log);
