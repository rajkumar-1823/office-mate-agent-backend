
import { Module } from '@nestjs/common';
import { LayoutController } from './layout.controller';
import { LayoutService } from './layout.service';
import { RoomsModule } from '../rooms/rooms.module';
import { ElectronicsModule } from '../electronics/electronics.module';
import { RoomElectronicsMapModule } from '../room-electronics-map/room-electronics-map.module';

@Module({
  imports: [RoomsModule, ElectronicsModule, RoomElectronicsMapModule],
  controllers: [LayoutController],
  providers: [LayoutService],
})
export class LayoutModule { }
