
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomElectronicsMapController } from './room-electronics-map.controller';
import { RoomElectronicsMapService } from './room-electronics-map.service';
import { RoomElectronicsMap, RoomElectronicsMapSchema } from './schemas/room-electronics-map.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: RoomElectronicsMap.name, schema: RoomElectronicsMapSchema },
        ]),
    ],
    controllers: [RoomElectronicsMapController],
    providers: [RoomElectronicsMapService],
    exports: [RoomElectronicsMapService],
})
export class RoomElectronicsMapModule { }
