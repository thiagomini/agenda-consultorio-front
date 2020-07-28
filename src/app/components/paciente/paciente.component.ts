import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../model/Paciente';

@Component({
  selector: 'app-pacientes',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  pacientes: Paciente[];
  columnsToDisplay: string[] = ['nome', 'dataNascimento', 'editar', 'excluir'];
  
  constructor() { }

  ngOnInit(): void {
    this.pacientes = [
      { id: 1, nome: 'Thiago', dataNascimento: new Date(1995, 2, 15) },
      { id: 2, nome: 'Caio', dataNascimento: new Date(1993, 4, 28) },
      { id: 3, nome: 'Natália', dataNascimento: new Date(1997, 0, 15) }
    ]
  }

  deletePaciente(paciente: Paciente) {
    this.pacientes = this.pacientes.filter(p => p.id !== paciente.id);
  }

  botaoExcluirClicado(paciente: Paciente) {
    this.deletePaciente(paciente);
  }

  botaoEditarClicado(paciente: Paciente) {
    console.log(`Paciente editado: ${paciente}`);
  }

  onRowClicked(row) {
    console.log(row);
  }

}
