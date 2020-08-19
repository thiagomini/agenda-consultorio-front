import { Paciente } from './Paciente';
export class Consulta {
    id: number;
    horaConsultaInicio: Date;
    horaConsultaFim: Date;
    observacao: string;
    person: Paciente;
    personId: number;
}