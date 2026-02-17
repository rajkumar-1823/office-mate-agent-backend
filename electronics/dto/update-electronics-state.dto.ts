
import { ElectronicsState } from '../../types';

export class UpdateElectronicsStateDto {
    electronicsIds: string[];
    state: ElectronicsState;
}
