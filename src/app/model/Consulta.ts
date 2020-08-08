import { Paciente } from './Paciente';
export class Consulta {
    id: number;
    horaInicio: Date;
    horaFim: Date;
    observacao: string;
    person: Paciente;
    personId: number;
}