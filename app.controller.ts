
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
    @Get()
    @ApiOperation({ summary: 'Health check / Welcome' })
    getRoot() {
        return {
            name: 'AI Office Bot API',
            version: '1.0.0',
            status: 'running',
            docs: '/api',
            description: 'Backend service for AI Office Bot — control your office electronics with voice commands.',
            endpoints: {
                swagger: '/api',
                layout: '/layout',
                rooms: '/rooms',
                electronics: '/electronics',
                'room-electronics-map': '/room-electronics-map',
            },
        };
    }
}
