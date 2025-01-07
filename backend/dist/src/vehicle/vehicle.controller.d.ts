import { VehicleService } from './vehicle.service';
import { CreateVehicleDTO, EditVehicleDTO } from './dto';
export declare class VehicleController {
    private vehicleService;
    constructor(vehicleService: VehicleService);
    createVehicle(dto: CreateVehicleDTO): void;
    getAllVehicles(): void;
    getAvailableVehicle(): void;
    getVehicleById(id: number): void;
    editVehicle(id: number, dto: EditVehicleDTO): void;
    deleteVehicle(id: number): void;
    setAvailable(id: number): void;
    setUnavailable(id: number): void;
}
