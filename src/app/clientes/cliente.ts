import { Region } from "./Region";

export class Cliente {
    id!: number;
    nombre!: string;
    apellido!: string;
    createAt!: string;
    email!: string;
    region!: Region;
}
