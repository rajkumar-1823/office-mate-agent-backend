
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':room_id')
  findOne(@Param('room_id') room_id: string) {
    return this.roomsService.findOne(room_id);
  }

  @Put(':room_id')
  update(@Param('room_id') room_id: string, @Body() updateRoomDto: CreateRoomDto) {
    return this.roomsService.update(room_id, updateRoomDto);
  }

  @Delete(':room_id')
  remove(@Param('room_id') room_id: string) {
    return this.roomsService.remove(room_id);
  }
}
