import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../model/Paciente';
import { MatTableDataSource } from '@angular/material/table';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-pacientes',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  pacientes: MatTableDataSource<Paciente>;
  columnsToDisplay: string[] = ['nome', 'dataNascimento', 'editar', 'excluir'];
  
  constructor() { }

  ngOnInit(): void {
    this.pacientes = new MatTableDataSource(PACIENTES_DATA);
  }
  
  addPaciente(paciente: Paciente) {
    paciente.id = PACIENTES_DATA.length + 1;
    PACIENTES_DATA.push(paciente);
    this.pacientes = new MatTableDataSource(PACIENTES_DATA);
  }

  deletePaciente(paciente: Paciente) {
    PACIENTES_DATA = PACIENTES_DATA.filter(p => p.id !== paciente.id);
    this.pacientes = new MatTableDataSource(PACIENTES_DATA)
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

let PACIENTES_DATA = [
  { id: 1, nome: 'Thiago', dataNascimento: new Date(1995, 2, 15) },
  { id: 2, nome: 'Caio', dataNascimento: new Date(1993, 4, 28) },
  { id: 3, nome: 'Natália', dataNascimento: new Date(1997, 0, 15) }
];
