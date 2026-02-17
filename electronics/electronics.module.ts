
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ElectronicsController } from './electronics.controller';
import { ElectronicsService } from './electronics.service';
import { Electronics, ElectronicsSchema } from './schemas/electronics.schema';
import { RoomElectronicsMap, RoomElectronicsMapSchema } from '../room-electronics-map/schemas/room-electronics-map.schema';
import { LogsModule } from '../logs/logs.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Electronics.name, schema: ElectronicsSchema },
            { name: RoomElectronicsMap.name, schema: RoomElectronicsMapSchema },
        ]),
        LogsModule,
    ],
    controllers: [ElectronicsController],
    providers: [ElectronicsService],
    exports: [ElectronicsService],
})
export class ElectronicsModule { }
