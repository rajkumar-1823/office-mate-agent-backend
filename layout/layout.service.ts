
import { Injectable } from '@nestjs/common';
import { RoomsService } from '../rooms/rooms.service';
import { ElectronicsService } from '../electronics/electronics.service';
import { RoomElectronicsMapService } from '../room-electronics-map/room-electronics-map.service';
import type { OfficeLayout } from '../types';

@Injectable()
export class LayoutService {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly electronicsService: ElectronicsService,
    private readonly roomElectronicsMapService: RoomElectronicsMapService,
  ) { }

  async getLayout(): Promise<OfficeLayout> {
    const rooms = await this.roomsService.findAll();
    const layout: OfficeLayout = [];

    for (const room of rooms) {
      const mappings = await this.roomElectronicsMapService.findByRoomId(room.room_id);
      const electronicsIds = mappings.map(m => m.electronics_id);

      let electronics = [];
      if (electronicsIds.length > 0) {
        electronics = await this.electronicsService.findByIds(electronicsIds);
      }

      layout.push({
        _id: room._id.toHexString(),
        room_id: room.room_id,
        room_name: room.room_name,
        room_key: room.room_key,
        electronics,
      });
    }

    return layout;
  }
}
