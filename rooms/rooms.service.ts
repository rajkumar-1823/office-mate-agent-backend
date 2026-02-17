
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomElectronicsMap } from '../room-electronics-map/schemas/room-electronics-map.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    @InjectModel(RoomElectronicsMap.name) private readonly roomElectronicsMapModel: Model<RoomElectronicsMap>,
  ) { }

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const newRoom = new this.roomModel(createRoomDto);
    return newRoom.save();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findOne(room_id: string): Promise<Room> {
    const room = await this.roomModel.findOne({ room_id }).exec();
    if (!room) {
      throw new NotFoundException(`Room with room_id "${room_id}" not found`);
    }
    return room;
  }

  async update(room_id: string, updateRoomDto: CreateRoomDto): Promise<Room> {
    const existingRoom = await this.roomModel.findOneAndUpdate(
      { room_id },
      updateRoomDto,
      { new: true },
    ).exec();
    if (!existingRoom) {
      throw new NotFoundException(`Room with room_id "${room_id}" not found`);
    }
    return existingRoom;
  }

  async remove(room_id: string): Promise<{ deleted: boolean }> {
    const result = await this.roomModel.deleteOne({ room_id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Room with room_id "${room_id}" not found`);
    }
    // Cascade: delete all mappings for this room
    await this.roomElectronicsMapModel.deleteMany({ room_id }).exec();
    return { deleted: true };
  }
}
