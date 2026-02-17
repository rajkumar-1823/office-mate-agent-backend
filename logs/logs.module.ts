
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsService } from './logs.service';
import { Log, LogSchema } from './schemas/log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  providers: [LogsService],
  exports: [LogsService], // Export so other modules (like DevicesModule) can use it
})
export class LogsModule {}
