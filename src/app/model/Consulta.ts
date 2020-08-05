import { Paciente } from './Paciente';
export class Consulta {
    id: number;
    horaInicio: Date;
    horaFim: Date;
    observacao: string;
    paciente: Paciente;
    personId: number;
}