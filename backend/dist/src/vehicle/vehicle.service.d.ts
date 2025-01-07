import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleDTO, EditVehicleDTO } from './dto';
export declare class VehicleService {
    constructor(prisma: PrismaService);
    createVehicle(dto: CreateVehicleDTO): void;
    getAllVehicles(): void;
    getAvailableVehicle(): void;
    getVehicleById(id: number): void;
    editVehicle(id: number, dto: EditVehicleDTO): void;
    setAvailable(id: number): void;
    setUnavailable(id: number): void;
    deleteVehicle(id: number): void;
}
