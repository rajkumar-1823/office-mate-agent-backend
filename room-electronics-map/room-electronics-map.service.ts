
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomElectronicsMap } from './schemas/room-electronics-map.schema';
import { CreateRoomElectronicsMapDto } from './dto/create-room-electronics-map.dto';

@Injectable()
export class RoomElectronicsMapService {
    constructor(
        @InjectModel(RoomElectronicsMap.name)
        private readonly roomElectronicsMapModel: Model<RoomElectronicsMap>,
    ) { }

    async create(createDto: CreateRoomElectronicsMapDto): Promise<RoomElectronicsMap> {
        // Check if this electronic is already mapped to any room
        const existingMapping = await this.roomElectronicsMapModel
            .findOne({ electronics_id: createDto.electronics_id })
            .exec();

        if (existingMapping) {
            throw new ConflictException(
                `Electronics "${createDto.electronics_id}" is already mapped to room "${existingMapping.room_id}". An electronic can only be assigned to one room.`,
            );
        }

        const newMapping = new this.roomElectronicsMapModel(createDto);
        return newMapping.save();
    }

    async findByRoomId(room_id: string): Promise<RoomElectronicsMap[]> {
        return this.roomElectronicsMapModel.find({ room_id }).exec();
    }

    async findAll(): Promise<RoomElectronicsMap[]> {
        return this.roomElectronicsMapModel.find().exec();
    }

    async remove(room_electronics_map_id: string): Promise<{ deleted: boolean }> {
        const result = await this.roomElectronicsMapModel
            .deleteOne({ room_electronics_map_id })
            .exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(
                `Mapping with room_electronics_map_id "${room_electronics_map_id}" not found`,
            );
        }
        return { deleted: true };
    }

    async removeByRoomId(room_id: string): Promise<{ deletedCount: number }> {
        const result = await this.roomElectronicsMapModel
            .deleteMany({ room_id })
            .exec();
        return { deletedCount: result.deletedCount };
    }

    async removeByElectronicsId(electronics_id: string): Promise<{ deletedCount: number }> {
        const result = await this.roomElectronicsMapModel
            .deleteMany({ electronics_id })
            .exec();
        return { deletedCount: result.deletedCount };
    }
}
