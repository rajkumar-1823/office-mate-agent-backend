
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ElectronicsService } from './electronics.service';
import { UpdateElectronicsStateDto } from './dto/update-electronics-state.dto';
import { CreateElectronicsDto } from './dto/create-electronics.dto';

@Controller('electronics')
export class ElectronicsController {
    constructor(private readonly electronicsService: ElectronicsService) { }

    @Post()
    create(@Body() createElectronicsDto: CreateElectronicsDto) {
        return this.electronicsService.create(createElectronicsDto);
    }

    @Get()
    findAll() {
        return this.electronicsService.findAll();
    }

    @Get(':electronics_id')
    findOne(@Param('electronics_id') electronics_id: string) {
        return this.electronicsService.findOne(electronics_id);
    }

    @Put(':electronics_id')
    update(@Param('electronics_id') electronics_id: string, @Body() updateElectronicsDto: CreateElectronicsDto) {
        return this.electronicsService.update(electronics_id, updateElectronicsDto);
    }

    @Delete(':electronics_id')
    remove(@Param('electronics_id') electronics_id: string) {
        return this.electronicsService.remove(electronics_id);
    }

    @Patch('state')
    @HttpCode(HttpStatus.OK)
    updateState(@Body() updateElectronicsStateDto: UpdateElectronicsStateDto) {
        return this.electronicsService.updateStates(updateElectronicsStateDto);
    }
}
