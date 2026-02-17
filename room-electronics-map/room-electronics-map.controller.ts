
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { RoomElectronicsMapService } from './room-electronics-map.service';
import { CreateRoomElectronicsMapDto } from './dto/create-room-electronics-map.dto';

@Controller('room-electronics-map')
export class RoomElectronicsMapController {
    constructor(
        private readonly roomElectronicsMapService: RoomElectronicsMapService,
    ) { }

    @Post()
    create(@Body() createDto: CreateRoomElectronicsMapDto) {
        return this.roomElectronicsMapService.create(createDto);
    }

    @Get()
    findAll() {
        return this.roomElectronicsMapService.findAll();
    }

    @Get('room/:room_id')
    findByRoom(@Param('room_id') room_id: string) {
        return this.roomElectronicsMapService.findByRoomId(room_id);
    }

    @Delete(':room_electronics_map_id')
    remove(@Param('room_electronics_map_id') room_electronics_map_id: string) {
        return this.roomElectronicsMapService.remove(room_electronics_map_id);
    }
}
