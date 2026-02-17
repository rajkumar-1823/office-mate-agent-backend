
import { ElectronicsType } from '../../types';

export class CreateElectronicsDto {
    electronics_name: string;
    electronics_key: string;
    type: ElectronicsType;
}
