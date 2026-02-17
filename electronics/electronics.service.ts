
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Electronics } from './schemas/electronics.schema';
import { UpdateElectronicsStateDto } from './dto/update-electronics-state.dto';
import { CreateElectronicsDto } from './dto/create-electronics.dto';
import { RoomElectronicsMap } from '../room-electronics-map/schemas/room-electronics-map.schema';
import { LogsService } from '../logs/logs.service';
import { ElectronicsState } from '../types';

@Injectable()
export class ElectronicsService {
    constructor(
        @InjectModel(Electronics.name) private readonly electronicsModel: Model<Electronics>,
        @InjectModel(RoomElectronicsMap.name) private readonly roomElectronicsMapModel: Model<RoomElectronicsMap>,
        private readonly logsService: LogsService,
    ) { }

    async create(createElectronicsDto: CreateElectronicsDto): Promise<Electronics> {
        const newElectronics = new this.electronicsModel({
            ...createElectronicsDto,
            state: ElectronicsState.OFF, // Default state
        });
        return newElectronics.save();
    }

    async findAll(): Promise<Electronics[]> {
        return this.electronicsModel.find().exec();
    }

    async findOne(electronics_id: string): Promise<Electronics> {
        const electronics = await this.electronicsModel.findOne({ electronics_id }).exec();
        if (!electronics) {
            throw new NotFoundException(`Electronics with electronics_id "${electronics_id}" not found`);
        }
        return electronics;
    }

    async findByIds(electronics_ids: string[]): Promise<Electronics[]> {
        return this.electronicsModel.find({ electronics_id: { $in: electronics_ids } }).exec();
    }

    async update(electronics_id: string, updateElectronicsDto: CreateElectronicsDto): Promise<Electronics> {
        const existingElectronics = await this.electronicsModel.findOneAndUpdate(
            { electronics_id },
            updateElectronicsDto,
            { new: true },
        ).exec();
        if (!existingElectronics) {
            throw new NotFoundException(`Electronics with electronics_id "${electronics_id}" not found`);
        }
        return existingElectronics;
    }

    async remove(electronics_id: string): Promise<{ deleted: boolean }> {
        const result = await this.electronicsModel.deleteOne({ electronics_id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Electronics with electronics_id "${electronics_id}" not found`);
        }
        // Cascade: delete all mappings for this electronic
        await this.roomElectronicsMapModel.deleteMany({ electronics_id }).exec();
        return { deleted: true };
    }

    async updateStates(updateDto: UpdateElectronicsStateDto): Promise<{ success: boolean }> {
        const { electronicsIds, state } = updateDto;
        const electronicsToUpdate = await this.findByIds(electronicsIds);

        const logsToCreate = electronicsToUpdate
            .filter(electronics => electronics.state !== state)
            .map(electronics => ({
                electronicsId: electronics.electronics_id,
                previousState: electronics.state,
                newState: state,
            }));

        if (logsToCreate.length > 0) {
            await this.logsService.createManyLogs(logsToCreate);
        }

        await this.electronicsModel.updateMany(
            { electronics_id: { $in: electronicsIds } },
            { $set: { state } },
        );

        return { success: true };
    }
}
