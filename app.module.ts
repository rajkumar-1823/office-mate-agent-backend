
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ElectronicsModule } from './electronics/electronics.module';
import { LogsModule } from './logs/logs.module';
import { RoomsModule } from './rooms/rooms.module';
import { RoomElectronicsMapModule } from './room-electronics-map/room-electronics-map.module';
import { LayoutModule } from './layout/layout.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make ConfigService available everywhere
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ElectronicsModule,
    LogsModule,
    RoomsModule,
    RoomElectronicsMapModule,
    LayoutModule,
  ],
})
export class AppModule { }
