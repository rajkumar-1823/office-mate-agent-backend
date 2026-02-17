
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from './schemas/log.schema';
import { ElectronicsState } from '../types';

interface LogData {
  electronicsId: string;
  previousState: ElectronicsState;
  newState: ElectronicsState;
}

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private readonly logModel: Model<Log>) { }

  async createManyLogs(logDataArray: LogData[]): Promise<void> {
    const logs = logDataArray.map(logData => ({
      ...logData,
      timestamp: new Date(),
    }));
    await this.logModel.insertMany(logs);
  }
}
